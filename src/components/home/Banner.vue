<template>
  <div id="banner">
    <NavBar :scrollTo="scrollTo"></NavBar>
    <div class="home-text">
      <img src="~@/assets/SVGLogo_white.svg" height="350px"/>
      <p class="first-line">
        Full Stack Solutions
      </p>
      <p>
        For Your Cloud Computing Needs
      </p>
    </div>
    <div class="contact">
      <div class="component">
        <Contact></Contact>
      </div>
    </div>
  </div>

</template>

<script>
import NavBar from '@/components/util/NavBar'
import Contact from '@/components/util/Contact';

export default {
  name: 'Banner',
  components: {
    NavBar,
    Contact,
  }
}
</script>

<style>
#banner {
  background: url('~@/assets/background_2.jpg') no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: auto;
  height: 100vh;
}
.home-text {
  color: white;
  margin-top: 20vh;
  width: 50%;
  font-size: 30px;
  z-index: 1;
  float: left;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.home-text .first-line {
  padding-top: 25px;
}
.home-text p {
  margin: 0;
}
.component {
  margin-top: 200px;
  width: 75%;
}
.contact {
  width: 40%;
  float: right;
  height: 100%;
  vertical-align: middle;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}
@keyframes fadein {
  0% { opacity:0; }
  45% { opacity:0; }
  100% { opacity:1; }
}
/* Firefox < 16 */
@-moz-keyframes fadein {
  0% { opacity:0; }
  45% { opacity:0; }
  100% { opacity:1; }
}
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  0% { opacity:0; }
  45% { opacity:0; }
  100% { opacity:1; }
}
/* Internet Explorer */
@-ms-keyframes fadein {
  0% { opacity:0; }
  45% { opacity:0; }
  100% { opacity:1; }
}
/* Opera < 12.1 */
@-o-keyframes fadein {
  0% { opacity:0; }
  45% { opacity:0; }
  100% { opacity:1; }
}
@media screen and (max-width: 1050px) {
  .home-text, .contact {
    float: unset;
    width: 100%;
  }
  .contact {
    display: none;
  }
}
</style>