<template>
  <div :style="{backgroundImage:'url(' + bg + ')', backgroundRepeat:'repeat', backgroundSize:'100% 100%'}">
    <div class="grid-content bg-purple-dark">
      <p style="font-size: 30px;" align="center">化工事故舆情热度排行榜</p>
      <p style="font-size: 13px;" align="right">——每三小时更新一次</p>
      <hr style="width:100%; #909399">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="accident_title" label="事故名称" width="300"></el-table-column>
        <el-table-column prop="accident_class" label="类型" width="200"></el-table-column>
        <el-table-column label="热度">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.percentage"
                         status="exception"></el-progress>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Redubang',
  data() {
    return {
      // bg: require('@/assets/yuqingfenxi/redutu_bg.jpg'),
      tableData: [
        {
          accident_title: '“3.3”四川达州硫化氢中毒事故',
          accident_class: '中毒',
          percentage: 100
        },
        {
          accident_title: '“3.21”江苏响水特别重大爆炸事故',
          accident_class: '爆炸',
          percentage: 80
        },
        {
          accident_title: '“3.25”山东招远爆裂着火事故',
          accident_class: '着火',
          percentage: 70
        },
        {
          accident_title: '“4·24”内蒙古东兴化工爆炸事故',
          accident_class: '爆炸',
          percentage: 60
        },
        {
          accident_title: '“5.25”宁波北仑区油罐着火事故',
          accident_class: '着火',
          percentage: 50
        },
        {
          accident_title: '“6·28”安徽蚌埠窒息、爆燃事故',
          accident_class: '爆炸',
          percentage: 45
        },
        {
          accident_title: '“7.13”安徽蚌埠爆鸣事故',
          accident_class: '爆炸',
          percentage: 42
        }
      ]
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  /* background: #99a9bf; */
  padding: 40px;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
