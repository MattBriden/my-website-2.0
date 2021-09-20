<template>
  <div id="blog-post">
    <BlogNavBar></BlogNavBar>
    <div class="scrollable">
      <div class="blog">
        <div class="title">
          <span>Leveraging EFS in AWS Lambdas</span>
          <p>Matt Briden • June 24, 2021</p>
          <img src="~@/assets/profile-pic.png" height="100"/>
          <div class="contact-icons">
            <a href="mailto: matt@helioswebsolutions.com">
              <font-awesome-icon icon="envelope" size="1x" :style="{ color: '#D4AC0D' }"/>
            </a>
            <a href="https://www.github.com/MattBriden" target="_blank">
              <font-awesome-icon :icon="['fab', 'github']" size="1x" :style="{ color: 'black' }"/>
            </a>
            <a href="https://www.linkedin.com/in/mattbriden/" target="_blank">
              <font-awesome-icon :icon="['fab', 'linkedin']" size="1x" :style="{ color: '#2867B2' }"/>
            </a>
          </div>
        </div>
        <div class="card">
          <h3>Working with disk space in AWS Lambda functions</h3>
          <p>
            <a href="https://aws.amazon.com/lambda/">AWS Lambda functions</a> provide a convenient solution for both asynchronous and synchronous tasks that don't need the support of a self managed server. Personally, when I am working on a project I try to find which pieces I can put into Lambda functions due to the serverless nature, cost effectiveness, and low maintenence needed from an ops perspective. Recently I worked on a file processing project and ran into one of the most common snags when using Lambda functions: disk space. AWS provides a /tmp directory for each function with 512MB of space. Often times this is plenty, but when dealing with large files it can become a serious problem. On top of having to store the files the function was processing in this area, all lambda layers get decompressed into this space as well. Thus, I started to look for a solution to allocate more space to my functions. Storing the files in memory was an option, but would be much more costly as the price of execution increases with the memory tier. I tried developing a solution that streamed files from and to S3 without having to download the entire file, but this wasn't supported by some of the libraries I relied on. Finally, I discovered an option that worked perfectly for my use case; Elastic File System.
          </p>
          <h3>Introducing EFS</h3>
          <p>
            <a href="https://aws.amazon.com/efs/">Elastic File System</a>, abbreviated as EFS, is a serverless file system that can be shared across many AWS Cloud services. Seemingly <a href="https://aws.amazon.com/efs/faq/">its most popular use case</a> is as a file system shared amongst EC2 instances, but, albeit not made as obvious by AWS, it can also be mounted onto Lambda functions. This provides Lambda functions with unlimited disk space to work with and provided me with a solution to processing large files.
          </p>
          <p><strong>Note:</strong> The one "catch" to mounting EFS onto a Lambda function is that the function must reside in a VPC (along with the file system). Lots of enterprises that use AWS require all applications to live in a VPC, but if working on a personal project this can result in sneaky billing costs.</p>
          <h3>Integrating EFS in Lambda functions</h3>
          <p>Before we can leverage EFS in our lambda function we first need to create the file system. Throughout this example Terraform code will be used to create the necessary resources and configuration options in AWS. Below creates our skeleton file system.</p>
          <pre><code>
      resource "aws_efs_file_system" "example_efs" {
          lifecycle_policy {
              transition_to_ia = "AFTER_7_DAYS"
          }
          encrypted = true

          tags = {
              Name = "Example-FileSystem"
          }
      }
          </code></pre>
          <p>This provides us with the most basic file system. The one piece worth noting is the lifecycle policy. We can choose a time period that if a file is not accessed for a certain amount of days it will be moved to IA (Infrequent Access) storage. IA storage is significantly cheaper than storing a file on the main disk and I chose the smallest retention period since I was deleting files altogether after processing was complete. More info on IA storage can be found <a href="https://aws.amazon.com/efs/features/infrequent-access/">here</a>.</p>
          <p>To make our EFS available to a Lambda we need to setup what is known as an access point. This exposes a directory that any clients using the access point may, fittingly, access. In this example I created a directory /lambda-files since I only plan on having Lambda functions use this access point. The POSIX user info applies a user's permissions to all file system operations, using 1001 grants the Lambda functions full access to the directory.</p>
          <pre><code>
      resource "aws_efs_access_point" "lambda_access_point" {
        file_system_id = aws_efs_file_system.example_efs.id
        root_directory {
          path = "/lambda-files"
          creation_info {
            owner_gid = 1001
            owner_uid = 1001
            permissions = "755"
          }
        }
        posix_user {
          uid = 1001
          gid = 1001
        }
        tags = {
          Name = "Example-AccessPoint"
        }
      }
          </code></pre>
          <p>At this point the last part of the EFS that needs configured is making it available in the subnets that our Lambda resides. We can do this with what's known as a mount target. We will need to add a separate mount target in all subnets that the Lambda we want to mount on lives, in my case I had two. I also included the security group I created for the mount targets which allows TCP traffic from any function using my Lambda security group.</p>
          <pre><code>
      resource "aws_security_group" "efs_sg" {
        name        = "efs_sg"
        description = "Security group for EFS"
        vpc_id      = var.vpc_id

        ingress {
          from_port   = 2049
          to_port     = 2049
          protocol    = "tcp"
          security_groups = [aws_security_group.lambda_sg.id]
        }

        egress {
          from_port   = 0
          to_port     = 0
          protocol    = "-1"
          cidr_blocks = ["0.0.0.0/0"]
        }
      }

      resource "aws_efs_mount_target" "mount_target_1a" {
        file_system_id = aws_efs_file_system.example_efs.id
        subnet_id      = var.subnet_1a
        security_groups = [ var.efs_sg_id ]
      }

      resource "aws_efs_mount_target" "mount_target_1b" {
        file_system_id = aws_efs_file_system.example_efs.id
        subnet_id      = var.subnet_1b
        security_groups = [ var.efs_sg_id ]
      }
          </code></pre>
          <p>The final piece is mounting EFS onto the Lambda function. The two things that need provided are the ARN for the access point that was created above and where in the function execution space we want to mount. In this example /lambda-files will be mounted to /mnt/files, meaning any files or directories that exist in /lambda-files can be accessed in the Lambda's /mnt/files directory.</p>
          <pre><code>
      data "aws_iam_policy_document" "lambda_policy_doc" {
        ...

        statement {
          actions = [
            "elasticfilesystem:ClientMount",
            "elasticfilesystem:ClientWrite"
          ]

          resources = [
            "*"
           ]
        }
      }

      resource "aws_lambda_function" "my_lambda" {
        ...

        file_system_config {
          arn = var.access_point_arn
          local_mount_path = "/mnt/files"
        }
      }
          </code></pre>
          <p>Previously I was bound to downloading files into /tmp or memory, with this solution they can now be downloaded straight to /mnt/files. Using EFS I was able to process large files using small amounts of memory thus keeping my Lambda execution costs low. It was easy to configure and relatively inexpensive since files are deleted after processing. I would recommend this solution to anyone feeling squeezed by the default 512MB of disk space provided by Lambda functions.</p>
        </div>
      </div>
      <div>
        <hr/>
        &#169; {{ new Date().getFullYear() }} | All Rights Reserved | Briden Solutions LLC
      </div>
    </div>
  </div>

</template>

<script>

import BlogNavBar from '@/components/util/BlogNavBar';
export default {
  name: 'LambdaBlog',
  components: {BlogNavBar},
  head: {
    title: {
      inner: 'AWS Lambda and EFS Integration'
    },
    meta: [
      { property: 'og:image', content: '~@/assets/filesystem.jpg' },
      { property: 'og:title', content: 'AWS Lambda and EFS Integration' }
    ]
  },
}
</script>

<style scoped>
#blog-post {
  overflow: hidden;
  height: 100vh;
  background-color: #e1e1e1;
}
.scrollable {
  overflow: scroll;
  margin-top: 82px;
  height: calc(100% - 82px);
  position: fixed;
  overflow-x: hidden;
  max-width: 100%;
}
.blog .title {
  text-align: inherit;
  padding: 20px;
  background-color: white;
  font-family: Soleil_Bold,Helvetica,Arial,sans-serif;
  color: #333;
}
.blog .title span{
  font-size: 45px;
  font-weight: bold;
}
.contact-icons {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.contact-icons a {
  padding: 15px 10px 6px 20px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: inline-block;
}
.card {
  background-color: white;
  margin: 20px;
  padding: 50px;
  border-radius: 25px;
  text-align: initial;
  grid-column: span 6;
}
.card p {
  line-height: 2.0;
  font-size: 16px;
  font-family: "Lato", sans-serif;
}
pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  overflow: auto;
}
.card a {
  text-decoration: none;
  font-weight: bold;
  color: #75ab38;
}
@media screen and (max-width: 700px) {
  .card {
    padding: 10px;
  }
}
</style>