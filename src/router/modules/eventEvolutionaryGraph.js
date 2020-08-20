/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const eventEvolutionaryGraph = {
  path: '/eventEvolutionaryGraph',
  component: Layout,
  redirect: '/eventEvolutionaryGraph',
  name: 'eventEvolutionaryGraph',
  meta: {
    title: '事理图谱',
    icon: 'tree'
  },
  children: [
    /* {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menu 1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/nested/menu1/menu1-1'),
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/views/nested/menu1/menu1-2'),
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: 'Menu 1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2' }
            }
          ]
        },
        {
          path: 'menu1-3',
          component: () => import('@/views/nested/menu1/menu1-3'),
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3' }
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: 'Menu 2' }
    },*/
    { /* 第一个*/
      path: 'baoGaoGuanLi',
      name: 'baoGaoGuanLi',
      component: () => import('@/views/eventEvolutionaryGraph/baoGaoGuanLi'),
      meta: { title: '事故报告管理' }
    },
    { /* 第二个*/
      path: '事件演化标注管理',
      component: () => import('@/layout/components/Empty'),
      // component: () => import('@/views/eventEvolutionaryGraph/yanHuaGuanLi'), // Parent router-view
      name: 'yanHuaGuanLi',
      meta: { title: '事件演化标注管理' },
      // redirect: '/views/eventEvolutionaryGraph/yanHuaGuanLi',
      children: [
        {
          path: 'yanHuaBiaoZhu',
          component: () => import('@/views/eventEvolutionaryGraph/yanHuaGuanLi/yanHuaBiaoZhu'),
          name: '事件演化标注',
          meta: { title: '事件演化标注' }
        },
        {
          path: 'yanHuaZhanShi',
          component: () => import('@/views/eventEvolutionaryGraph/yanHuaGuanLi/yanHuaZhanShi'),
          name: 'yanHuaZhanShi',
          // redirect: '/views/eventEvolutionaryGraph/yanHuaGuanLi/yanHuaZhanShi/index',
          meta: { title: '事件演化展示' }
        }
      ]
    },
    { /* 第三个*/
      path: 'tuPuZhanShi',
      name: '事故的事理图谱展示',
      component: () => import('@/views/eventEvolutionaryGraph/tuPuZhanShi'),
      meta: { title: '事故的事理图谱展示' }
    },
    { /* 第四个*/
      path: 'shiJianTuiLi',
      name: 'shiJianTuiLi',
      component: () => import('@/views/eventEvolutionaryGraph/shiJianTuiLi'),
      meta: { title: '事件的预测推理' }
    }
  ]
}

export default eventEvolutionaryGraph
