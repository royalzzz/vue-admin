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
      @click="handleCreate"
    >
      添加事故报告
    </el-button>
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
          <img src="@/assets/eventEvolutionaryGraph/fanghucuoshi.png" width="100%">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      textarea: '',
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
      ]
    }
  },
  methods: {
    handleCreate() {
      console.log('handleCreate!')
    },
    getTree() {
      console.log('getTree!')
    }
  }
}
</script>

