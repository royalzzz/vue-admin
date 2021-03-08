/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const xitongguanli = {
  path: '/xitongguanli',
  component: Layout,
  redirect: '/xitongguanli',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'el-icon-setting'
  },
  children: [
    {
      path: 'yonghuguanli',
      component: () => import('@/layout/components/Empty'),
      name: 'yonghuguanli',
      alwaysShow: true,
      meta: { title: '用户管理', icon: 'el-icon-user', affix: true }
    },
    {
      path: 'renwuguanli',
      component: () => import('@/views/xitongguanli/index'),
      name: 'renwuguanli',
      meta: { title: '任务管理', icon: 'el-icon-loading', affix: true }
    }
  ]
}

export default xitongguanli
