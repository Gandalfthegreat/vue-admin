import Vue from "vue";
import Todo from "./pages/Todo.vue";
import Element from "element-ui";
import VueRouter from "vue-router";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import ProductList from "./pages/ProductList.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Element);
const routes = [
  { path: "/todo", component: Todo, name: "Todo" },
  { path: "/product/list", component: ProductList, name: "List" },
  { path: "*", redirect: { name: "Todo" } }
];
const router = new VueRouter({
  routes
});
export default new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount("#app");
