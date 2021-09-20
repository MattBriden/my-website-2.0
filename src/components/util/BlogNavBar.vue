<template>
  <div id="navbar" ref="navbar">
    <div class="logo">
      <img src="~@/assets/SVGLogo.svg" height="50px"/>
    </div>
    <div class="navbar">
      <font-awesome-icon v-if="onMobile" icon="bars" size="2x" :style="{ color: '#383838', 'margin-top': '10px', 'margin-right': '15px' }" @click="toggleDropdown"/>
      <ul class="desktop-nav" v-else>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <span>|</span>
        <li>
          <router-link to="/blog">Development Blog</router-link>
        </li>
      </ul>
    </div>
    <div class="mobile" v-if="showMobileNav">
      <ul class="mobile-nav">
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <hr/>
        <li >
          <router-link to="/blog">Development Blog</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogNavBar',
  data() {
    return {
      onMobile: false,
      showMobileNav: false
    };
  },
  created() {
    this.updateSize();
  },
  methods: {
    updateSize() {
      this.onMobile = window.innerWidth <= 600;
    },
    toggleDropdown() {
      this.showMobileNav = !this.showMobileNav;
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateSize);
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
  background-color: white;
  border-bottom: thin solid black;
}
.logo {
  float: left;
  margin-left: 40px;
  margin-top: 25px;
}
.navbar {
  float: right;
  color: black;
  margin-top: 22px;
  margin-right: 10px;
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
  color: black;
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
@media screen and (max-width: 600px) {
  a {
    margin-right: unset;
  }
}
</style>