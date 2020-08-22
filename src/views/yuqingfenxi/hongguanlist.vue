<template>
  <div class="grid-content bg-purple-dark">
    <el-row :gutter="20">
      <div class="grid-content">
        <el-col :span="24">
          <div>
            <span class="demonstration" style="padding:20px">按指定月份查看：</span>
            <el-date-picker
              v-model="value2"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <el-button icon="el-icon-search" type="primary">搜索</el-button>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-card class="box-card" shadow="hover">
            <el-row>
              <img
                src="@/assets/yuqingfenxi/huagong.jpg"
                class="image"
                style="float:left; width:10%;"
              >
              <h2 style="float:right;width:88%;">2020年7月：化工事故舆情宏观数据统计</h2>
              <p style="float:right;width:88%;">
                生成时间：2020 年 8 月 3 日
                <el-link type="primary" :underline="false" @click="dialogTimeLineVisible = true">
                  查看详情
                  <i class="el-icon-view el-icon--right"></i>
                </el-link>
              </p>
            </el-row>
          </el-card>
          <el-card class="box-card" shadow="hover">
            <el-row>
              <img
                src="@/assets/yuqingfenxi/huagong.jpg"
                class="image"
                style="float:left; width:10%;"
              >
              <h2 style="float:right;width:88%;">2020年6月：化工事故舆情宏观数据统计</h2>
              <p style="float:right;width:88%;">
                生成时间：2020 年 7 月 3 日
                <el-link type="primary" :underline="false">
                  查看详情
                  <i class="el-icon-view el-icon--right"></i>
                </el-link>
              </p>
            </el-row>
          </el-card>
          <el-card class="box-card" shadow="hover">
            <el-row>
              <img
                src="@/assets/yuqingfenxi/huagong.jpg"
                class="image"
                style="float:left; width:10%;"
              >
              <h2 style="float:right;width:88%;">2020年5月：化工事故舆情宏观数据统计</h2>
              <p style="float:right;width:88%;">
                生成时间：2020 年 6 月 3 日
                <el-link type="primary" :underline="false">
                  查看详情
                  <i class="el-icon-view el-icon--right"></i>
                </el-link>
              </p>
            </el-row>
          </el-card>
          <el-card class="box-card" shadow="hover">
            <el-row>
              <img
                src="@/assets/yuqingfenxi/huagong.jpg"
                class="image"
                style="float:left; width:10%;"
              >
              <h2 style="float:right;width:88%;">2020年4月：化工事故舆情宏观数据统计</h2>
              <p style="float:right;width:88%;">
                生成时间：2020 年 5 月 3 日
                <el-link type="primary" :underline="false">
                  查看详情
                  <i class="el-icon-view el-icon--right"></i>
                </el-link>
              </p>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="化工事故舆情宏观数据统计" :visible.sync="dialogTimeLineVisible" top="60px" width="60%">
      <div style="overflow:auto;height:480px;overflow-x:hidden;padding:20px">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="大数据热词云图" name="1">
            <div>
              <img src="@/assets/yuqingfenxi/ciyun.png" style="float:left; width:100%;">
            </div>
          </el-collapse-item>
          <el-collapse-item title="热点舆情top榜" name="2">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="accident_title" label="事故名称" width="300"></el-table-column>
              <el-table-column prop="accident_class" label="类型" width="200"></el-table-column>
              <el-table-column label="热度">
                <template slot-scope="scope">
                  <el-progress
                    :text-inside="true"
                    :stroke-width="26"
                    :percentage="scope.row.percentage"
                    status="exception"
                  ></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="媒体报道总量" name="3">
            <div>
              <p>1、与安全生产相关的新闻数量总计1314165篇。</p>
              <p>2、与安全生产相关的纸媒新闻报道数2411篇，新闻网报道总数19139篇，移动端6771篇。</p>
              <p>3、与安全生产相关的微信公众号相关信息总计32793篇，微博相关信息总计1250357条。</p>
              <p>4、与安全生产相关的论坛文章2664篇，博客30条。</p>
            </div>
            <div style="width:100%;geight:1000px">
              <el-row>
                <h3>每日新增新闻、评论数量</h3>
                <line-chart :chart-data="lineChartData" />
              </el-row>
              <el-row>
                <h3>新闻来源数量占比</h3>
                <div align="center">
                  <img
                    src="@/assets/yuqingfenxi/bingzhuangtu1.jpg"
                    style="width:50%;padding:auto auto;"
                  >
                </div>
              </el-row>
            </div>
          </el-collapse-item>
          <el-collapse-item title="舆情倾向性" name="4">
            <div align="center">
              <img src="@/assets/yuqingfenxi/bingzhuangtu2.jpg" style="width:50%;padding:0px auto;">
            </div>
            <p>2020年7月1日至2020年7月31日，国内各媒体对安全生产报道的中性评论为1583篇，占23%；中性文章数量为600篇，占9%；正面文章数量为5791篇，占62%。</p>
          </el-collapse-item>
          <el-collapse-item title="舆情情况研判" name="5">
            <p>监测时间段内:</p>
            <p>
              安全生产传播内容总量
              <el-link type="danger">★★★★☆</el-link>（较高），舆情等级为
              <el-link type="warning">橙色等级</el-link>（少量异常）。
            </p>
            <div align="center">
              <img src="@/assets/yuqingfenxi/jieshi.png" style="width:70%;padding:0px auto;">
            </div>
          </el-collapse-item>
          <el-collapse-item title="敏感舆情列表" name="6">
            <div align="center">
              <el-table :data="list_sensitive" style="width: 90%" :row-class-name="tableRowClassName">
                <el-table-column prop="accident_date" label="日期" width="100"></el-table-column>
                <el-table-column prop="accident_title" label="敏感事故" width="350"></el-table-column>
                <el-table-column prop="accident_sensitive" label="敏感指数" width="100"></el-table-column>
                <el-table-column label="">
                  <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.accident_sensitive" status="exception"></el-progress>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
          <el-collapse-item title="舆情案例分析" name="7">
            <div>
              <el-card class="box-card" shadow="hover" style="width:90%;margin-left:5%">
                <div class="text item">
                  <span>“3.3”四川达州硫化氢中毒事故</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看微观数据统计</el-button>
                </div>
              </el-card>
              <el-card class="box-card" shadow="hover" style="width:90%;margin-left:5%">
                <div class="text item">
                  <span>“3.21”江苏响水特别重大爆炸事故</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看微观数据统计</el-button>
                </div>
              </el-card>
              <el-card class="box-card" shadow="hover" style="width:90%;margin-left:5%">
                <div class="text item">
                  <span>“3.25”山东招远爆裂着火事故</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看微观数据统计</el-button>
                </div>
              </el-card>
              <el-card class="box-card" shadow="hover" style="width:90%;margin-left:5%">
                <div class="text item">
                  <span>“4·24”内蒙古东兴化工爆炸事故</span>
                  <el-button style="float: right; padding: 3px 0" type="text">查看微观数据统计</el-button>
                </div>
              </el-card>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LineChart from '../dashboard/admin/components/LineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [
      20,
      25,
      28,
      27,
      15,
      23,
      30,
      39,
      45,
      44,
      43,
      40,
      35,
      32,
      30,
      30,
      30,
      26,
      26,
      26,
      24,
      24,
      23,
      22,
      22,
      20,
      19,
      17,
      22,
      20
    ],
    expectedData_name: '新闻数量',
    actualData: [
      70,
      75,
      78,
      77,
      65,
      53,
      50,
      89,
      105,
      114,
      133,
      80,
      105,
      102,
      100,
      90,
      83,
      86,
      76,
      76,
      64,
      34,
      33,
      42,
      42,
      40,
      49,
      37,
      32,
      35
    ],
    actualData_name: '评论数量',
    x: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30
    ]
  },
  messages: {
    expectedData: [
      20,
      25,
      28,
      27,
      15,
      23,
      30,
      39,
      45,
      44,
      43,
      40,
      35,
      32,
      30,
      30,
      30,
      26,
      26,
      26,
      24,
      24,
      23,
      22,
      22,
      20,
      19,
      17,
      22,
      20
    ],
    actualData: [
      70,
      75,
      78,
      77,
      65,
      53,
      50,
      89,
      105,
      114,
      133,
      80,
      105,
      102,
      100,
      90,
      83,
      86,
      76,
      76,
      64,
      34,
      33,
      42,
      42,
      40,
      49,
      37,
      32,
      35
    ]
  }
}
export default {
  name: 'Huagongshigufenlei',
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      activeNames: ['1'],
      reverse: false,
      dialogTimeLineVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: '',
      value2: '',
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
      ],
      list_sensitive: [{
        accident_date: '2020-03-03',
        accident_title: '“3.3”四川达州硫化氢中毒事故',
        accident_sensitive: 75.4
      }, {
        accident_date: '2020-03-21',
        accident_title: '“3.21”江苏响水特别重大爆炸事故',
        accident_sensitive: 64
      }, {
        accident_date: '2020-03-25',
        accident_title: '“3.25”山东招远爆裂着火事故',
        accident_sensitive: 50
      }, {
        accident_date: '2020-04-24',
        accident_title: '“4·24”内蒙古东兴化工爆炸事故',
        accident_sensitive: 30
      }]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
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
  padding: 20px;
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
.text {
  font-size: 20px;
}
.item {
  padding: 10px 0;
}
.box-card {
  width: 100%;
  padding: -10px 0px 0px 0px;
}
#container {
  width: 100%;
}
#photo {
  float: left;
  width: 40%;
}
#content {
  float: right;
  width: 60%;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
