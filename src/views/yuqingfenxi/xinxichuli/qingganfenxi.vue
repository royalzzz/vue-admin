<template>
  <div class="grid-content bg-purple-dark">
    <el-row :gutter="20">
      <div class="grid-content">
        <el-col :span="12">
          <el-input v-model="input3" placeholder="请输入要搜索的新闻报道" class="input-with-select" />
        </el-col>
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-table :data="tableData" border>
            <el-table-column fixed prop="id" label="新闻id" width="80" />
            <el-table-column prop="news_title" label="新闻标题" width="300">
              <template slot-scope="scope">
                <a :href="scope.row.news_link" target="_blank" class="buttonText">{{ scope.row.news_title }}</a>
              </template>
            </el-table-column>
            <!--            <el-table-column prop="news_accident_title" label="所属事故" width="250"/>-->
            <el-table-column prop="news_comments_num" label="评论数量" width="100" />
            <el-table-column label="评论舆论倾向" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="(1为最积极  0为最消极)"
                  placement="top-start">
                  <el-button type="text">{{ scope.row.news_comments_tendency }}</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="showDetail(scope.row)">查看编辑评论</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="page.pageNumber + 1" :page-sizes="[5, 10, 20, 30, 100]"
            :page-size="page.pageSize" background
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @next-click="nextPage" @prev-click="prevPage">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="新闻评论情感倾向" :visible.sync="dialogTimeLineVisible" top="60px" width="60%">
      <div style="overflow:auto;height:450px;overflow-x:hidden">
        <el-row v-for="(comment) in commentsForm" :key="comment.comment_id" :gutter="3">
          <el-card shadow="hover">
            <p>{{ comment.comment_content }}</p>
            <p>
              感情倾向：
              <el-link type="danger">{{ comment.emotion }}</el-link>
              。 （<i>积极占比：{{ comment.positive_probs }} </i>）
              <el-button type="danger" size="small" style="float:right">删除</el-button>
            </p>
          </el-card>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as yuqingApi from '@/api/yuqing'

export default {
  name: 'Huagongshigufenlei',
  data() {
    return {
      reverse: false,
      activities: [
        {
          content: '江苏盐城市响水陈家港天嘉宜化工厂（生产农药）发生爆炸。',
          timestamp: '2019年3月21日14时48分'
        },
        {
          content:
            '国家应急管理部党组书记黄明抵达盐城，深入现场指导事故抢险和应急救援工作，并召开事故处置会议。',
          timestamp: '2019年3月22日02时00分'
        },
        {
          content:
            '事故现场指挥部召开第一次新闻发布会，盐城市长曹路宝通报基本情况。',
          timestamp: '2019年3月22日09时00分'
        },
        {
          content: '事故现场搜救工作正式结束。',
          timestamp: '2019年3月25日00时00分'
        }
      ],
      // value: '全部',
      tableData: [
        {
          id: '100001',
          news_title: '江苏化工厂爆炸致6死30重伤部分民众受轻伤',
          news_accident_title: '江苏盐城化工爆炸',
          news_comments_num: 26,
          news_comments_tendency: 0.35
        },
        {
          id: '100002',
          news_title: '盐城化企爆炸消防员泡沫里扑救 现场火势已被控制',
          news_accident_title: '江苏盐城化工爆炸',
          news_comments_num: 58,
          news_comments_tendency: 0.68
        },
        {
          id: '100003',
          news_title: '国务院成立江苏“3·21”特别重大爆炸事故调查组',
          news_accident_title: '江苏盐城化工爆炸',
          news_comments_num: 66,
          news_comments_tendency: 0.92
        },
        {
          id: '100004',
          news_title: '沿海省份启动新一轮化工整治',
          news_accident_title: '江苏盐城化工爆炸',
          news_comments_num: 20,
          news_comments_tendency: 0.98
        }
      ],
      commentsForm: [],
      dialogTimeLineVisible: false,
      page: {
        pageSize: 10,
        pageNumber: 0,
        total: 0
      },
      loading: false,
      sform: {
        s_key: '化工爆炸,化工泄露,化工中毒,化工火灾',
        s_date: '',
        s_time: ''
      }
    }
  },
  mounted() {
    this.initTime()
    this.loadData()
  },
  methods: {
    showDetail(row) {
      // this.form=row
      // console.log(this.form)
      this.commentsForm = row.news_comments
      console.log(this.commentsForm)
      this.dialogTimeLineVisible = true
    },
    nextPage() {
      this.page.pageNumber += 1
      this.loadData()
    },
    prevPage() {
      this.page.pageNumber -= 1
      this.loadData()
    },
    handleSizeChange(size) {
      this.page.pageSize = size
      this.page.pageNumber = 0
      this.loadData()
    },
    handleCurrentChange(current) {
      this.page.pageNumber = current - 1
      this.loadData()
    },
    initTime() {
      var now = new Date()
      var monthn = now.getMonth() + 1
      var yearn = now.getFullYear()
      var dayn = now.getDate()
      var h = now.getHours() + 1
      var m = now.getMinutes()
      var s = now.getSeconds()
      this.sform.s_date = yearn + '-' + monthn + '-' + dayn + ' ' + h + ':' + m + ':' + s
    },
    loadData() {
      yuqingApi.getAllYuqingCommentsNumPageable(this.page).then((result) => {
        for (var i in result.data.content) {
          var time = new Date(parseInt(result.data.content[i].news_timeStamp) * 1000)
          // var time = new Date(result.data.content[i].news_timeStamp);
          var y = time.getFullYear() // getFullYear方法以四位数字返回年份
          var M = time.getMonth() + 1 // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
          var d = time.getDate() // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
          var h = time.getHours() // getHours方法返回 Date 对象的小时 (0 ~ 23)
          var m = time.getMinutes() // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
          var s = time.getSeconds() // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
          // result.data.content[i].news_date  = nene;
          result.data.content[i].news_date = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
          if (result.data.content[i].news_comments === '[]') {
            result.data.content[i].news_comments = [] // 新闻评论
            result.data.content[i].news_comments_num = 0 // 评论数量
            result.data.content[i].news_comments_tendency = 0 // 评论总体倾向
          } else {
            var comments = eval(result.data.content[i].news_comments)
            console.log(comments, result.data.content[i].news_comments)
            result.data.content[i].news_comments = comments // 新闻评论
            result.data.content[i].news_comments_num = comments.length // 评论数量
            var news_comments_tendency = 0.0
            for (var j in result.data.content[i].news_comments) {
              news_comments_tendency += result.data.content[i].news_comments[j].positive_probs
            }
            result.data.content[i].news_comments_tendency = (news_comments_tendency / comments.length).toFixed(4) // 评论总体倾向
          }
        }
        // console.log(result.data.content)
        this.tableData = result.data.content
        console.log(this.tableData)
        this.page.total = result.data.totalElements
      })
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
