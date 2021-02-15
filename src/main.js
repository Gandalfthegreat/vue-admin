import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Todo from './pages/Todo.vue';
import Comp from './pages/Comp.vue';
import ProductList from './pages/ProductList.vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

// 02 声明routes
const routes = [
  { path: '/todo', component: Todo },
  { path: '/comp', component: Comp },
  { path: '/product/list', component: ProductList }
]
// 03 new router Instace
const router = new VueRouter({
  routes,
});

// 04 全局注册
Vue.use(VueRouter);
Vue.use(Element);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')


