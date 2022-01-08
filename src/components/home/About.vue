<template>
  <div id="about">
    <h1 v-observe-visibility="visibilityChanged" :class="{saves_money: savesMoneySeen === true}">Why Helios?</h1>
    <div class="test">
      <div class="info-wrapper" id="saves-money" v-observe-visibility="visibilityChanged" :class="{saves_money: savesMoneySeen === true}">
        <div class="info">
          <font-awesome-icon icon="sun" size="5x" :style="{ color: '#75ab38' }"/>
          <p><b>Reliable</b></p>
          <p>
            Helios is the Greek god that charioted the sun across the sky. At Helios we believe that your software should be as reliable and worry-free as the sun rising every morning. We strive to architect and execute solutions based on your needs so you can provide the best product possible for your customers.
          </p>
        </div>
      </div>
      <div class="info-wrapper" id="up-to-date" v-observe-visibility="visibilityChanged" :class="{up_to_date: upToDateSeen === true}">
        <div class="info">
          <font-awesome-icon icon="chart-line" size="5x" :style="{ color: '#75ab38' }"/>
          <p><b>Scalable</b></p>
          <p>
            Our solutions leverage technology that ensures your product is always highly available to your customers regardless of the amount of traffic coming in. We provide the ease of mind knowing your customers can always use your product while also saving you costs during low-usage times.
          </p>
        </div>
      </div>
      <div class="info-wrapper" id="attract-clients" v-observe-visibility="visibilityChanged" :class="{attract_clients: findsClientsSeen === true}">
        <div class="info">
          <font-awesome-icon icon="fire" size="5x" :style="{ color: '#75ab38' }"/>
          <p><b>Bleeding Edge</b></p>
          <p>
            At Helios we do what we do out of a passion for new technologies. We are constantly researching new and innovative ways to provide solutions to our clients that can stay relevant for long periods of time. Check out our <router-link to="/blog" class="link">blog</router-link> to see some of the new technologies we are working with.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      upToDateSeen: false,
      findsClientsSeen: false,
      savesMoneySeen: false
    };
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (isVisible) {
        if (entry.target.id == 'up-to-date' && !this.upToDateSeen){
          this.upToDateSeen = true;
        } else if (entry.target.id == 'attract-clients' && !this.findsClientsSeen){
          this.findsClientsSeen = true;
        } else if (entry.target.id == 'saves-money' && !this.savesMoneySeen){
          this.savesMoneySeen = true;
        }
      }
    }
  }
}
</script>

<style scoped>
#about {
  padding-top: 50px;
  background-color: #e1e1e1;
}
.test {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.info-wrapper {
  grid-column: span 4;
  border: 30px solid #e1e1e1;
  background-color: #e1e1e1;
}
.info {
  background-color: white;
  padding: 25px;
  font-size: 20px;
  border-radius: 8px;
  height: 85%;
}
.link {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
.about-text h2 {
  color: goldenrod;
}
.about-text p {
  text-align: center;
  margin: 0;
  font-size: 25px;
}
.icons {
  width: 100%;
}
.icons ul {
  justify-content: center;
  display: flex;
}
.icons li {
  padding-top: 100px;
  padding-right: 100px;
  padding-left: 100px;
  padding-bottom: 50px;
  display: table-cell;
  vertical-align: middle;
}
.icons span{
  display: table-cell;
  vertical-align: middle;
}

.info p {
  text-align: initial;
}
.saves_money {
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
}

.up_to_date {
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
}

.attract_clients {
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
}

@keyframes fadein {
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}
@media screen and (max-width: 900px) {
  .info-wrapper {
    grid-column: span 12;
    border-top: 10px;
    border-bottom: 10px;
    margin-bottom: 30px;
  }
}
</style>
