<template>
  <div class="grid-content bg-purple-dark">
    <el-row>
      <el-col :span="12">
        <div class="grid-content">
          <el-input v-model="input3" placeholder="请输入要搜索的事故" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-table :data="tableData" border>
            <el-table-column fixed prop="id" label="id" width="80" />
            <el-table-column prop="accident_title" label="事故名称" width="350" />
            <el-table-column prop="accident_date_start" label="发生日期" width="150" />
            <el-table-column prop="accident_date_end" label="最晚报道日期" width="150" />
            <el-table-column prop="accident_class" label="分类" width="80" />
            <el-table-column label="操作">
              <template>
                <el-button type="text" size="small" @click="dialogTimeLineVisible = true">查看|编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="事故相关报道" :visible.sync="dialogTimeLineVisible">
      <el-timeline :reverse="reverse">
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Huagongshigufenlei',
  data() {
    return {
      reverse: false,
      activities: [{
        content: '江苏盐城市响水陈家港天嘉宜化工厂（生产农药）发生爆炸。',
        timestamp: '2019年3月21日14时48分'
      }, {
        content: '国家应急管理部党组书记黄明抵达盐城，深入现场指导事故抢险和应急救援工作，并召开事故处置会议。',
        timestamp: '2019年3月22日02时00分'
      }, {
        content: '事故现场指挥部召开第一次新闻发布会，盐城市长曹路宝通报基本情况。',
        timestamp: '2019年3月22日09时00分'
      }, {
        content: '事故现场搜救工作正式结束。',
        timestamp: '2019年3月25日00时00分'
      }],
      // value: '全部',
      tableData: [
        {
          id: '100001',
          accident_date_start: '2016-05-02',
          accident_date_end: '2016-07-02',
          accident_title: '“3.3”四川达州硫化氢中毒事故',
          accident_class: '中毒'
        },
        {
          id: '100002',
          accident_date_start: '2016-05-04',
          accident_date_end: '2016-08-04',
          accident_title: '“3.25”山东招远爆裂着火事故',
          accident_class: '火灾'
        },
        {
          id: '100003',
          accident_date_start: '2016-05-01',
          accident_date_end: '2016-09-03',
          accident_title: '“7·19”河南三门峡重大爆炸事故',
          accident_class: '爆炸'
        },
        {
          id: '100004',
          accident_date_start: '2016-05-03',
          accident_date_end: '2016-06-10',
          accident_title: '四川乐山五通桥区化工厂毒气泄漏',
          accident_class: '泄露'
        }
      ],
      dialogTimeLineVisible: false
    }
  },
  methods: {
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
  padding: 1% 1% 0% 1%
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
