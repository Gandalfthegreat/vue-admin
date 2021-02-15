import Vue from "vue";
import Todo from "./pages/Todo.vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { getGlobalData } from "utils/globalData";

Vue.config.productionTip = false;
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: App,
    name: "App",
    children: [
      {
        path: "login",
        component: Login,
        name: "Login"
      },
      {
        path: "home",
        component: Home,
        name: "Home",
        children: [
          { path: "service", component: Service, name: "Service" },
          {
            path: "product",
            component: Product,
            name: "Product",
            children: [
              { path: "list", component: ProductList, name: "ProductList" },
              { path: "add/0", component: ProductEdit, name: "ProductAdd" },
              { path: "edit/:id", component: ProductEdit, name: "ProductEdit" }
            ]
          }
        ]
      }
    ]
  },
  { path: "/todo", component: Todo, name: "Todo" }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    if (!getGlobalData("username")) {
      next({ name: "Login" });
    }
  }
  next();
});
export default new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount("#app");
