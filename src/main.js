import Vue from 'vue';
import VueRouter from 'vue-router';
import VueObserveVisibility from 'vue-observe-visibility';
import Notifications from 'vue-notification';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSun, faChartLine, faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from '@/components/App';
import router from './router';

library.add(faBars);
library.add(faSun);
library.add(faChartLine);
library.add(faFire);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter);
Vue.use(VueObserveVisibility);
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
