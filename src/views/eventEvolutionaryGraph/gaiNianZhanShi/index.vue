<template>
  <div style="padding: 20px">
    <div>
    </div>
    <el-card shadow="always" style="height: 770px">
      <div style="width: 20%">
        <el-progress :percentage="percentage" :color="customColorMethod" type="line" :show-text="showText" style="width: 28%"></el-progress>
        <el-button-group>
          <el-button icon="el-icon-minus" size="mini" @click="decrease"></el-button>
          <el-button icon="el-icon-plus" size="mini" @click="increase"></el-button>
        </el-button-group>
      </div>
      <!-- <img src="@/assets/eventEvolutionaryGraph/fanghucuoshi.png" width="100%"> -->
      <div id="mynetwork" style="height:670px;"></div>
    </el-card>
  </div>
</template>

<script>
import vis from 'vis'
import { getBiaozhuTree } from '@/api/tree'

export default {
  name: '',
  data() {
    return {
      showText: false,
      nodes: [],
      edges: [],
      showNodes: [],
      showEdges: [],
      level1node: [],
      level2node: [],
      level3node: [],
      level4node: [],
      percentage: 0,
      textarea: '',
      keyNodes: [],
      tableData: [
        {
          data: '节点',
          url: '1.甲苯在流入重氮化前储罐的同时也流入了废甲苯储罐'
        },
        {
          data: '对应节点',
          url: '容器内液态物料泄漏'
        },
        {
          data: '对应物质',
          url: '甲苯'
        },
        {
          data: '应急场景',
          url: '泄漏'
        },
        {
          data: '处置措施',
          url: ''
        }
      ],
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    },
    percentage(val, oldVal) {
      if (val === 25) {
        console.log('选择第一批次数据')
        this.showEdges = []
        this.showNodes = []
        this.edges.forEach((item, index, arr) => {
          // do something});
          if (item['level'] === 1) {
            this.showEdges.push(item)
          }
        })
        this.nodes.forEach((item, index, arr) => {
          if (this.level1node.indexOf(item['id']) > -1) {
            this.showNodes.push(item)
            // console.log(item)
          }
        })
        this.showTree()
        // 选择第一批次数据
      } else if (val === 50) {
        console.log('选择两批数据')
        this.showEdges = []
        this.showNodes = []
        this.edges.forEach((item, index, arr) => {
          // do something});
          if ((item['level'] === 1) || (item['level'] === 2)) {
            this.showEdges.push(item)
          }
        })
        this.nodes.forEach((item, index, arr) => {
          if ((this.level1node.indexOf(item['id']) > -1) || (this.level2node.indexOf(item['id']) > -1)) {
            this.showNodes.push(item)
          }
        })
        this.showTree()
        // 选择两批数据
      } else if (val === 75) {
        console.log('选择三批数据')
        this.showEdges = []
        this.showNodes = []
        this.edges.forEach((item, index, arr) => {
          // do something});
          if ((item['level'] === 1) || (item['level'] === 2) || (item['level'] === 3)) {
            this.showEdges.push(item)
          }
        })
        this.nodes.forEach((item, index, arr) => {
          if ((this.level1node.indexOf(item['id']) > -1) || (this.level2node.indexOf(item['id']) > -1) || (this.level3node.indexOf(item['id']) > -1)) {
            this.showNodes.push(item)
          }
        })
        this.showTree()
        // 选择三批数据
      } else if (val === 100) {
        console.log('选择全部数据')
        this.showEdges = []
        this.showNodes = []
        this.edges.forEach((item, index, arr) => {
          // do something});
          this.showEdges.push(item)
        })
        this.nodes.forEach((item, index, arr) => {
          this.showNodes.push(item)
        })
        // console.log(this.showNodes)
        // console.log(this.showEdges)
        this.showTree()
        // 选择全部数据
      } else {
        console.log('不选择数据')
        // 不选择数据
      }
      // console.log(this.showNodes)
      // console.log(this.showEdges)
      // console.log(this.level1node)
    }
  },
  mounted() {
    this.getTree()
  },
  methods: {
    handleCreate() {
      console.log('handleCreate!')
    },
    getTree() {
      getBiaozhuTree()
        .then(result => {
          result.data.db_edges.forEach(item => {
            item.from = item.fromNode
            delete item.fromNode
            item.to = item.toNode
            delete item.toNode
          })
          this.nodes = result.data.db_nodes
          this.edges = result.data.db_edges
          // console.log(result.data.db_edges);
          // var nodes = new vis.DataSet(this.nodes)
          // var edges = new vis.DataSet(this.edges)
          // var container = document.getElementById('mynetwork')
          // var data = {
          //   nodes: nodes,
          //   edges: edges
          // }
          // // console.log(data);
          // var options = {
          //   edges:{
          //     arrows:'to',
          //     color:'red',
          //   }
          // }
          // var network = new vis.Network(container, data, options)
          this.edges.forEach((item, index, arr) => {
            if (item['level'] === 1) {
              this.level1node.push(item['from'])
              this.level1node.push(item['to'])
            } else if (item['level'] === 2) {
              this.level2node.push(item['from'])
              this.level2node.push(item['to'])
            } else if (item['level'] === 3) {
              this.level3node.push(item['from'])
              this.level3node.push(item['to'])
            } else {
              this.level4node.push(item['from'])
              this.level4node.push(item['to'])
            }
          })
          this.level1node = this.newArr(this.level1node)
          this.level2node = this.newArr(this.level2node)
          this.level3node = this.newArr(this.level3node)
          this.level4node = this.newArr(this.level4node)
          this.showEdges = this.edges
          this.showNodes = this.nodes
          this.showTree()
          // console.log(this.edges);
          // console.log(this.nodes);
          // console.log(this.level1node);
          // console.log(this.level2node);
          // console.log(this.level3node);
          // console.log(this.level4node);
        })
    },
    // 数组去重
    newArr(arr) { return Array.from(new Set(arr)) },
    findByLabelLike() {
      this.$store.dispatch('tree/findByLabelLike', this.textarea)
        .then(result => {
          var db_nodes = result
          this.keyNodes = db_nodes
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    customColorMethod(percentage) {
      if (percentage < 26) {
        return '#909399'
      } else if (percentage < 51) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    increase() {
      this.percentage += 25
      if (this.percentage > 100) {
        this.percentage = 100
      }
    },
    decrease() {
      this.percentage -= 25
      if (this.percentage < 0) {
        this.percentage = 0
      }
    },
    showTree() {
      var nodes = new vis.DataSet(this.showNodes)
      var edges = new vis.DataSet(this.showEdges)
      var container = document.getElementById('mynetwork')
      var data = {
        nodes: nodes,
        edges: edges
      }
      // console.log(data);
      var options = {
        groups: {
          failure: {
            color: {
              background: 'red'
            }
          },
          state: {
            color: {
              background: 'lime'
            }
          },
          startstate: {
            font: {
              size: 33,
              color: 'white'
            },
            color: {
              background: 'blueviolet'
            }
          },
          finalstate: {
            font: {
              size: 33,
              color: 'white'
            },
            color: {
              background: 'blue'
            }
          }
        },
        edges: {
          arrows: {
            to: {
              enabled: true
            }
          },
          smooth: {
            enabled: false,
            type: 'continuous'
          }
        },
        physics: {
          adaptiveTimestep: true,
          barnesHut: {
            gravitationalConstant: -8000,
            springConstant: 0.04,
            springLength: 95
          },
          stabilization: {
            iterations: 987
          }
        },
        layout: {
          randomSeed: 191006,
          improvedLayout: true
        }
        // edges:{
        //   arrows:'to',
        //   color:'red',
        // },
        // stabilization: {
        //   iterations: 500
        // },
        // physics: {
        //   enabled: false
        // }
      }
      var network = new vis.Network(container, data, options)
    }
  }
}
</script>

