import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/home/index.vue'),
  },
  {
    path: '/basic',
    name: 'basic',
    component: () => import('./pages/basic/index.vue'),
  },
  {
    path: '/composition',
    name: 'composition',
    component: () => import('./pages/composition/index.vue'),
  },
  {
    path: '/props',
    name: 'props',
    component: () => import('./pages/props/index.vue'),
  },
  {
    path: '/reject',
    name: 'reject',
    component: () => import('./pages/reject/index.vue'),
  },
  {
    path: '/plain-object',
    name: 'plain-object',
    component: () => import('./pages/plain-object/index.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router
