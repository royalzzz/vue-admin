/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const qita = {
  path: '/qita',
  component: Layout,
  redirect: '/qita',
  alwaysShow: true,
  meta: {
    title: '其他选项',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'fencifenceng',
      component: () => import('@/views/qita/index'),
      name: 'fencifenceng',
      meta: { title: '分词和分层', icon: 'el-icon-user', affix: true }
    },
    { // 等待添加
      path: 'beitai',
      component: () => import('@/views/qita/index'),
      alwaysShow: true,
      name: 'beitai',
      meta: { title: '分词分层', icon: 'el-icon-loading', affix: true }
    }
  ]
}

export default qita
