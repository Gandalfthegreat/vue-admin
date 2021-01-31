import Vue from "vue";
import App from "./App.vue";
import Todo from "./pages/Todo.vue";
import VueRouter from "vue-router";
Vue.config.productionTip = false;
Vue.use(VueRouter);

const routers = [
  { path: "Todo", component: Todo, name: "Todo" },
  {
    path: "*",
    redirect: { name: "Todo" }
  }
];
const router = new VueRouter({
  routers
});
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
