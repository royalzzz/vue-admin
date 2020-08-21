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
            <el-table-column prop="news_title" label="新闻标题" width="380" />
            <el-table-column prop="news_link" label="链接" width="420" />
            <el-table-column prop="news_date" label="发布日期" width="200" />
            <el-table-column label="操作">
              <template>
                <el-button type="primary" size="small" @click="dialogTimeLineVisible = true">查看编辑摘要</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="新闻报道自动摘要查看修改" :visible.sync="dialogTimeLineVisible" top="60px" width="60%">
      <div style="overflow:auto;height:400px;overflow-x:hidden;padding:20px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="新闻标题">
            <el-input v-model="form.news_title" />
          </el-form-item>
          <el-form-item label="新闻链接">
            <el-input v-model="form.news_link" />
          </el-form-item>
          <el-form-item label="摘要文本">
            <el-input v-model="form.news_abstract" type="textarea" rows="10" />
          </el-form-item>
        </el-form>
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
      // value: '全部',
      tableData: [
        {
          id: '100001',
          news_title: '江苏化工厂爆炸致6死30重伤部分民众受轻伤',
          news_link: 'https://news.163.com/19/0321/19/EAQK9V8G0001899O.html',
          news_date: '2019-03-21 19:24:29'
        },
        {
          id: '100002',
          news_title: '盐城化企爆炸消防员泡沫里扑救 现场火势已被控制',
          news_link: 'https://news.163.com/19/0322/04/EARL6H970001899N.html',
          news_date: '2019-03-22 04:59:19'
        },
        {
          id: '100003',
          news_title: '国务院成立江苏“3·21”特别重大爆炸事故调查组',
          news_link: 'https://money.163.com/19/0322/14/EASL2DVR00258105.html',
          news_date: '2019-03-22 14:16:19'
        },
        {
          id: '100004',
          news_title: '沿海省份启动新一轮化工整治',
          news_link: 'https://money.163.com/19/0404/07/EBTC5B9I00258105.html',
          news_date: '2019-04-04 07:15:34'
        }
      ],
      dialogTimeLineVisible: false,
      form: {
        news_title: '江苏化工厂爆炸致6死30重伤部分民众受轻伤',
        news_link: 'https://news.163.com/19/0321/19/EAQK9V8G0001899O.html',
        news_abstract: '事故发生后，江苏省、盐城市、响水县立即启动应急预案，相关人员第一时间赶赴现场，开展事故救援、秩序维护等工作'
      }
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
