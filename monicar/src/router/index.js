import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const monicar = [
  {
    path: '/home',
    component: resolve => require(['@/pages/monicar/home/Home.vue'], resolve)
  },
  {
    path: '/realTime',
    component: resolve => require(['@/pages/monicar/RealTime.vue'], resolve)
  },
  {
    path: '/trace',
    component: resolve => require(['@/pages/monicar/Trace.vue'], resolve)
  },
]

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/edit',
      component: resolve => require(['@/pages/edit/Edit.vue'], resolve)
    },
    ...monicar
  ]
})
