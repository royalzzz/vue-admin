<template>
  <div style="padding: 20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input v-model="formInline.user" placeholder="关键字搜索" style="width: 800px;"></el-input>
      <el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          搜索事故报告
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          事故报告导入
        </el-button>
        <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          事故报告下载
        </el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="ID" label="编号" width="100"></el-table-column>
      <el-table-column prop="date" label="日期" width="120"></el-table-column>
      <el-table-column prop="content" label="事故报告内容" width="800"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        ID: '1',
        date: '1997-02-03',
        content: ' 一、违反纪律踩断管，氨气泄漏中毒亡　　1.事故经过　　某化肥厂合成车间4名女工在清扫完卫生后，到冷冻器，下罐将四人救起，送到厂医救。经医生'
      }, {
        ID: '2',
        date: '1994-04-08',
        content: '一、事故概况及经过   1991年4月8日，广州市某县的一家个体中新精细化工厂搪玻璃反应锅发生爆炸。该厂首次进行对苯二甲酸二甲脂的试生产，所用设'
      }, {
        ID: '3',
        date: '1994-04-08',
        content: '【案情】某市化工厂新录用了一批工人，但厂里目前暂时没有住宿用房。有人提出，可以先到外面去租用住房。厂长认为，到外面租房成本太高。厂里一'
      }, {
        ID: '4',
        date: '1994-04-08',
        content: '伤事故不在少数。   　　在企业生产检修中，有限空间作业比较频繁，是一项危险性很大的作业，通常作业空间通风不畅，照明不良；'
      }, {
        ID: '5',
        date: '1994-04-08',
        content: '　1）事故概况  　　1988年8月28日1:00左右，停放在得克萨斯州迪尔帕克的EMP AK公司停车线上的一节UTLX-96283号环氧乙烷槽车爆炸。'
      }, {
        ID: '6',
        date: '1994-04-08',
        content: '1）事故概况  　　美军海漂联合企业1#EO蒸馏塔于1991年3月12日发生爆炸，爆炸碎片击坏甲烷和其他易燃'
      }, {
        ID: '7',
        date: '1994-04-08',
        content: '烷1#计量槽属非法自制压力容器，制造质量低劣，焊缝、钢板存在着严重缺陷；  　　②合成车间属甲类易燃'
      }, {
        ID: '8',
        date: '1994-04-08',
        content: '一、事故概况及经过   1991年4月8日，广州市某县的一家个体中新精细化工厂搪玻璃反应锅发生爆炸。该厂首次进行对苯二甲酸二甲脂的试生产，所用设'
      }, {
        ID: '9',
        date: '1994-04-08',
        content: '发生时间：1988年7月9日  　　发生单位：大连某拆船厂   　　原因类别：管理(气瓶腐蚀、超期使用)  　　事故发生经过：  　　大连某拆船厂将一批气瓶送某制氧厂'
      }, {
        ID: '10',
        date: '1994-04-08',
        content: '一、事故概况及经过   1991年4月8日，广州市某县的一家个体中新精细化工厂搪玻璃反应锅发生爆炸。该厂首次进行对苯二甲酸二甲脂的试生产，所用设'
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
