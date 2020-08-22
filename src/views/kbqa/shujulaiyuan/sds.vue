<template>
  <div style="padding: 20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.user" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          上传SDS
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="ID" label="编号" width="120"></el-table-column>
      <el-table-column prop="filename" label="文件名" width="200"></el-table-column>
      <el-table-column prop="size" label="文件大小" width="120"></el-table-column>
      <el-table-column prop="abstract" label="文档摘要"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small">下载</el-button>
          <el-button type="primary" size="small" @click="handleClick(scope.row)">解析</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Sds',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        ID: '10001',
        filename: '32067丙醛.doc',
        size: '37KB',
        abstract: '中文名:   丙醛; 正丙醛 主要成分:   含量≥95％。危险性类别:    第3.2类  中闪点易燃液体'
      }, {
        ID: '10002',
        filename: '32073   2-丁酮.doc',
        size: '37KB',
        abstract: '中文名:   2-丁酮; 甲基乙基酮 英文名:   2-butanone; methyl ethyl ketone'
      }, {
        ID: '10003',
        filename: '32061无水乙醇.doc',
        size: '28KB',
        abstract: '无水乙醇 无水乙醇相对分子质量  46.07健康危害  本品为中枢神经系统抑制刑，首先引起兴奋，随后抑制'
      }, {
        ID: '10004',
        filename: '32162丙烯腈.doc',
        size: '39KB',
        abstract: '32162丙烯腈(抑制了的)  32162丙烯腈(抑制了的)  主要成分:   含量: 一级≥99％;二级 98％。'
      }, {
        ID: '10005',
        filename: '32159乙腈.doc',
        size: '35KB',
        abstract: '第一部分  化学品及企业标识 中文名:   乙腈; 甲基氰  英文名:   acetonitrile; methyl cyanide'
      }, {
        ID: '10006',
        filename: '32164异氰酸甲酯.doc',
        size: '24KB',
        abstract: '异氰酸甲酯; 甲基异氰酸酯; Methyl isocyanate; Isocyanatomethane; MIC; CAS：624-83-9'
      }, {
        ID: '10007',
        filename: '32172正丁胺.doc',
        size: '37KB',
        abstract: '第一部分  化学品及企业标识  第一部分  化学品及企业标识 英文名:   butylamine; 1-aminobutane'
      }, {
        ID: '10008',
        filename: '51043次氯酸钙.doc',
        size: '25KB',
        abstract: '中文名  次氯酸钙；漂白粉;漂粉精 英文名  calciumhypochlorite；Bleachingpowder'
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
