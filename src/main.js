import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VCalendar from 'v-calendar';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import "./bus";

Vue.use(VueAxios, axios);
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

Vue.config.productionTip = false
Vue.component('loading', Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
