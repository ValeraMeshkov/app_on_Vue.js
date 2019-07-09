import Vue from 'vue';
import App from './components/App.vue';
import Wrapper from './components/Wrapper/Wrapper';
import NewCar from './components/NewCar/NewCar';
import store from './store/index.js';
import VueResource from 'vue-resource';

import { library } from '@fortawesome/fontawesome-svg-core';

import { faTh, faTimes, faArrowCircleLeft, faSyncAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add( faTh, faTimes, faArrowCircleLeft, faSyncAlt);

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import vScroll from 'vue-scroll';
import vuescroll from 'vue-scroll';

import VueNumeric from 'vue-numeric';

import VueRouter from 'vue-router';

Vue.use(VueResource, BootstrapVue, vScroll, vuescroll, VueNumeric);

Vue.use(VueRouter);
let router = new VueRouter({
  routes: [
    { path: '', component: Wrapper},
    { path: '/create', component: NewCar}
  ]
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  components: {
    VueNumeric,
  },
});
