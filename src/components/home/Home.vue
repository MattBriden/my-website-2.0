<template>
  <div id="home">
    <Banner></Banner>
    <Services></Services>
    <About></About>
    <Portfolio></Portfolio>
    <ContactUs></ContactUs>
  </div>

</template>

<script>
import Banner from '@/components/home/Banner';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import ContactUs from '@/components/home/ContactUs';
import Portfolio from "@/components/home/Portfolio";

export default {
  name: 'Home',
  components: {
    Banner,
    Services,
    About,
    Portfolio,
    ContactUs
  }
}
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  margin: 0;
}
</style>