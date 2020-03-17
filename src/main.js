import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routers from './router'
import store from './store.js'
import axios from 'axios'
import cors from 'cors'
import jquery from 'jquery'

Vue.use(VueRouter);
Vue.use(cors);

Vue.prototype.$http = axios;
Vue.prototype.$getTarget = function(e) {
  return e.target ? e.target : e.srcElement;
}
Vue.prototype.$ = jquery;

const router = new VueRouter({
  mode: 'history',
  routes: routers
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
