import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: () => import('@/views/login/login'), hidden: true },
    {
      path: '',
      redirect: 'index',
      component: Layout,
      children: [ {
        path: 'index',
        name: 'index',
        component: () => import('@/views/appManage/index.vue'),
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      } ]
    }
  ]
})
