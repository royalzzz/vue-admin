<template>
  <div class="grid-content bg-purple-dark">
    <el-row :gutter="20">
      <div class="grid-content">
        <el-col :span="12">
          <el-input v-model="input3" placeholder="请输入要搜索的事故" class="input-with-select" />
        </el-col>
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-table :data="tableData" border>
            <el-table-column fixed prop="id" label="事故id" width="80" />
            <el-table-column prop="accident_title" label="事故名称" width="300" />
            <el-table-column prop="accident_news_num" label="新闻数量" width="100" />
            <el-table-column prop="accident_comments_num" label="评论数量" width="100" />
            <el-table-column prop="accident_date" label="发生时间" width="100" />
            <el-table-column label="操作">
              <template>
                <el-button type="primary" size="small" @click="dialogTimeLineVisible = true">查看微观数据统计</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="微观数据统计" :visible.sync="dialogTimeLineVisible" top="60px" width="60%">
      <div style="overflow:auto;height:450px;overflow-x:hidden">
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
</style>
