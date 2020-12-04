<template>
  <div class="grid-content bg-purple-dark">
    <el-form :inline="true" :model="sform" class="demo-form-inline" ref="sform">
      <el-col :span="10">
        <el-form-item label="采集关键字" >
            <el-input v-model="sform.s_key" placeholder="以英文,分隔" style="width: 400px"/>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="启动时间">
          <el-date-picker
            v-model="sform.s_date"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" >
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
            :value="item.value"
          >
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
            <el-table :data="tableData" border max-height="585px" style="width: 100%" v-loading="loading">
              <el-table-column fixed prop="id" label="id" width="80"/>
              <el-table-column fixed prop="news_timeStamp" label="日期" width="150"/>
              <el-table-column prop="news_title" label="报道标题" width="350"/>
              <el-table-column prop="news_site" label="来源" width="100"/>
              <el-table-column prop="news_link" label="来源链接" width="350">
                <template slot-scope="scope">
                  <a :href="scope.row.news_link" target="_blank" class="buttonText">{{scope.row.news_link}}</a>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="primary" size="small" @click="dialogFormVisible = true">查看详情</el-button>
                  <el-button type="success" size="small">编辑</el-button>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="page.pageNumber + 1" :page-sizes="[5, 10, 20, 30, 100]" :page-size="page.pageSize"
                           background layout="total, sizes, prev, pager, next, jumper" :total="page.total"
                           @next-click="nextPage" @prev-click="prevPage">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="事故报道编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="报道名称和分类：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="form.news_title" autocomplete="off"/>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.news_class" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="发布时间和来源：" :label-width="formLabelWidth">
          <el-col :span="16">
            <el-date-picker v-model="form.news_date" autocomplete="off" type="date" value="form.news_data"/>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.news_site" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="报道链接：" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="form.news_link" autocomplete="off"/>
          </el-col>
        </el-form-item>
        <el-form-item label="详细内容：" :label-width="formLabelWidth">
          <el-col :span="22">
            <el-input v-model="form.news_content" autocomplete="off" type="textarea" :rows="10"/>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as yuqingApi from "@/api/yuqing";
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
      form: {
        news_title: '四川乐山五通桥区化工厂毒气泄漏',
        news_class: '泄露',
        news_date: '08/20/2019',
        news_site: '微博',
        news_link: 'https://www.sohu.com/a/361694648_120214180',
        news_content: '针对网传四川乐山五通桥区化工厂爆炸发生毒气泄漏事件，2020年8月20日上午，界面新闻从乐山市委宣传部获悉，该市五通桥区发生一起化工厂泄露事故，目前已经得到控制，暂无人员伤亡的报告。“是泄露，不是爆炸”，乐山市委宣传部人士对界面新闻强调，由于泄露气体存在异味，所以才引发部分当地居民担忧。目前，有关部门正在排查泄露原因，稍后将会详细通报。一位当地市民告诉界面新闻，今天早上，闻到气味后当地许多市民自发往更远的地方撤离，但是很多人被堵在路上，交通瘫痪。此前，@四川应急官方微博曾表示，8月20日上午，四川省乐山市五通桥区疑似发生化工厂气体泄漏。对此，20日9时56分，五通桥区发布情况通报称，目前，经应急、环保等部门现场勘察，该区危化品企业未发生爆炸，全区正在对区内危化品企业再次开展地毯式排查，请大家不信谣、不传谣，关注官方通报。随后@乐山应急也发布消息称，经排查，五通桥区内所有化工企业均未发生爆炸。10时26分，五通桥区又发布情况通报称，经排查，该区内所有化工企业均未发生爆炸。目前，五通桥中心城区产生异味浓雾的原因已经生态环境等部门快速监测，未发现氯化氢等气体超标情况。通过环保部门排查和企业自查，未发现泄露等异常现象，现正开展水、气取样检测，进一步开展深入排查。请市民不要恐慌。界面新闻注意到，8月18日，乐山市五通桥区官方微博也曾紧急辟谣称，经五通桥区应急管理和生态环境部门现场勘查，该区境内目前未发现和邦、永祥、福华等企业燃烧、爆炸和泄漏的情况，关于网友反映的烟雾产生的原因，为永祥股份安全系统正常泄压。公开资料显示，五通桥区工业发展历史悠久，是四川重要的工业基地，四川省化工基地，轻工部十大原料基地之一。目前，全区已有盐磷化工等规模以上工业企业达66户，其中5家企业为上市公司。'
      },
      sform: {
        s_key: '化工爆炸,化工泄露,化工中毒,化工火灾',
        s_date: '',
        s_time: ''
      },
      formLabelWidth: '150px',
      page:{
        pageSize: 10,
        pageNumber: 0,
        total: 0
      },
      loading: false,
    }
  },
  methods: {
    nextPage() {
      this.page.pageNumber += 1;
      this.loadData();
    },
    prevPage() {
      this.page.pageNumber -= 1;
      this.loadData();
    },
    handleSizeChange(size) {
      this.page.pageSize = size;
      this.page.pageNumber = 0;
      this.loadData();
    },
    handleCurrentChange(current) {
      this.page.pageNumber = current - 1;
      this.loadData();
    },
    setCrawlerParams() {
      console.log(this.sform);
      this.$store.dispatch('yuqing/setCrawlerParams', this.sform)
        .then(result => {
          console.log(result);
        })
        .catch(() => {
          this.loading = false
        })
    },
    initTime() {
      var now   = new Date();
      var monthn = now.getMonth()+1;
      var yearn  = now.getFullYear();
      var dayn = now.getDate();
      var h = now.getHours()+1;
      var m =now.getMinutes();
      var s = now.getSeconds();
      this.sform.s_date = yearn+"-"+monthn+"-"+dayn+" "+h+":"+m+":"+s;
    },
    loadData(){
      yuqingApi.getAllYuqingOriginnewsPageable(this.page).then((result)=>{
        console.log(result.data)
        this.tableData = result.data.content
        this.page.total = result.data.totalPages
      })
    }
  },
  mounted() {
    this.initTime();
    this.loadData();
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
