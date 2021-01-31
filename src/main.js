import Vue from 'vue'
import Todo from "./pages/Todo.vue"
import VueRouter from 'vue-router'
import App from './App.vue'
Vue.config.productionTip = false
const routes = [
  { path: "/todo", component: Todo, name: "Todo" },
  { path: "*", redirect: { name: "Todo" } }
]
const router = new VueRouter({
  routes
})
export default new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
