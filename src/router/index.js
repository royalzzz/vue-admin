import Vue from 'vue'
import Router from 'vue-router'

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
  {
    path: '/',
    component: Layout,
    redirect: '/shilitupu',
    children: [
      {
        path: 'shilitupu',
        component: () => import('@/views/dashboard/index'),
        name: 'shilitupu',
        meta: { title: '事例图谱', icon: 'tree', affix: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/kbqa',
    alwaysShow: true,
    meta: {
      title: '智能问答',
      icon: 'message'
    },
    children: [
      {
        path: 'zhinengwenda',
        component: () => import('@/views/dashboard/index'),
        name: 'zhinengwenda',
        meta: { title: '智能问答', icon: 'message', affix: true }
      },
      {
        path: 'zhishiku',
        component: Layout,
        name: 'zhishiku',
        meta: { title: '知识库管理', icon: 'excel', affix: true },
        children: [
          {
            path: 'zhishiluru',
            component: () => import('@/views/dashboard/index'),
            name: 'zhishiluru',
            meta: { title: '知识录入', icon: 'edit', affix: true }
          },
          {
            path: 'zhishichaxun',
            component: () => import('@/views/dashboard/index'),
            name: 'zhishichaxun',
            meta: { title: '知识查询', icon: 'search', affix: true }
          }
        ]
      },
      {
        path: 'shujupaqu',
        component: Layout,
        name: 'shujupaqu',
        meta: { title: '数据爬取', icon: 'international', affix: true },
        children: [
          {
            path: 'paqucanshu',
            component: () => import('@/views/dashboard/index'),
            name: 'paqucanshu',
            meta: { title: '爬取参数设置', icon: 'component', affix: true }
          },
          {
            path: 'paqujieguo',
            component: () => import('@/views/dashboard/index'),
            name: 'paqujieguo',
            meta: { title: '爬取结果浏览', icon: 'search', affix: true }
          }
        ]
      },
      {
        path: 'moxingxunlian',
        component: () => import('@/views/dashboard/index'),
        name: 'moxingxunlian',
        meta: { title: '模型训练', icon: 'language', affix: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/yuqingfenxi',
    children: [
      {
        path: 'yuqingfenxi',
        component: () => import('@/views/dashboard/index'),
        name: 'yuqingfenxi',
        meta: { title: '舆情分析', icon: 'chart', affix: true }
      }
    ]
  }
]

export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
