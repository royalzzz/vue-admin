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
    { /* 第三个，概念事理展示*/
      path: 'gaiNianZhanShi',
      name: 'gaiNianZhanShi',
      component: () => import('@/views/eventEvolutionaryGraph/gaiNianZhanShi'),
      meta: {title: '标准图展示'}
    },
    { /* 第四个，案件事理展示*/
      path: 'anJianZhanShi',
      name: 'anJianZhanShi',
      component: () => import('@/views/eventEvolutionaryGraph/anJianZhanShi'),
      meta: {title: '案例树展示'}
    },

    { /* 第一个,报告管理*/
      path: 'baoGaoGuanLi',
      name: 'baoGaoGuanLi',
      component: () => import('@/views/eventEvolutionaryGraph/baoGaoGuanLi'),
      meta: {title: '事故报告管理'}
    },
    { /* 第二个，演化管理*/
      path: 'shijianyanhuabiaozhu',
      component: () => import('@/layout/components/Empty'),
      // component: () => import('@/views/eventEvolutionaryGraph/yanHuaGuanLi'), // Parent router-view
      name: 'yanHuaGuanLi',
      meta: {title: '事件演化标注管理'},
      // redirect: '/views/eventEvolutionaryGraph/yanHuaGuanLi',
      children: [
        {
          path: 'anLiShuBiaoZhu',
          component: () => import('@/views/eventEvolutionaryGraph/yanHuaGuanLi/anLiShuBiaoZhu'),
          name: '案例树标注',
          meta: {title: '案例树标注'}
        },
        {
          path: 'yanHuaBiaoZhu',
          component: () => import('@/views/eventEvolutionaryGraph/yanHuaGuanLi/yanHuaBiaoZhu'),
          name: '事件演化标注',
          meta: {title: '事件演化标注'}
        },
        {
          path: 'yanHuaZhanShi',
          component: () => import('@/views/eventEvolutionaryGraph/yanHuaGuanLi/yanHuaZhanShi'),
          name: 'yanHuaZhanShi',
          // redirect: '/views/eventEvolutionaryGraph/yanHuaGuanLi/yanHuaZhanShi/index',
          meta: {title: '事件演化展示'}
        }
      ]
    },
    { /* 第五个，标准图节点标注*/
      path: 'gainiantupubiaozhu',
      name: 'gainiantupubiaozhu',
      component: () => import('@/views/eventEvolutionaryGraph/xunlianshujuguanli/gainiantupubiaozhu'),
      meta: {title: '概念图标注'}
    },
    { /* 第五个，防护措施*/
      path: 'fangHuCuoShi',
      name: 'fangHuCuoShi',
      component: () => import('@/views/eventEvolutionaryGraph/fangHuCuoShi'),
      meta: {title: '防护措施'}
    },
    { /* 第六个，模型训练*/
      path: 'moXingXunLian',
      name: 'moXingXunLian',
      component: () => import('@/views/eventEvolutionaryGraph/moXingXunLian'),
      meta: {title: '模型训练'}
    },
    { /* 第七个，test*/
      path: 'test',
      name: 'test',
      component: () => import('@/layout/components/Empty'),
      meta: {title: '测试', icon: 'message', affix: true},
      children: [
        {
          path: 'test1',
          component: () => import('@/views/eventEvolutionaryGraph/test/test'),
          name: 'test1',
          meta: {title: 'test', icon: 'el-icon-edit', affix: true}
        },
        {
          path: 'test2',
          component: () => import('@/views/eventEvolutionaryGraph/test/test1'),
          name: 'test2',
          // redirect: '/views/eventEvolutionaryGraph/yanHuaGuanLi/yanHuaZhanShi/index',
          meta: {title: 'test1', icon: 'el-icon-edit', affix: true}
        }
      ]
    }
  ]
}

export default eventEvolutionaryGraph
