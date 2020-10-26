<template>
  <div class="grid-content bg-purple-dark">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <el-col :span="12">
            <el-input v-model="input3" placeholder="请输入要搜索的任务" class="input-with-select" />
          </el-col>
          <el-button icon="el-icon-search" type="primary">搜索</el-button>

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
            <el-table-column fixed prop="date" label="日期" width="100" />
            <el-table-column prop="news_title" label="名称" width="300" />
            <el-table-column prop="news_site" label="类别" width="100" />
            <el-table-column prop="news_link" label="进度" width="350">
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.percentage" status="exception"></el-progress>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template>
                <el-button type="danger" icon="el-icon-delete" size="small" @click="dialogFormVisible = true"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="请再次确认终止任务" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.news_title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="发布时间和类别：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-date-picker v-model="form.news_date" autocomplete="off" type="date" value="form.news_data" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.news_site" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="进度：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="form.percentage" status="exception"></el-progress>
          </el-col>
        </el-form-item>
        <el-form-item label="详细内容：" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="form.news_content" autocomplete="off" type="textarea" :rows="10" />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Renwuguanli',
  data() {
    return {
      tableData: [
        {
          id: '100001',
          date: '2016-05-02',
          news_title: '任务1',
          news_site: '事例图谱',
          percentage: 100,
          zip: 200333
        },
        {
          id: '100002',
          date: '2016-05-04',
          news_title: '任务2',
          news_site: '知识库问答',
          percentage: 80,
          zip: 200333
        },
        {
          id: '100003',
          date: '2016-05-01',
          news_title: '任务3',
          news_site: '舆情分析',
          percentage: 60,
          zip: 200333
        },
        {
          id: '100004',
          date: '2016-05-03',
          news_title: '任务4',
          news_site: '系统管理',
          percentage: 40,
          zip: 200333
        }
      ],
      dialogFormVisible: false,
      form: {
        news_title: '任务5',
        news_date: '08/20/2019',
        news_site: '事例图谱',
        percentage: 80,
        news_content: '该任务牛逼了！！！不能删。。。。'
      },
      formLabelWidth: '150px'
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
