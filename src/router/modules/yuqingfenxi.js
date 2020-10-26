/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const yuqingfenxi = {
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
      path: 'xinxicaiji',
      component: () => import('@/views/yuqingfenxi/xinxicaiji'),
      name: 'xinxicaiji',
      meta: { title: '信息采集', icon: 'el-icon-coin', affix: true }
    },
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

export default yuqingfenxi
