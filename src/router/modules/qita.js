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
    {
      path: 'anlishu',
      component: () => import('@/views/qita/anlishu'),
      name: 'anlishu',
      meta: { title: '案例树展示', icon: 'el-icon-loading', affix: true }
    },
    {
      path: 'shigubaogaoshu',
      component: () => import('@/views/qita/shigubaogaoshu'),
      name: 'anlishu',
      meta: { title: '事故报告树展示', icon: 'el-icon-loading', affix: true }
    }
    // { // 等待添加
    //   path: 'shigubaogaoshu',
    //   component: () => import('@/views/qita/shigubaogaoshu'),
    //   alwaysShow: true,
    //   name: 'anlishu',
    //   meta: { title: '案例树展示', icon: 'el-icon-loading', affix: true }
    // }
  ]
}

export default qita
