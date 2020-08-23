import Vue from 'vue'
import Router from 'vue-router'
import eventEvolutionaryGraph from './modules/eventEvolutionaryGraph'

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
        component: () => import('@/layout/components/Empty'),
        name: 'zhinengwenda',
        meta: { title: '智能问答', icon: 'message', affix: true },
        children: [
          {
            path: 'wendajiqiren',
            component: () => import('@/views/kbqa/zhinengwenda/index'),
            name: 'wendajiqiren',
            meta: { title: '问答机器人', icon: 'message', affix: true }
          },
          {
            path: 'yuliaoku',
            component: () => import('@/views/kbqa/zhinengwenda/yuliao'),
            name: 'yuliaoku',
            meta: { title: '问答语料库', icon: 'language', affix: true }
          }
        ]
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
          },
          {
            path: 'shigu',
            component: () => import('@/views/kbqa/zhishiku/shigu'),
            name: 'shigu',
            meta: { title: '事故管理', icon: 'el-icon-magic-stick', affix: true }
          }
        ]
      },
      {
        path: 'shujulaiyuan',
        component: () => import('@/layout/components/Empty'),
        name: 'shujulaiyuan',
        meta: { title: '数据来源', icon: 'international', affix: true },
        children: [
          {
            path: 'paqu',
            component: () => import('@/views/kbqa/shujulaiyuan/paqu'),
            name: 'paqu',
            meta: { title: '数据爬取', icon: 'tree-table', affix: true }
          },
          {
            path: 'sds',
            component: () => import('@/views/kbqa/shujulaiyuan/sds'),
            name: 'sds',
            meta: {
              title: 'SDS文档', icon: 'documentation', affix: true
            }
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
        meta: { title: '舆情信息处理', icon: 'el-icon-magic-stick', affix: true },
        children: [
          {
            path: 'huagongshigufenlei',
            component: () => import('@/views/yuqingfenxi/index'),
            name: 'huagongshigufenlei',
            meta: { title: '事故报道分类', icon: 'el-icon-s-flag', affix: true }
          },
          {
            path: 'wenzhangxiangsidupipei',
            component: () => import('@/layout/components/Empty'),
            name: 'wenzhangxiangsidupipei',
            alwaysShow: true,
            meta: { title: '文章相似度匹配', icon: 'el-icon-search', affix: true },
            children: [
              {
                path: 'xiangsidupipei',
                component: () => import('@/views/yuqingfenxi/xiangsidupipei'),
                name: 'xiangsidupipei',
                meta: { title: '相似文章合并', icon: 'el-icon-document-copy', affix: true }
              },
              {
                path: 'shigupipei',
                component: () => import('@/views/yuqingfenxi/shigupipei'),
                name: 'shigupipei',
                meta: { title: '事故匹配展示', icon: 'el-icon-collection', affix: true }
              }
            ]
          },
          {
            path: 'qingganfenxi',
            component: () => import('@/views/yuqingfenxi/qingganfenxi'),
            name: 'qingganfenxi',
            meta: { title: '情感分析', icon: 'el-icon-odometer', affix: true }
          },
          {
            path: 'zidongzhaiyao',
            component: () => import('@/views/yuqingfenxi/zidongzhaiyao'),
            name: 'zidongzhaiyao',
            meta: { title: '自动摘要', icon: 'el-icon-chat-line-round', affix: true }
          }
        ]
      },
      {
        path: 'yuqingxinxizhanshi',
        component: () => import('@/layout/components/Empty'),
        name: 'yuqingxinxizhanshi',
        meta: { title: '舆情信息展示', icon: 'el-icon-data-line', affix: true },
        children: [
          {
            path: 'redubang',
            component: () => import('@/views/yuqingfenxi/redubang'),
            name: 'redubang',
            meta: { title: '舆情热度排行榜', icon: 'el-icon-medal', affix: true }
          },
          {
            path: 'hongguanlist',
            component: () => import('@/views/yuqingfenxi/hongguanlist'),
            name: 'hongguanlist',
            meta: { title: '宏观数据统计展示', icon: 'el-icon-pie-chart', affix: true }
          },
          {
            path: 'weiguanlist',
            component: () => import('@/views/yuqingfenxi/weiguanlist'),
            name: 'weiguanlist',
            meta: { title: '微观数据统计展示', icon: 'el-icon-aim', affix: true }
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
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
