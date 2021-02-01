import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';


Vue.config.productionTip = false


const routers = [

]

const router = new VueRouter({
  routers: routers
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')


