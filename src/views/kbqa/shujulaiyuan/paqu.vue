<template>
  <div style="padding: 20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.user" placeholder="关键字搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column fixed prop="ID" label="编号" width="100"></el-table-column>
      <el-table-column prop="cas" label="CAS编号" width="120"></el-table-column>
      <el-table-column prop="chemical" label="化学品" width="120"></el-table-column>
      <el-table-column prop="content" label="爬取内容"></el-table-column>
      <el-table-column prop="from" label="爬取来源"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Paqu',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        ID: '1000',
        cas: '1310-73-2',
        chemical: '氢氧化钠',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: 'CAS	名称	分子式	分子量	熔点℃	沸点℃	危险性	··1310-73-2	氢氧化钠	NaOH	40.00	318	1388	腐蚀性'
      }, {
        ID: '1001',
        cas: '50-0-0',
        chemical: '甲醛',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: '50-0-0	甲醛	CH 2O	30.03	-92	-20	毒性'
      }, {
        ID: '1002',
        cas: '141-78-6',
        chemical: '乙酸乙酯',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: '141-78-6	乙酸乙酯	C 4H 8O 2CHO	88.1	-84	77	易燃性'
      }, {
        ID: '1003',
        cas: '1310-73-2',
        chemical: '氢氧化钠',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: 'CAS	名称	分子式	分子量	熔点℃	沸点℃	危险性	··1310-73-2	氢氧化钠	NaOH	40.00	318	1388	腐蚀性'
      }, {
        ID: '1004',
        cas: '108-95-2',
        chemical: '苯酚',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: '108-95-2	苯酚	C 6H 6O	94.11	43	182	腐蚀性'
      }, {
        ID: '1005',
        cas: '7789-12-0',
        chemical: '重铬酸钠',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: '略有吸湿性。100℃时失去结晶水，约400℃时开始分解。易溶于水，不溶于乙醇，水溶液呈酸性。1%水溶液的pH为4，10%水溶液的pH为3.5。相对密度2.348。熔点356.7℃'
      }, {
        ID: '1006',
        cas: '74-82-8',
        chemical: '甲烷',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: '甲烷（系统名为“碳烷”，但只在介绍系统命名法时会出现，一般用习惯名“甲烷”）在自然界的分布很广，甲烷是最简单的有机物，是天然气，沼气，坑气等的主要成分，俗称瓦斯。'
      }, {
        ID: '1007',
        cas: '6484-52-2',
        chemical: '硝酸铵',
        from: 'http://www.hgmsds.com/hg-ehs-index',
        content: '硝酸铵（NH4NO3）是一种铵盐，NH4NO3，呈无色无臭的透明晶体或呈白色的晶体，极易溶于水，易吸湿结块，溶解时吸收大量热。受猛烈撞击或受热爆炸性分解，遇碱分解。是氧化剂，用于化肥和化工原料。'
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
