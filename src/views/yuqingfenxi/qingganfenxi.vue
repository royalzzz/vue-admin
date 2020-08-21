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
            <el-table-column prop="news_title" label="新闻标题" width="300" />
            <el-table-column prop="news_accident_title" label="所属事故" width="250" />
            <el-table-column prop="news_comments_num" label="评论数量" width="100" />
            <el-table-column label="评论舆论倾向" width="200">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="(1为最积极  0为最消极)"
                  placement="top-start"
                >
                  <el-button type="text">{{ scope.row.news_comments_tendency }}</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" size="small" @click="dialogTimeLineVisible = true">查看编辑评论</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="新闻评论情感倾向" :visible.sync="dialogTimeLineVisible" class="”pub_dialog”">
      <div style="overflow:auto;height:380px;overflow-x:hidden">
        <el-row :gutter="3">
          <el-card shadow="hover">
            <p>又是化工爆炸，这几年多少起了，监管何在</p>
            <p>
              感情倾向： <el-link type="danger">消极评论</el-link>。 （<i>积极：0.0071 </i><i type="danger">消极：0.9929</i>）
              <el-button type="danger" size="small" style="float:right">删除</el-button>
            </p>
          </el-card>
        </el-row>
        <el-row :gutter="3">
          <el-card shadow="hover">
            <p>你永远不知明天和意外哪个先来！</p>
            <p>感情倾向：<el-link type="success">积极评论</el-link>。（<i>积极：0.7474 </i><i type="danger">消极：0.2526</i>）
              <el-button type="danger" size="small" style="float:right">删除</el-button></p>
          </el-card>
        </el-row>
        <el-row :gutter="3">
          <el-card shadow="hover">
            <p>希望附近的小学的小朋友安好，虽然知道有些孩子都受伤了，还是希望他们能平安，我知道耳朵的重要性。</p>
            <p>感情倾向：<el-link type="success">积极评论</el-link>。（<i>积极：0.934 </i><i type="danger">消极：0.066</i>）<el-button type="danger" size="small" style="float:right">删除</el-button></p>
          </el-card>
        </el-row>
        <el-row :gutter="3">
          <el-card shadow="hover">
            <p>又是化工爆炸，这几年多少起了，监管何在</p>
            <p>感情倾向：消极评论。（<i>积极：0.0071 </i><i type="danger">消极：0.9929</i>）<el-button type="danger" size="small" style="float:right">删除</el-button></p>
          </el-card>
        </el-row>
        <el-row :gutter="3">
          <el-card shadow="hover">
            <p>又是化工爆炸，这几年多少起了，监管何在</p>
            <p>感情倾向：消极评论。（<i>积极：0.0071</i><i type="danger">消极：0.9929</i>）<el-button type="danger" size="small" style="float:right">删除</el-button></p>
          </el-card>
        </el-row>
        <el-row :gutter="3">
          <el-card shadow="hover">
            <p>又是化工爆炸，这几年多少起了，监管何在</p>
            <p>感情倾向：消极评论。（<i>积极：0.0071</i><i type="danger">消极：0.9929</i>）<el-button type="danger" size="small" style="float:right">删除</el-button></p>
          </el-card>
        </el-row>
        <el-row :gutter="3">
          <el-col :span="24">
            <el-card shadow="hover">鼠标悬浮时显示</el-card>
          </el-col>
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
      dialogTimeLineVisible: false
    }
  },
  methods: {}
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
.pub_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
