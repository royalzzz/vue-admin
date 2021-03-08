<template>
  <div class="grid-content bg-purple-dark">
    <el-row :gutter="20">
      <div class="grid-content">
        <el-col :span="12">
          <el-input v-model="input3" placeholder="请输入要搜索的新闻报道" class="input-with-select"/>
        </el-col>
        <el-button icon="el-icon-search" type="primary">搜索</el-button>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-table :data="tableData" stripe>
            <el-table-column fixed prop="id" label="新闻id" width="80"/>
            <el-table-column prop="news_title" label="新闻标题" width="380"/>
            <el-table-column prop="news_abstruct" label="摘要文本" width="300"/>
            <el-table-column prop="news_date" label="发布日期" width="200"/>
            <el-table-column label="操作">
              <template>
                <el-button type="text" size="small" @click="dialogTimeLineVisible = true"><i class="el-icon-view"></i>查看编辑摘要</el-button>
                <el-button type="text" size="small"><i class="el-icon-delete"></i>删除</el-button>
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
            <el-input v-model="form.news_title"/>
          </el-form-item>
          <el-form-item label="新闻链接">
            <el-input v-model="form.news_link"/>
          </el-form-item>
          <el-form-item label="摘要文本">
            <el-input v-model="form.news_abstruct" type="textarea" rows="10"/>
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
          news_date: '2019-03-21 19:24:29',
          news_abstruct: '事故发生后，江苏省、盐城市、响水县立即启动应急预案，相关人员第一时间赶赴现场，开展事故救援、秩序维护等工作'
        },
        {
          id: '100002',
          news_title: '盐城化企爆炸消防员泡沫里扑救 现场火势已被控制',
          news_link: 'https://news.163.com/19/0322/04/EARL6H970001899N.html',
          news_date: '2019-03-22 04:59:19',
          news_abstruct: '3月21日，江苏盐城一化工厂爆炸。22日凌晨3时许，火势已被控制，现场视频显示喷洒的灭火泡沫已经齐胸深。据国家应急管理部消息，截至21日19时江苏消防已调派176辆消防车928名消防员。'
        },
        {
          id: '100003',
          news_title: '国务院成立江苏“3·21”特别重大爆炸事故调查组',
          news_link: 'https://money.163.com/19/0322/14/EASL2DVR00258105.html',
          news_date: '2019-03-22 14:16:19',
          news_abstruct: '国务院决定成立江苏响水天嘉宜公司“3·21”特别重大爆炸事故调查组并已开展调查工作。应急管理部党组书记、副部长黄明同志任组长。'
        },
        {
          id: '100004',
          news_title: '沿海省份启动新一轮化工整治',
          news_link: 'https://money.163.com/19/0404/07/EBTC5B9I00258105.html',
          news_date: '2019-04-04 07:15:34',
          news_abstruct: '对列入搬迁入园、改造提升、做强做优名单的企业，强化动态跟踪，一旦发现重大现实隐患且达不到安全生产条件的，先停产后整治，验收合格才能复产。徐长乐还指出，对于一些危害性比较强、安全不到位的企业，该关停的就要关停，通过整治来淘汰一部分落后产能，防患于未然'
        }
      ],
      dialogTimeLineVisible: false,
      form: {
        news_title: '江苏化工厂爆炸致6死30重伤部分民众受轻伤',
        news_link: 'https://news.163.com/19/0321/19/EAQK9V8G0001899O.html',
        news_abstruct: '事故发生后，江苏省、盐城市、响水县立即启动应急预案，相关人员第一时间赶赴现场，开展事故救援、秩序维护等工作'
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
