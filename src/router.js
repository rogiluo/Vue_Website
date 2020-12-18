import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    redirect: 'Function/Sample',
    name: '首頁',
    component: () => import('@/views/Container'),
    children: [{
      path: 'Function',
      name: '功能區',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [{
        path: 'Sample',
        name: '範例功能',
        component: () => import('@/views/Sample')
      }]
    },
    ]
  }]
})