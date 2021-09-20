<template>
  <div id="navbar" ref="navbar" :class="{change_bgcolor: scrollPosition > 100 || this.showMobileNav}">
    <div class="logo">
      <img v-if="scrollPosition > 100 || this.showMobileNav" src="~@/assets/SVGLogo.svg" height="50px"/>
    </div>
    <div class="navbar" :class="{change_txtcolor: scrollPosition > 100 || this.showMobileNav}">
      <font-awesome-icon v-if="onMobile" icon="bars" size="2x" :class="{black_bars: scrollPosition > 100 || this.showMobileNav, white_bars: scrollPosition <= 100 && !this.showMobileNav}" :style="{ 'margin-top': '10px', 'margin-right': '15px' }" @click="toggleDropdown"/>
      <ul class="desktop-nav" v-else>
        <li>
          <a @click="scrollTo('home', 0)" :class="{change_txtcolor: scrollPosition > 100}"><span>Home</span></a>
        </li>
        <span>|</span>
        <li>
          <a @click="scrollTo('services', -50)" :class="{change_txtcolor: scrollPosition > 100}"><span>Services</span></a>
        </li>
        <span>|</span>
        <li>
          <a @click="scrollTo('about', -100)" :class="{change_txtcolor: scrollPosition > 100}"><span>About</span></a>
        </li>
        <span>|</span>
        <li>
          <a @click="scrollTo('portfolio', -50)" :class="{change_txtcolor: scrollPosition > 100}"><span>Portfolio</span></a>
        </li>
        <span>|</span>
        <li>
          <a @click="scrollTo('contact-us', -50)" :class="{change_txtcolor: scrollPosition > 100}"><span>Contact Us</span></a>
        </li>
        <span>|</span>
        <li>
          <router-link to="/blog" :class="{change_txtcolor: scrollPosition > 100}"><span>Development Blog</span></router-link>
        </li>
      </ul>
    </div>
    <div class="mobile" v-if="showMobileNav">
      <ul class="mobile-nav" ref="mobile-nav">
        <li>
          <a @click="scrollTo('home')"><span>Home</span></a>
        </li>
        <hr/>
        <li>
          <a @click="scrollTo('services', -50)"><span>Services</span></a>
        </li>
        <hr/>
        <li>
          <a @click="scrollTo('about', -100)"><span>About</span></a>
        </li>
        <hr/>
        <li>
          <a @click="scrollTo('portfolio', -50)"><span>Portfolio</span></a>
        </li>
        <hr/>
        <li>
          <a @click="scrollTo('contact-us', -50)"><span>Contact Us</span></a>
        </li>
        <hr/>
        <li>
          <router-link to="/blog"><span>Development Blog</span></router-link>
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
      this.onMobile = window.innerWidth <= 1010;
    },
    toggleDropdown() {
      this.showMobileNav = !this.showMobileNav;
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    scrollTo(id, yOffset) {
      const el = document.getElementById(id);
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      if (el) {
        setTimeout(window.scrollTo({top: y, behavior: 'smooth'}), 0);
        if (this.onMobile) {
          this.toggleDropdown();
        }
      }
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
  margin-left: 50px;
  margin-top: 20px;
}
.black_bars {
  color: black;
  cursor: pointer;
}
.white_bars {
  color: white;
  cursor: pointer;
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
.mobile-nav span {
  color: black;
}
.mobile {
  margin-top: 82px;
  width: 100%;
  -moz-transition: all .3s ease-in;
  -o-transition: all .3s ease-in;
  -webkit-transition: all .3s ease-in;
  transition: all .3s ease-in;
}
li {
  display: inline;
  padding: 20px;
}
a {
  text-decoration: none;
  color: white;
  cursor: pointer;
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
  border-bottom: thin solid black;
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
@media screen and (max-width: 950px) {
  a {
    margin-right: unset;
  }
}
</style>
