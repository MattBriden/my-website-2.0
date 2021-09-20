<template>
  <div id="dev-blog">
    <BlogNavBar></BlogNavBar>
    <div class="blog-desc">
      <div class="title">
        <span>helios Development Blog</span>
      </div>
      <p>A blog about interesting technologies and development practices from the helios team.</p>
    </div>
    <div class="blogs">
      <div class="card" @click="goToBlog('lambda')">
        <img src="~@/assets/filesystem.jpeg" height="200"/>
        <h2>AWS Lambda and EFS Integration</h2>
        <h5>June 24, 2021</h5>
        <p>It's often thought that when working with AWS Lambda functions we are limited to 512MB of disk space. This post introduces a solution to work around this limitation by leveraging EFS.</p>
      </div>
      <div class="card" @click="goToBlog('release-process')">
        <img src="~@/assets/release.png" height="200"/>
        <h2>The Release Process - Trading Functionality for Releasability</h2>
        <h5>Apr 7, 2021</h5>
        <p>A discussion of the importance to be able to release quickly and painlessly, even if that means sacrificing functionality.</p>
      </div>
      <div class="card" @click="goToBlog('ml')">
        <img src="~@/assets/machinelearning.jpeg"/>
        <h2>Machine Learning with Python</h2>
        <h5>Mar 2, 2021</h5>
        <p>Machine Learning isn't as intimidating as it sounds, this provides a simple implementation of a random forest classifier using the Python library scikit-learn.</p>
      </div>
      <div class="card" @click="goToBlog('webflux')">
        <img src="~@/assets/webflux.png" height="200"/>
        <h2>Spring WebFlux</h2>
        <h5>Jan 10, 2021</h5>
        <p>This describes the benefits of using a reactive RESTful API and walks through how to implement one using the Spring WebFlux framework.</p>
      </div>
    </div>
    <div class="footer">
      <hr/>
      &#169; {{ new Date().getFullYear() }} | All Rights Reserved | Briden Solutions LLC
    </div>
  </div>

</template>

<script>
import BlogNavBar from '@/components/util/BlogNavBar'

export default {
  name: 'DevBlog',
  components: {
    BlogNavBar
  },
  methods: {
    goToBlog(blog) {
      this.$router.push('/blog/' + blog);
    }
  }
}
</script>

<style scoped>
#dev-blog {
  overflow: auto;
  height: 100vh;
  background-color: #e1e1e1;
}
.blog-desc {
  background: url('~@/assets/background_2.jpg') no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: white;
  height: 250px;
  margin-top: 82px;
}
.blog-desc .title {
  padding-top: 25px;
}
.blog-desc .title span {
  font-size: 75px;
}
.blog-desc p {
  font-size: 25px;
  font-weight: bold;
}
.blogs {
  background-color: #e1e1e1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.card {
  background-color: white;
  margin: 20px;
  padding: 20px;
  border-radius: 25px;
  text-align: initial;
  grid-column: span 6;
}
.card:hover {
  cursor: pointer;
  border: thin solid black;
}
.card a {
  text-decoration: none;
  color: black;
}
.card img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 200px;
  max-width: 100%;
}
@media screen and (max-width: 1000px) {
  .card {
    grid-column: span 12;
  }
  .blog-desc {
    text-align: inherit;
  }
  .blog-desc .title span {
    font-size: 35px;
  }
  .blog-desc p {
    font-size: 20px;
  }
}
</style>