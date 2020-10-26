/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const kbqa = {
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
}

export default kbqa
