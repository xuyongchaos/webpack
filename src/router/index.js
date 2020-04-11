import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/a',
      component: () => import('../views/a/index.vue')
    },
    {
      path: '/b',
      component: () => import('../views/b/index.vue')
    },
    {
      path: '/mark',
      component: () => import('../views/marked/index.js')
    }
  ]
})
