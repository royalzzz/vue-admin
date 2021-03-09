<template>
  <div class="grid-content bg-purple-dark">
    <el-form ref="sform" :inline="true" :model="sform" class="demo-form-inline">
      <el-col :span="10">
        <el-form-item label="采集关键字">
          <el-input v-model="sform.s_key" placeholder="以英文,分隔" style="width: 400px" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="启动时间">
          <el-date-picker
            v-model="sform.s_date"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="时间间隔">
          <el-select v-model="sform.s_time" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" @click="setCrawlerParams">设置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <div class="grid-content">
            <el-table v-loading="loading" :data="tableData" stripe max-height="585px" style="width: 100%">
              <el-table-column fixed prop="id" label="id" width="80" />
              <el-table-column fixed prop="news_date" label="日期" width="150" />
              <el-table-column prop="news_title" label="报道标题" width="350" />
              <el-table-column prop="news_site" label="来源" width="100" />
              <el-table-column prop="news_link" label="来源链接" width="350">
                <template slot-scope="scope">
                  <a :href="scope.row.news_link" target="_blank" class="buttonText">{{ scope.row.news_link }}</a>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="showDetail(scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                  <el-button type="danger" size="small"><i class="el-icon-delete"></i>删除</el-button>
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
        </div>
      </el-col>
    </el-row>
    <el-dialog title="事故报道编辑" :visible.sync="dialogFormVisible">
      <el-form :model="detailForm">
        <el-form-item label="报道名称和分类：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="detailForm.news_title" autocomplete="off" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="detailForm.news_class" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="发布时间和来源：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-date-picker v-model="detailForm.news_date" autocomplete="off" type="date" value="form.news_data" />
          </el-col>
          <el-col :span="6">
            <el-input v-model="detailForm.news_site" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="报道链接：" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="detailForm.news_link" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="详细内容：" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="detailForm.news_content" autocomplete="off" type="textarea" :rows="10" />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDetail">关 闭</el-button>
        <el-button type="primary" @click=saveDetail()>保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as yuqingApi from '@/api/yuqing'
export default {
  name: 'Xinxicaiji',
  data() {
    return {
      options: [{
        value: 1,
        label: '一小时'
      }, {
        value: 2,
        label: '两小时'
      }],
      value: '',
      tableData: [
        {
          id: '100001',
          date: '2016-05-02',
          news_title: '“3.3”四川达州硫化氢中毒事故',
          news_site: '微博',
          news_link: 'https://www.sohu.com/a/361694648_120214180',
          news_class: '中毒',
          zip: 200333
        },
        {
          id: '100002',
          date: '2016-05-04',
          news_title: '“3.25”山东招远爆裂着火事故',
          news_site: '安全化工网',
          news_link: 'https://www.sohu.com/a/361694648_120214180',
          news_class: '火灾',
          zip: 200333
        },
        {
          id: '100003',
          date: '2016-05-01',
          news_title: '“7·19”河南三门峡重大爆炸事故',
          news_site: '今日头条',
          news_link: 'https://www.sohu.com/a/361694648_120214180',
          news_class: '爆炸',
          zip: 200333
        },
        {
          id: '100004',
          date: '2016-05-03',
          news_title: '四川乐山五通桥区化工厂毒气泄漏',
          news_site: '微博',
          news_link: 'https://www.sohu.com/a/361694648_120214180',
          news_class: '泄露',
          zip: 200333
        }
      ],
      dialogFormVisible: false,
      sform: {
        s_key: '化工爆炸,化工泄露,化工中毒,化工火灾',
        s_date: '',
        s_time: ''
      },
      formLabelWidth: '150px',
      page: {
        pageSize: 10,
        pageNumber: 0,
        total: 0
      },
      loading: false,
      workIndex: -1,
      detailForm: [],
    }
  },
  mounted() {
    this.initTime()
    this.loadData()
  },
  methods: {
    closeDetail() {
      // console.log(this.tableData[this.workIndex])
      this.tableData[this.workIndex].news_content = this.detailForm.news_content_old
      this.dialogFormVisible = false
    },
    saveDetail() {
      yuqingApi.updateNewsData(this.detailForm).then(res=>{
        console.log(res)
        this.dialogFormVisible = false
        this.loadData()
      })
    },
    showDetail(row) {
      // this.form=row
      // console.log(this.form)
      this.workIndex = row.index
      this.detailForm = row
      // console.log(this.workIndex, this.detailForm)
      this.dialogFormVisible = true
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
    setCrawlerParams() {
      console.log(this.sform)
      this.$store.dispatch('yuqing/setCrawlerParams', this.sform)
        .then(result => {
          console.log(result)
        })
        .catch(() => {
          this.loading = false
        })
    },
    initTime() {
      // 启动时间默认为当前时间一小时后
      var now = new Date()
      var monthn = now.getMonth() + 1
      var yearn = now.getFullYear()
      var dayn = now.getDate()
      var h = now.getHours() + 1
      var m = now.getMinutes()
      var s = now.getSeconds()
      this.sform.s_date = yearn + "-" + monthn + "-" + dayn + " " + h + ":" + m + ":" + s
    },
    loadData() {
      yuqingApi.getAllYuqingOriginnewsPageable(this.page).then((result) => {
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
          result.data.content[i].news_content_old = result.data.content[i].news_content
          result.data.content[i].index = i
        }
        // console.log(result.data.content)
        this.tableData = result.data.content

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
