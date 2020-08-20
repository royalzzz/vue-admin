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
    path: '/shilitupu',
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
    path: '/kbqa',
    component: Layout,
    redirect: '/kbqa',
    alwaysShow: true,
    meta: {
      title: '知识库问答',
      icon: 'message'
    },
    children: [
      {
        path: 'zhinengwenda',
        component: () => import('@/views/kbqa/zhinengwenda'),
        name: 'zhinengwenda',
        meta: { title: '智能问答', icon: 'message', affix: true }
      },
      {
        path: 'zhishiku',
        component: () => import('@/layout/components/Empty'),
        name: 'zhishiku',
        meta: { title: '知识库管理', icon: 'excel', affix: true },
        children: [
          {
            path: 'zhishiluru',
            component: () => import('@/views/kbqa/zhishiku/add'),
            name: 'zhishiluru',
            meta: { title: '知识录入', icon: 'edit', affix: true }
          },
          {
            path: 'zhishichaxun',
            component: () => import('@/views/kbqa/zhishiku/search'),
            name: 'zhishichaxun',
            meta: { title: '知识查询', icon: 'search', affix: true }
          }
        ]
      },
      {
        path: 'shujupaqu',
        component: () => import('@/layout/components/Empty'),
        name: 'shujupaqu',
        meta: { title: '数据爬取', icon: 'international', affix: true },
        children: [
          {
            path: 'paqucanshu',
            component: () => import('@/views/kbqa/shujupaqu/canshu'),
            name: 'paqucanshu',
            meta: { title: '爬取参数设置', icon: 'component', affix: true }
          },
          {
            path: 'paqujieguo',
            component: () => import('@/views/kbqa/shujupaqu/result'),
            name: 'paqujieguo',
            meta: { title: '爬取结果浏览', icon: 'search', affix: true }
          }
        ]
      },
      {
        path: 'moxingxunlian',
        component: () => import('@/views/kbqa/training'),
        name: 'moxingxunlian',
        meta: { title: '模型训练', icon: 'language', affix: true }
      }
    ]
  },
  {
    path: '/yuqingfenxi',
    component: Layout,
    redirect: '/yuqingfenxi',
    alwaysShow: true,
    meta: {
      title: '舆情分析',
      icon: 'chart'
    },
    children: [
      {
        path: 'yuqingxinxichuli',
        component: () => import('@/layout/components/Empty'),
        name: 'yuqingxinxichuli',
        alwaysShow: true,
        meta: { title: '舆情信息处理', icon: 'chart', affix: true },
        children: [
          {
            path: 'huagongshigufenlei',
            component: () => import('@/views/yuqingfenxi/index'),
            name: 'huagongshigufenlei',
            meta: { title: '事故报道分类', icon: 'chart', affix: true }
          },
          {
            path: 'wenzhangxiangsidupipei',
            component: () => import('@/layout/components/Empty'),
            name: 'wenzhangxiangsidupipei',
            alwaysShow: true,
            meta: { title: '文章相似度匹配', icon: 'chart', affix: true },
            children: [
              {
                path: 'xiangsidupipei',
                component: () => import('@/views/yuqingfenxi/xiangsidupipei'),
                name: 'xiangsidupipei',
                meta: { title: '相似文章合并', icon: 'chart', affix: true }
              },
              {
                path: 'shigupipei',
                component: () => import('@/views/yuqingfenxi/shigupipei'),
                name: 'shigupipei',
                meta: { title: '事故匹配展示', icon: 'chart', affix: true }
              }
            ]
          },
          {
            path: 'qingganfenxi',
            component: () => import('@/views/yuqingfenxi/index'),
            name: 'qingganfenxi',
            meta: { title: '情感分析', icon: 'chart', affix: true }
          },
          {
            path: 'zidongzhaiyao',
            component: () => import('@/views/dashboard/index'),
            name: 'zidongzhaiyao',
            meta: { title: '自动摘要', icon: 'chart', affix: true }
          }
        ]
      },
      {
        path: 'yuqingxinxizhanshi',
        component: () => import('@/views/dashboard/index'),
        name: 'yuqingxinxizhanshi',
        meta: { title: '舆情信息展示', icon: 'chart', affix: true },
        children: [
          {
            path: 'yuqingredupaihangbang',
            component: () => import('@/views/dashboard/index'),
            name: 'yuqingredupaihangbang',
            meta: { title: '舆情热度排行榜', icon: 'chart', affix: true }
          },
          {
            path: 'hongguanshujutongjizhanshi',
            component: () => import('@/views/dashboard/index'),
            name: 'hongguanshujutongjizhanshi',
            meta: { title: '宏观数据统计展示', icon: 'chart', affix: true }
          },
          {
            path: 'weiguanshujutongjizhanshi',
            component: () => import('@/views/dashboard/index'),
            name: 'weiguanshujutongjizhanshi',
            meta: { title: '微观数据统计展示', icon: 'chart', affix: true }
          }
        ]
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
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
