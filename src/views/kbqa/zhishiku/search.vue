<template>
  <div style="padding:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="实体概念">
        <el-select v-model="formInline.region" placeholder="实体概念">
          <el-option label="化学品" value="shanghai" />
          <el-option label="危险性" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="实体">
        <el-input v-model="formInline.user" placeholder="实体" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-card style="height:500px;">
      <el-row :gutter="10">
        <el-col :span="16" style="background:rgb(249,251,253)">
          <img src="@/assets/kbqa/graph.png" style="width:700px;" />
        </el-col>
        <el-col :span="8">
          <span style="font-size: 14pt;">节点详情</span>
          <div style="margin-top:20px;">
            <el-tag>危化品</el-tag>
            <el-tag style="margin-left: 5px;" type="success">危险性分类</el-tag>
            <el-tag style="margin-left: 5px;" type="info">属性</el-tag>
            <el-tag style="margin-left: 5px;" type="warning">防护措施</el-tag>
            <el-tag style="margin-left: 5px;" type="danger">健康危害</el-tag>
          </div>
          <el-table :data="tableData" style="width: 100%;margin-top:10px;">
            <el-table-column prop="date" label="属性名" />
            <el-table-column prop="name" label="属性值" />
          </el-table>
          <el-divider>
            <el-link type="primary">更多</el-link>
          </el-divider>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Shishikusearch',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        date: 'CAS编号',
        name: '7789-12-0'
      }, {
        date: '化学分子式',
        name: 'Cr2H4Na2O9'
      }, {
        date: '水溶性',
        name: '730 g/L (20°C)'
      }, {
        date: '熔点',
        name: '357°C'
      }, {
        date: '分子量',
        name: '275.00833'
      }, {
        date: '英文名',
        name: 'Sodium dichromate dihydrate'
      }, {
        date: '中文名',
        name: '重铬酸钠'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
