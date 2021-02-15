import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Todo from './pages/Todo.vue';
import Comp from './pages/Comp.vue';

Vue.config.productionTip = false


const routes = [
  { path: '/todo', component: Todo },
  { path: '/comp', component: Comp },
  // { path: '/queryContainer', component: QueryContainer }, 用H1标签，展示query的值
]

const router = new VueRouter({
  routes,
  // routes: routes
});


Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')


