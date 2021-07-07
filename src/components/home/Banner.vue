<template>
  <div id="banner">
    <NavBar></NavBar>
    <div class="home-text">
      <p>
        Reliable and Quality Software
      </p>
      <p>
        For Your Cloud Computing Needs
      </p>
    </div>
  </div>

</template>

<script>
import NavBar from '@/components/util/NavBar'

export default {
  name: 'Banner',
  components: {
    NavBar
  }
}
</script>

<style>
#banner {
  background: url('~@/assets/home-image.jpg') no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow: auto;
  height: 100vh;
}
.home-text {
  color: white;
  bottom: 110px;
  position: absolute;
  width: 100%;
  font-size: 40px;
  z-index: 1;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.home-text p {
  margin: 0;
}
</style>