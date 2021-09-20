<template>
  <div id="blog-post">
    <BlogNavBar></BlogNavBar>
    <div class="scrollable">
      <div class="blog">
        <div class="title">
          <span>The Release Process - Trading Functionality for Releasability</span>
          <p>Matt Briden • April 7, 2021</p>
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
          <img src="~@/assets/distributed-monolith.jpg" class="comic" height="300"/>
          <div class="card">
            <h3>The Headaches of Releasing</h3>
            <p>
              As web developers it can be easy to lose sight of the end goal of the code we write. We can get caught up in new technologies or focus on nagging edge cases that we know exist since we built the system. But at the end of the day the goal is to release new code to the customer and do so in a timely fashion. Unfortunately, releasing code is not always a straight forward process. Often times coordination is needed with other products and this can cause tedious extra (and arguably unnecessary) work for developers. No developer wants to spend time looking through old commits and seeing what can and can't be released, managing multiple branches with different code, or adding logic to hide features that aren't ready to be released. There can be advantages to leveraging other products' resources or piggybacking on their releases, but in my experience making sacrifices around functionality to expedite and simplify the release process can ultimately benefit any product's development cycle.
            </p>
            <h3>Leveraging Self-Sufficient Software</h3>
            <p>
              What often hampers or delays a product's ability to release is sharing a codebase with one or multiple other products. From a functionality perspective this can have obvious benefits; a product's code can directly access other products' datasources, there is no needed communication between separate applications, and there are fewer applications that need managed, to name a few. Although this seems efficient, it can make it a disaster to release. Any time that one product in the codebase wants to release the other products need to ensure all of its code is production ready. And although in theory many development teams try to ensure all code merged into the main branch is "releasable", in reality that often is much more easier said than done. As the number of products that use the codebase grows, you have to rely on more development teams to adhere by that mantra.
            </p>
            <p>
              Another pitfall that is a byproduct of sharing codebases is the word all software employees dread the most; rollbacks. Perhaps your product's code is completely functional but another product introduced a bug and needs to rollback. If your product relies on the same codebases you will need to rollback your newly released code as well, even though there is nothing wrong with the code impacting your product. This unnecessarily delays what we previously defined as the ultimate goal of writing code, releasing new software to the customer.
            </p>
            <p>
              The solution is to create separate codebases and applications for the underlying logic that is needed by your product. Create contracts with other products whose data yours relies on and accept the extra latency from calling those applications. For front end applications, it may mean accepting a small "blip" when navigating from one product to another in the user facing web application. But by gaining the independence to release on your terms and schedule, new code and features will make its way to customers faster. Other products will not need to care if and when you release, and vice versa. Ultimately it will create a quicker and more efficient development cycle, and as a developer allows you to focus on what you like doing best; writing code.
            </p>
            <p>
              Comic courtesy of Sebastian Caceres, check out his <a href="https://sebiwi.github.io/">blog</a> for more cool stuff.
            </p>
          </div>
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
  name: 'ReleaseProcessBlog',
  components: {BlogNavBar}
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
.contact-icons, .comic {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.comic {
  max-width: 100%;
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
.card a {
  text-decoration: none;
  font-weight: bold;
  color: #75ab38;
}
pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  overflow: auto;
}
@media screen and (max-width: 700px) {
 .card {
   padding: 0;
 }
}
</style>