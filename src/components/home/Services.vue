<template>
  <div id="services">
    <div class="wrapper">
      <h2>Our Services</h2>
      <hr/>
      <div class="our-services">
        <div class="chunk">
          <ul>
            <li><font-awesome-icon icon="code" size="1x" :style="{ color: '#75ab38' }"/><span>Custom Frontend and Backend Development</span></li>
            <li><font-awesome-icon icon="tools" size="1x" :style="{ color: '#75ab38' }"/><span>Cloud Architecture Design</span></li>
            <li><font-awesome-icon icon="tasks" size="1x" :style="{ color: '#75ab38' }"/><span>Project Consultation</span></li>
          </ul>
        </div>
        <div class="chunk">
          <ul>
            <li><font-awesome-icon icon="pencil-ruler" size="1x" :style="{ color: '#75ab38' }"/><span>Initial Product Design and Development</span></li>
            <li><font-awesome-icon icon="arrow-right" size="1x" :style="{ color: '#75ab38' }"/><span>Migration of Legacy Applications to Modern Infrastructure</span></li>
            <li><font-awesome-icon icon="plus" size="1x" :style="{ color: '#75ab38' }"/><span>Web Application Upgrade and Maintenance</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      onMobile: false,
      pageSeen: true,
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
    },
    visibilityChanged(isVisible) {
      if (isVisible) {
        this.pageSeen = true;
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
#services {
  padding-top: 40px;
  background-color: #e1e1e1;
}

.wrapper {
  background-color: white;
  border-radius: 8px;
  margin: 40px 40px 0px 40px;
  padding: 40px;
}
.wrapper .our-services {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.chunk {
  grid-column: span 6;
}

.chunk ul {
  font-size: 18px;
  list-style-type: none;
  text-align: left;
}

.chunk ul li {
  padding: 10px
}

.chunk ul li span {
  padding-left: 7px;
}
.seen {
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
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
@media screen and (max-width: 800px) {
  .chunk {
    grid-column: span 12;
  }
  .chunk ul {
    margin: unset;
  }
  .wrapper {
    padding: 15px;
    margin: 15px;
  }
}
</style>