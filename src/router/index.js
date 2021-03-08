import Vue from 'vue'
import Router from 'vue-router'
import eventEvolutionaryGraph from './modules/eventEvolutionaryGraph'
import kbqa from './modules/kbqa'
import yuqingfenxi from './modules/yuqingfenxi'
import xitongguanli from './modules/xitongguanli'
import qita from './modules/qita'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  eventEvolutionaryGraph,
  kbqa,
  yuqingfenxi,
  xitongguanli,
  qita
]

export const asyncRoutes = []

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
