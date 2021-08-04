<template>
  <div id="portfolio">
    <h1>Featured Projects</h1>
      <div class="featured-projects">
        <div class="am-project" @mouseenter="mouseOver('am-info', true)" @mouseleave="mouseOver('am-info', false)">
          <div id="am-info" class="info">
            <h2>Amenity Match</h2>
            <h3>Spring Boot / Vue.js / AWS</h3>
            <div class="view-site">
              <a href="#">View Site</a>
            </div>
          </div>
          <img src="~@/assets/amenity-match-logo.svg" height="150px"/>
        </div>
        <div class="project" @mouseenter="mouseOver('fg-info', true)" @mouseleave="mouseOver('fg-info', false)">
          <div id="fg-info" class="info">
            <h2>FileGenius</h2>
            <h3>AWS Lambda Functions / Python / React</h3>
            <div class="view-site">
              <a href="#">View Site</a>
            </div>
          </div>
          <img src="~@/assets/file-genius-logo.png" height="250px"/>
        </div>
        <div class="project">
          <div class="info" v-if="fg2Hovered">
            <h2>FileGenius</h2>
            <h3>AWS Lambda Functions / Python / React</h3>
            <div class="view-site">
              <a href="#">View Site</a>
            </div>
          </div>
          <img src="~@/assets/file-genius-logo.png" height="250px"/>
        </div>
      </div>
  </div>

</template>

<script>
export default {
  name: 'Portfolio',
  data() {
    return {
      amHovered: false,
      fgHovered: false,
      fg2Hovered: false
    }
  },
  methods: {
    mouseOver(project, enter) {
      let el = document.getElementById(project);
        if (enter) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
      }
    }
  }
}
</script>

<style scoped>
#portfolio {
  padding-top: 40px;
  background-color: #ffffff;
  padding-bottom: 40px
}

.featured-projects {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 5px;
}

.project, .am-project {
  grid-column: span 4;
  position: relative;
}

.am-project img {
  padding-top: 37px;
}

.info {
  background-color: rgba(0,0,0,0.8);
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
.info .view-site {
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
.info .view-site a:hover {
  border: thick solid white;
  font-weight: bold;
}
@keyframes fadein {
  0% { opacity: 0; }
  45% { opacity: 0; }
  100% { opacity: 1; }
}
/* Firefox < 16 */
@-moz-keyframes fadein {
  0% { opacity: 0; }
  45% { opacity: 0; }
  100% { opacity: 1; }
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  0% { opacity: 0; }
  45% { opacity: 0; }
  100% { opacity: 1; }
}
/* Internet Explorer */
@-ms-keyframes fadein {
  0% { opacity: 0; }
  45% { opacity: 0; }
  100% { opacity: 1; }
}
/* Opera < 12.1 */
@-o-keyframes fadein {
  0% { opacity: 0; }
  45% { opacity: 0; }
  100% { opacity: 1; }
}
@media screen and (max-width: 600px) {
  .project, .am-project {
    grid-column: span 12;
  }
}
</style>