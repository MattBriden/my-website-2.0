<template>
  <div id="navbar" ref="navbar" :class="{change_bgcolor: scrollPosition > 100}">
    <div class="logo">
<!--      <img src="~@/assets/amenity-match-logo.svg" height="50px"/>-->
    </div>
    <div class="navbar" :class="{change_txtcolor: scrollPosition > 100}">
      <font-awesome-icon v-if="onMobile" icon="bars" size="2x" :style="{ color: 'white', 'margin-top': '10px', 'margin-right': '15px' }" @click="toggleDropdown"/>
      <ul class="desktop-nav" v-else>
        <li>
          <router-link to="/" :class="{change_txtcolor: scrollPosition > 100}"><strong>Home</strong></router-link>
        </li>
        <strong>|</strong>
        <li>
          <a :class="{change_txtcolor: scrollPosition > 100}"><strong>About</strong></a>
        </li>
        <strong>|</strong>
        <li>
          <a :class="{change_txtcolor: scrollPosition > 100}"><strong>Contact Us</strong></a>
        </li>
        <strong>|</strong>
        <li>
          <router-link to="/blog" :class="{change_txtcolor: scrollPosition > 100}"><strong>Development Blog</strong></router-link>
        </li>
      </ul>
    </div>
    <div class="mobile" v-if="showMobileNav">
      <ul class="mobile-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <hr/>
        <li>
          <router-link to="/blog">Development Blog</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      onMobile: false,
      loggedIn: false,
      showMobileNav: false,
      scrollPosition: null
    };
  },
  created() {
    this.updateSize();
  },
  methods: {
    updateSize() {
      this.onMobile = window.innerWidth <= 900;
    },
    toggleDropdown() {
      this.showMobileNav = !this.showMobileNav;
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    }
  },
  mounted() {
    window.addEventListener('load', this.updateSize);
    window.addEventListener('resize', this.updateSize);
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>

<style scoped>
#navbar {
  position: fixed;
  width: 100%;
  -moz-transition: all .3s ease-in;
  -o-transition: all .3s ease-in;
  -webkit-transition: all .3s ease-in;
  transition: all .3s ease-in;
  z-index: 2;
  height: 81px;
}
.logo {
  float: left;
  margin-left: 40px;
  margin-top: 25px;
}
.navbar {
  float: right;
  color: white;
  margin-top: 22px;
  margin-right: 10px;
  font-size: 20px;
  -moz-transition: all .3s ease-in;
  -o-transition: all .3s ease-in;
  -webkit-transition: all .3s ease-in;
  transition: all .3s ease-in;
}
.navbar .desktop-nav {
  list-style-type: none;
}
.mobile-nav {
  list-style-type: none;
  background-color: white;
  color: black;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.mobile {
  margin-top: 82px;
  width: 100%;
}
li {
  display: inline;
  padding: 20px;
}
a {
  text-decoration: none;
  color: white;
  margin-right: 10px;
  font-size: 20px;
  -moz-transition: all .3s ease-in;
  -o-transition: all .3s ease-in;
  -webkit-transition: all .3s ease-in;
  transition: all .3s ease-in;
}
button {
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
}
.change_bgcolor {
  -moz-transition: all .3s ease-in;
  -o-transition: all .3s ease-in;
  -webkit-transition: all .3s ease-in;
  transition: all .3s ease-in;
  background-color: white;
}
.change_txtcolor {
  -moz-transition: all .3s ease-in;
  -o-transition: all .3s ease-in;
  -webkit-transition: all .3s ease-in;
  transition: all .3s ease-in;
  color: black;
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
@media screen and (max-width: 600px) {
  a {
    margin-right: unset;
  }
}
</style>
