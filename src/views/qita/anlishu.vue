<template>
  <div style="padding: 20px">
    <el-input
      v-model="textarea"
      type="textarea"
      :rows="1"
      placeholder="请输入内容"
    >
    </el-input>
    <el-button
      class="filter-item"
      style="margin-left: 89%"
      type="primary"
      icon="el-icon-edit"
      @click="findByLabelLike"
    >
      添加事故报告
    </el-button>
    <el-button v-for="(item, i) in keyNodes" :key="i">{{
      item.label
    }}</el-button>
    <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          事故报告下载
        </el-button> -->
    <el-row :gutter="12">
      <el-col :span="17">
        <el-card shadow="always">
          <!-- <img src="@/assets/eventEvolutionaryGraph/fanghucuoshi.png" width="100%"> -->
          <div id="mynetwork" style="height: 500px">
            <TreeMenu :model="testdata" @re="childByValue1" />
          </div>
        </el-card>
        <el-button v-for="(item, i) in keyNodes" :key="i">{{
          item.label
        }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vis from 'vis'
import TreeMenu from './component/TreeMenu'

export default {
  name: '',
  components: { TreeMenu },
  data() {
    return {
      textarea: '',
      keyNodes: [],
      redirect: undefined,
      otherQuery: {},
      testdata: [
        {
          andor: 'and',
          children: [
            {
              andor: 'or',
              children: [
                {
                  andor: 'or',
                  children: [
                    {
                      andor: '',
                      children: [],
                      gradeId: 'IA1',
                      name: 'A1$物料输送速度过快引起挥发加剧'
                    },
                    {
                      andor: '',
                      children: [],
                      gradeId: 'IA2',
                      name: 'A2$输送油料温度过高引起挥发加剧'
                    }
                  ],
                  gradeId: 'IA3',
                  name: 'A3$容器内可燃物料轻质组分急剧挥发'
                },
                {
                  andor: 'or',
                  children: [
                    {
                      andor: 'undefined',
                      children: [
                        {
                          andor: '',
                          children: [],
                          gradeId: 'IA4',
                          name: 'A4$检修时阀门未加盲板'
                        }
                      ],
                      gradeId: '',
                      name: '爆炸'
                    },
                    {
                      andor: '',
                      children: [],
                      gradeId: '',
                      name: '误操作阀门'
                    }
                  ],
                  gradeId: 'IA5',
                  name: 'A5$容器外部可燃物料进入容器内并挥发'
                }
              ],
              gradeId: 'IA6',
              name: 'A6$容器内可燃物料挥发性组分积聚'
            },
            {
              andor: 'or',
              children: [
                {
                  andor: '',
                  children: [],
                  gradeId: '',
                  name: '容器内部存在空气'
                },
                {
                  andor: '',
                  children: [],
                  gradeId: '',
                  name: '外界空气进入容器内部'
                }
              ],
              gradeId: '',
              name: '容器内存在空气'
            }
          ],
          gradeId: 'IA7',
          name: 'A7$容器内形成爆炸性混合气体空间'
        }
      ]
    }
  },
  watch: {
    $route:
    {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    },
    keyNodes: {
      handler: function(keyNodes) {
        console.log('fhbdihsbf')
        console.log(keyNodes)
        console.log('fhbdihsbf')
      },
      immediate: true
    },
    textarea: {
      handler: function (textarea) {
        console.log(textarea)
      },
      immediate: true
    }
  },
  methods: {
    handleCreate() {
      console.log('handleCreate!')
    },
    getTree() {
      this.$store.dispatch('tree/getBiaozhuTree').then((result) => {
        console.log(result)
        var nodes = new vis.DataSet(result.db_nodes)
        var edges = new vis.DataSet(result.db_edges)
        var container = document.getElementById('mynetwork')
        var data = {
          nodes: nodes,
          edges: edges
        }
        var options = {}
        // var network = new vis.Network(container, data, options)
        vis.Network(container, data, options)
      })
    },
    findByLabelLike() {
      this.$store
        .dispatch('tree/findByLabelLike', this.textarea)
        .then((result) => {
          var db_nodes = result
          this.keyNodes = db_nodes
        })
    },
    childByValue1(data) {
      this.keyNodes = data
      console.log('parent', this.keyNodes)
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
