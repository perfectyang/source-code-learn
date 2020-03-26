import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/test.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
  }, {
    path: '/home',
    name: 'home',
    redirect: '/home/about',
    component: () => import(/* webpackChunkName: "test" */ '../views/home/index.vue'),
    children: [
      {
        path: '/home/about',
        name: 'home-about',
        component: () => import(/* webpackChunkName: "test" */ '../views/home/about.vue'),
      }
    ]
  }]
})
