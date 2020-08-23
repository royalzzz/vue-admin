<template>
  <div style="padding: 20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" @click="onSubmit">新增事故</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="事故搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="ID" label="编号" width="100"></el-table-column>
      <el-table-column prop="title" label="事故标题"></el-table-column>
      <el-table-column prop="content" label="事故内容"></el-table-column>
      <el-table-column prop="time" label="时间" width="100"></el-table-column>
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
  name: 'Shigu',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        ID: '1000',
        title: '2016年江苏靖江“4·22”德桥化工仓储公司火灾事故',
        time: '2016-04-22',
        content: '一、事故回放 2016年4月22日9时13分左右，江苏德桥仓储有限公司储罐区2号交换站发生火灾'
      }, {
        ID: '1001',
        title: '2014年陕西延安“4·26”戊烷爆炸事故',
        time: '2014-04-26',
        content: '一、事故回放 2014年4月26日0时23分，陕西省延安市洛川县交口河镇的陕西延长石油集团炼化公司延安炼油厂油品储罐区因违规将'
      }, {
        ID: '1002',
        title: '2013年辽宁大连“6·2”三苯罐区爆炸事故',
        time: '2013-06-02',
        content: '一、事故回放 2013年6月2日14时27分许，中国石油天然气股份有限公司大连石化分公司（以下简称“大连石化公司”'
      }, {
        ID: '1003',
        title: '2008年广西广维集团“8·26”储罐爆炸事故',
        time: '2008-08-26',
        content: '一、事故回放 2008年8月26日6时45分，广西广维集团有机厂发生爆炸事故，导致31个储罐连环起火爆炸'
      }, {
        ID: '1004',
        title: '2008年浙江舟山“3·9”油罐群爆炸事故',
        time: '2008-03-09',
        content: '一、事故回放 2008年3月9日下午，浙江省舟山市浙海油污水综合处理有限公司（简称浙海油污水公司）进行油污水罐顶部焊接作业时发生爆燃'
      }, {
        ID: '1005',
        title: '1989年黄岛油库“8·12”火灾事故',
        time: '1989-08-12',
        content: '一、事故回放 1989年8月12日，中国石油总公司管道局胜利输油公司位于山东省青岛市黄岛油库的特大火灾爆炸事故'
      }, {
        ID: '1006',
        title: '2014年上海金山“7·25”含油污水罐爆燃事故',
        time: '2014-07-25',
        content: '一、事故回放 2014年7月25日10时36分许，中国石化上海石油化工股份有限公司环保水务部湿式氧化车间2号污水处理系统的含油污水'
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
