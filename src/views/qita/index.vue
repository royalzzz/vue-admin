<template>

  <div style="padding: 20px">
    <el-input
      v-model="textarea"
      type="textarea"
      :rows="10"
      placeholder="请输入内容"
    >
    </el-input>
    <el-button
      class="filter-item"
      style="margin-left:89%"
      type="primary"
      icon="el-icon-edit"
      @click="findByLabelLike"
    >
      添加事故报告
    </el-button>
    <el-button v-for="(item, i) in keyNodes" :key="i">{{ item.label }}</el-button>
    <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          事故报告下载
        </el-button> -->
    <el-row :gutter="12">
      <el-col :span="5">
        <el-card shadow="hover">
          <el-table :data="tableData" width="100" margin-top="10px" @cell-click="getTree">
            <el-table-column prop="data" label="分词" align="center">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card shadow="always">
          <!-- <img src="@/assets/eventEvolutionaryGraph/fanghucuoshi.png" width="100%"> -->
          <div id="mynetwork" style="height:400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vis from 'vis'
import {getBiaozhuTree} from '@/api/tree'

export default {
  name: '',
  data() {
    return {
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
    }
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
          });
          console.log(result.data.db_edges);

          var nodes = new vis.DataSet(result.data.db_nodes)
          var edges = new vis.DataSet(result.data.db_edges)
          var container = document.getElementById('mynetwork')
          var data = {
            nodes: nodes,
            edges: edges
          }
          console.log(data);
          var options = {}
          var network = new vis.Network(container, data, options)
          console.log(network);
        })
    },
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
    }
  }
}
</script>

