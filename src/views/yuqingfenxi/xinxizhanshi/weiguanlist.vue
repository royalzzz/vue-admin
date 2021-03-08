<template>
  <div class="grid-content bg-purple-dark">
    <el-row :gutter="20">
      <div class="grid-content">
        <el-col :span="12">
          <el-input v-model="input3" placeholder="请输入要搜索的事故" class="input-with-select"/>
        </el-col>
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-table :data="tableData" stripe>
            <el-table-column fixed prop="id" label="事故id" width="80"/>
            <el-table-column prop="accident_title" label="事故名称" width="300"/>
            <el-table-column prop="accident_news_num" label="新闻数量" width="100"/>
            <el-table-column prop="accident_comments_num" label="评论数量" width="100"/>
            <el-table-column prop="accident_date" label="发生时间" width="100"/>
            <el-table-column label="操作">
              <template>
                <el-button type="text" size="small" @click="dialogTimeLineVisible = true"><i class="el-icon-view"></i>查看微观数据统计</el-button>
                <el-button type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="微观数据统计" :visible.sync="dialogTimeLineVisible" top="60px" width="60%">
      <div style="overflow:auto;height:450px;overflow-x:hidden">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="事故报道综合回顾" name="1">
            <div class="block">
              <el-timeline>
                <el-timeline-item timestamp="2019-03-21" placement="top">
                  <el-card>
                    <h4>江苏化工厂爆炸致6死30重伤部分民众受轻伤</h4>
                    <p>王小虎 提交于 2019-03-21 19:24:29</p>
                    <p>事故发生后，江苏省、盐城市、响水县立即启动应急预案，相关人员第一时间赶赴现场，开展事故救援、秩序维护等工作</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2019-03-22" placement="top">
                  <el-card>
                    <h4>盐城化企爆炸消防员泡沫里扑救 现场火势已被控制</h4>
                    <p>王小虎 提交于 2019-03-22 04:59:19</p>
                    <p>3月21日，江苏盐城一化工厂爆炸。22日凌晨3时许，火势已被控制，现场视频显示喷洒的灭火泡沫已经齐胸深。据国家应急管理部消息，截至21日19时江苏消防已调派176辆消防车928名消防员。</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2019-03-22" placement="top">
                  <el-card>
                    <h4>国务院成立江苏“3·21”特别重大爆炸事故调查组</h4>
                    <p>微博 发布于 2019-03-22 14:16:19</p>
                    <p>国务院决定成立江苏响水天嘉宜公司“3·21”特别重大爆炸事故调查组并已开展调查工作。应急管理部党组书记、副部长黄明同志任组长。</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-collapse-item>
          <el-collapse-item title="事故舆情概况" name="2">
            <div style="float:left;padding:0px 50px">
              <h3>1. 舆情热词词云</h3>
              <img src="@/assets/yuqingfenxi/shiguciyun.png" style="float:left; width:85%;margin-left:60px">
            </div>
            <div style="float:left;padding:50px">
              <h3>2. 舆情情感倾向</h3>
              <img src="@/assets/yuqingfenxi/huanzhuangtu.png" style="float:left; width:80%;margin-left:60px">
              <p style="float:left; width:60%;">在所有发布信息中，关于响水爆炸案的负面舆情占主导地位，达到62.74%，其次是正面舆情，占比为22.79%，中性舆情占比14.47%。</p>
            </div>
            <div style="float:left;padding:50px 50px 150px">
              <h3>3. 事故舆情情感走势</h3>
              <img src="@/assets/yuqingfenxi/zoushitu.png" style="float:left; width:80%;margin-left:60px">
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Huagongshigufenlei',
  data() {
    return {
      tableData: [
        {
          id: '100001',
          accident_title: '“3.3”四川达州硫化氢中毒事故',
          accident_news_num: 26,
          accident_comments_num: 98,
          accident_date: '2020-03-03'
        },
        {
          id: '100002',
          accident_title: '“3.21”江苏响水特别重大爆炸事故',
          accident_news_num: 58,
          accident_comments_num: 76,
          accident_date: '2020-03-21'
        },
        {
          id: '100003',
          accident_title: '“3.25”山东招远爆裂着火事故',
          accident_news_num: 66,
          accident_comments_num: 136,
          accident_date: '2020-03-25'
        },
        {
          id: '100004',
          accident_title: '“4·24”内蒙古东兴化工爆炸事故',
          accident_news_num: 44,
          accident_comments_num: 132,
          accident_date: '2020-04-24'
        }
      ],
      dialogTimeLineVisible: false
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
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
</style>
