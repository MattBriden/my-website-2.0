<template>
  <div id="blog-post">
    <BlogNavBar></BlogNavBar>
    <div class="scrollable">
      <div class="blog">
        <div class="title">
          <span>Creating a Private PyPI Repository with AWS - Part 1</span>
          <p>Matt Briden • October 17, 2021</p>
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
          <h3>What is PyPI and why is it important?</h3>
          <p>
            <a href="https://pypi.org/">PyPI</a> is short for The Python Package Index and is a repository for third party Python packages. When building a Python application using pip as your package manager typically all the libraries you pull into your project are coming from the default PyPI repository. There are exceptions to this rule, such as if you are using something like <a href="https://docs.conda.io/en/latest/">Conda</a> which provides a package manager and virtual environment, but for this post we will be focusing on projects that use pip. By providing a centralized location to download third party Python libraries PyPI is integral to Python application development.
          </p>
          <h3>Modern architecture and avoiding duplicate code</h3>
          <p>With the emergence of new standards around software architecture consolidating commonly used code is not as easy as it once was. In monolith applications a common or shared module could be created and imported into whatever files needed it. However, today monliths are frowned upon and logical parts of software are often broken out into their own applications. Developers need a way to still import common code into these standalone applications without having to duplicate the code in each codebase. AWS has created a great solution for this with their <a href="https://aws.amazon.com/codeartifact/">Code Artifact</a> service. Code Artifact gives developers the ability to create their own artifact repositories and <a href="https://aws.amazon.com/blogs/aws/software-package-management-with-aws-codeartifact/">supports many of the most popular package managers</a>. For Python developers this gives us the perfect platform for storing our common code in a way so that it can be used by any Python application running in AWS.</p>
          <h3>Creating and pushing to a Code Artifact PyPI repository</h3>
          <p>If you have read my past blog posts you probably know I love using Terraform, and in this case Terraform makes creating our PyPI repo incredibly easy. The below code is all that is needed to provision the Code Artifact repository.</p>
          <pre><code>
      resource "aws_codeartifact_domain" "repo_domain" {
        domain = "my-pypi-domain"
      }

      resource "aws_codeartifact_repository" "pypi_server" {
        repository = "my-pypi-server"
        domain     = aws_codeartifact_domain.repo_domain.domain
        external_connections {
          external_connection_name = "public:pypi"
        }
      }
          </code></pre>
          <p>To push to and pull from this repository we need to login to Code Artifact and define the commands that we will be using to communicate with the repo. For this example we will be using <a href="https://pypi.org/project/twine/">twine</a> to push to the repository and, as previously stated, pip to pull. We can run the below command to login to Code Artifact.</p>
          <pre><code>
      aws codeartifact login --tool twine | pip --domain my-pypi-domain --domain-owner 111222333444 --repository my-pypi-server
          </code></pre>
          <p>The domain argument will be the same domain that was defined in the aws_codeartifact_domain resource, the domain-owner is the account ID for your AWS account, and the repository argument reflects the name of the repository defined in the aws_codeartifact_repository resource. When pushing with twine define the repository being used as codeartifact. The below command can be used to push to the repository.</p>
          <pre><code>
      twine upload --verbose --repository codeartifact path/to/your/package.tar.gz
          </code></pre>
          <p>Pip can be used as it regularly would. On top of being able to download your own custom PyPI packages you can also install packages from the default PyPI repo. If these packages don't exist in your custom repository AWS will download them into the repo for you. If you do want to revert to using the default PyPI repository include the -i flag in the pip command.</p>
          <pre><code>
      # Download package from your Code Artifact repo
      pip install my-package

      # Download from the default PyPI repo
      pip install -i https://pypi.org/simple requests
          </code></pre>
          <p>And that's it! In Part 2 of this series of posts I'll layout how Code Artifact can be coupled with AWS Code Build and Code Pipeline to create CI/CD pipelines that automatically build your packages and install them into the necessary Python applications.</p>
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
  name: 'PyPiBlog',
  components: {BlogNavBar},
  head: {
    title: {
      inner: 'AWS Lambda and EFS Integration'
    },
    meta: [
      { property: 'og:image', content: '~@/assets/pypi.jpg' },
      { property: 'og:title', content: 'PyPI in AWS' }
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
  margin: 20px 40px 20px 40px;
  padding: 50px 100px 50px 100px;
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