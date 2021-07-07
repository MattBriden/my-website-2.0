<template>
  <div id="home">
    <Banner></Banner>
    <v-footer padless>
      <v-col
          class="text-center"
          cols="12"
      >
        <hr/>
        &#169; {{ new Date().getFullYear() }} | All Rights Reserved | Briden Solutions LLC
      </v-col>
    </v-footer>
  </div>

</template>

<script>
import Banner from '@/components/home/Banner'

export default {
  name: 'Home',
  components: {
    Banner
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
v-col {
  padding-bottom: 20px;
}
</style>