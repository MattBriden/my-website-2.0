<template>
  <div id="about">
    <div class="about-text">
      <h2>Why Helios?</h2>
      <p>
        Helios is the Greek god that charioted the sun across the sky. <strong>At Helios we believe that your software should be as reliable and worry-free as the sun rising every morning.</strong> We strive to architect and execute solutions based on your needs so you can provide the best product possible for your customers.
      </p>
    </div>
    <div class="icons">
      <ul>
        <li id="up-to-date" v-observe-visibility="visibilityChanged" :class="{up_to_date: upToDateSeen == true}">
          <font-awesome-icon icon="sun" size="5x" :style="{ color: '#D4AC0D' }"/>
          <span>Reliable</span>
        </li>
        <li id="finds-clients" v-observe-visibility="visibilityChanged" :class="{finds_clients: findsClientsSeen == true}">
          <font-awesome-icon icon="chart-line" size="5x" :style="{ color: '#196F3D' }"/>
          <span>Scalable</span>
        </li>
        <li id="saves-money" v-observe-visibility="visibilityChanged" :class="{saves_money: savesMoneySeen == true}">
          <font-awesome-icon icon="fire" size="5x" :style="{ color: '#DC7633' }"/>
          <span>Cutting Edge</span>
        </li>
      </ul>
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
        if (entry.target.id === 'up-to-date' && !this.upToDateSeen){
          this.upToDateSeen = true;
        } else if (entry.target.id === 'finds-clients' && !this.findsClientsSeen){
          this.findsClientsSeen = true;
        } else if (entry.target.id === 'saves-money' && !this.savesMoneySeen){
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
.about-text {
  margin-right: 15%;
  margin-left: 15%;
  min-width: 70%;
}
.about-text h2 {
  color: black;
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
  margin: unset;
}
.icons li {
  padding-top: 50px;
  padding-right: 100px;
  padding-left: 100px;
  padding-bottom: 50px;
  display: table-cell;
  vertical-align: middle;
}
.icons li span{
  display: table-cell;
  vertical-align: middle;
  padding-top: 10px;
}
.up_to_date {
  -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 1s; /* Firefox < 16 */
  -ms-animation: fadein 1s; /* Internet Explorer */
  -o-animation: fadein 1s; /* Opera < 12.1 */
  animation: fadein 1s;
}

.finds_clients {
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.saves_money {
  -webkit-animation: fadein 3s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 3s; /* Firefox < 16 */
  -ms-animation: fadein 3s; /* Internet Explorer */
  -o-animation: fadein 3s; /* Opera < 12.1 */
  animation: fadein 3s;
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
@media screen and (max-width: 600px) {
  .icons ul, .icons li, .icons li span {
    display: block;
    padding: 20px;
  }
  .finds_clients, .saves_money {
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation: fadein 2s; /* Firefox < 16 */
    -ms-animation: fadein 2s; /* Internet Explorer */
    -o-animation: fadein 2s; /* Opera < 12.1 */
    animation: fadein 2s;
  }
}
</style>
