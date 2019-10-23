import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  }]
})
