<template>
  <div class="grid-content bg-purple-dark">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          按事故分类查看：
          <el-select v-model="options[0].value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button icon="el-icon-search" type="primary">搜索</el-button>
          <el-button type="primary" size="small" @click="getYuqingOriginnewsWithoutCla">查看未分类新闻</el-button>
            <el-button type="primary" size="small"  @click="excuteCla">执行分类</el-button>
        </div>

      </el-col>
      <!-- <el-col :span="12">
        <div class="grid-content">sdds</div>
      </el-col> -->
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-table :data="tableData" border>
            <el-table-column fixed prop="id" label="id" width="80"/>
            <el-table-column fixed prop="news_date" label="日期" width="100"/>
            <el-table-column prop="news_title" label="报道标题" width="300"/>
            <el-table-column prop="news_site" label="来源" width="100"/>
            <el-table-column prop="news_link" label="来源链接" width="350"/>
            <el-table-column prop="news_class" label="分类" width="50"/>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="showDetail(scope.row)">查看详情</el-button>
                <el-button type="success" size="small" @click="showDetail(scope.row)">编辑</el-button>
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
        <el-button type="primary" @click="updateData">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as yuqingApi from "@/api/yuqing";
export default {
  name: 'Huagongshigufenlei',
  data() {
    return {
      page:{
        pageSize: 10,
        pageNumber: 0,
        total: 0
      },
      loading: false,
      options: [
        {value: '0', label: '全部'},
        {value: '1', label: '火灾'},
        {value: '2', label: '中毒'},
        {value: '3', label: '爆炸'},
        {value: '4', label: '泄露'},
        {value: '5', label: '其他'}
      ],
      // value: '全部',
      tableData: [],
      updateItem: {},
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '150px',
      excuteClaed: false
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
    showDetail(row) {
      // console.log(row)
      this.form=row
      // console.log(this.form)
      this.dialogFormVisible = true
    },
    excuteCla() {
      this.$confirm('将未分类的新闻执行分类, 是否继续?', '提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        yuqingApi.chargeClass()
        this.$message({
          type: 'success',
          message: '正在执行分类!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消执行'
        });
      });
    },
    getYuqingOriginnewsWithoutCla() {
      yuqingApi.getYuqingOriginnewsWithoutClaPageable(this.page).then(result=>{
        for(var i in result.data.content){
          // var time = new Date(result.data.content[i].news_timeStamp);
          var time = new Date(parseInt(result.data.content[i].news_timeStamp) * 1000)
          var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
          var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
          var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
          var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
          var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
          var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
          result.data.content[i].news_date  = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
          result.data.content[i].news_class = "";
        }
        // console.log(result.data.content)
        this.tableData = result.data.content
        this.page.total = result.data.totalElements
      })
      if (this.excuteClaed){
        this.excuteClaed=false
      }else {
        this.excuteClaed=true
      }
    },
    updateData(){
      this.updateItem=this.form
      yuqingApi.updateNewsData(this.updateItem).then(result=>{
        console.log(result)
        this.dialogFormVisible = false
      })
    },
    loadData(){
      yuqingApi.getYuqingOriginnewsWithClaPageable(this.page).then(result=>{
        for(var i in result.data.content){
          var time = new Date(parseInt(result.data.content[i].news_timeStamp) * 1000)
          var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
          var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
          var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
          var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
          var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
          var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
          result.data.content[i].news_date  = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
          result.data.content[i].news_class = result.data.content[i].claset[0].claname;
        }
        // console.log(result.data.content)
        this.tableData = result.data.content
        this.page.total = result.data.totalElements
      })
    }
  },
  mounted() {
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
