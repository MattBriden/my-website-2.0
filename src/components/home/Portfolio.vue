<template>
  <div id="portfolio">
    <div class="wrapper">
    <h1>Featured Projects</h1>
      <div v-if="this.onMobile" class="featured-projects">
        <div class="am-project" @click="toggleInfo('am-info')">
          <div id="am-info" class="mobile-info">
            <h2>Amenity Match</h2>
            <h3>Spring Boot / Vue.js / PostgreSQL / AWS</h3>
            <div class="view-site">
              <a target="_blank" href="https://www.amenitymatch.com/">Learn More</a>
            </div>
          </div>
          <img src="~@/assets/amenity-match-logo.svg" height="150px"/>
        </div>
        <div class="fg-project" @click="toggleInfo('fg-info')">
          <div id="fg-info" class="mobile-info">
            <h2>FileGenius</h2>
            <h3>AWS Lambda Functions / Python / Terraform / React</h3>
            <div class="view-site">
              <a target="_blank" href="https://www.filegenius.com/">Learn More</a>
            </div>
          </div>
          <img src="~@/assets/file-genius-logo.png" height="250px"/>
        </div>
        <div class="symbio-project" @click="toggleInfo('symbio-info')">
          <div id="symbio-info" class="mobile-info">
            <h2>Parti</h2>
            <h3>AWS Consultation / AWS AppSync / Aurora Serverless</h3>
            <div class="view-site">
              <a target="_blank" href="https://partiofficial.com/services">Learn More</a>
            </div>
          </div>
          <img src="~@/assets/parti-logo.png" height="100px"/>
        </div>
      </div>
      <div v-else class="featured-projects">
        <div class="am-project">
          <div class="info">
            <h2>Amenity Match</h2>
            <h3>Spring Boot / Vue.js / PostgreSQL / AWS</h3>
            <div class="view-site">
              <a target="_blank" href="https://www.amenitymatch.com/">Learn More</a>
            </div>
          </div>
          <img src="~@/assets/amenity-match-logo.svg" height="150px"/>
        </div>
        <div class="fg-project">
          <div class="info">
            <h2>FileGenius</h2>
            <h3>AWS Lambda Functions / Python / Terraform / React</h3>
            <div class="view-site">
              <a target="_blank" href="https://www.filegenius.com/">Learn More</a>
            </div>
          </div>
          <img src="~@/assets/file-genius-logo.png" height="250px"/>
        </div>
        <div class="symbio-project">
          <div class="info">
            <h2>Parti</h2>
            <h3>AWS Consultation / AWS AppSync</h3>
            <div class="view-site">
              <a target="_blank" href="https://partiofficial.com/services">Learn More</a>
            </div>
          </div>
          <img src="~@/assets/parti-logo.png" height="100px"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Portfolio',
  data() {
    return {
      onMobile: false
    }
  },
  created() {
    this.updateSize();
  },
  methods: {
    updateSize() {
      this.onMobile = window.innerWidth <= 900;
    },
    toggleInfo(el) {
      let element = document.getElementById(el);
      if (element.style.display === 'block') {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    }
  },
  mounted() {
    window.addEventListener('load', this.updateSize);
    window.addEventListener('resize', this.updateSize);
  }
}
</script>

<style scoped>
#portfolio {
  padding-top: 40px;
  background-color: #e1e1e1;
  padding-bottom: 40px
}

.wrapper {
  background-color: white;
  border-radius: 25px;
  margin: 40px;
  padding: 40px;
}

.featured-projects {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 5px;
}

.fg-project, .am-project, .symbio-project {
  grid-column: span 4;
  position: relative;
  border-radius: 25px;
  border: solid thin gray;
  margin: 15px;
  height: 258px;
}

.am-project {
  background-color: rgba(230, 250, 250, 0.97);
}

.fg-project {
  background-color: white;
}

.symbio-project {
  background-color: black;
}

.am-project img {
  padding-top: 37px;
}

.symbio-project img {
  padding-top: 70px;
}

.featured-projects img {
  max-width: 100%;
}

.info {
  background-color: black;
  border-radius: 25px;
  position: absolute;
  height: 100%;
  width: 100%;
  color: white;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.info:hover {
  opacity: 0.8;
}

.info h3 {
  padding: 10px;
}

.info .view-site, .mobile-info .view-site {
  padding-top: 35px;
}
.info .view-site a {
  text-decoration: none;
  color: white;
  border: thin solid white;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.mobile-info .view-site a {
  text-decoration: none;
  color: white;
  border: thick solid white;
  font-weight: bold;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.mobile-info {
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 25px;
  position: absolute;
  height: 100%;
  width: 100%;
  color: white;
  display: none;

  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
}

.info .view-site a:hover {
  border: thick solid white;
  font-weight: bold;
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Firefox < 16 */
@-moz-keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Internet Explorer */
@-ms-keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Opera < 12.1 */
@-o-keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media screen and (max-width: 1024px) {
  .fg-project, .symbio-project, .am-project {
    grid-column: span 12;
  }
  .wrapper {
    padding: 15px;
    margin: 15px;
  }
}
</style>