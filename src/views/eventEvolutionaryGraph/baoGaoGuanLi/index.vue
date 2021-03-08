<template>
  <div style="padding: 20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input v-model="formInline.user" placeholder="关键字搜索" style="width: 850px;"></el-input>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="">
          搜索事故报告
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                   @click="">
          事故报告导入
        </el-button>
        <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          事故报告下载
        </el-button> -->
      </el-form-item>
    </el-form>

    <el-table :data="tableData"  stripe style="width: 100%" v-loading="loading">
      <el-table-column fixed prop="id" label="编号" width="50"></el-table-column>
      <el-table-column prop="title" label="事故报告标题" width="200"></el-table-column>
      <el-table-column prop="content" label="事故报告内容" width="840">
        <template slot-scope="scope">
          <p class="_events_sty">
            {{ scope.row.content }}
          </p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editReport(scope.row);showEdit = true"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button type="text" size="small" @click="removeReport(scope.row)"><i class="el-icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="page.pageNumber + 1" :page-sizes="[5, 10, 20, 30, 100]" :page-size="page.pageSize"
                   background layout="total, sizes, prev, pager, next, jumper" :total="page.total"
                   @next-click="nextPage" @prev-click="prevPage">
    </el-pagination>

<!--    编辑表单， 弹出页面-->
    <el-dialog title="事故报告编辑" :visible.sync="showEdit">
      <el-form :model="editFrom">
        <el-form-item label="报告标题">
          <el-input v-model="editFrom.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="报告内容">
          <el-input type="textarea" v-model="editFrom.content" autocomplete="off" rows="12"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit();showEdit = false">取 消</el-button>
        <el-button type="primary" @click="saveReport(editFrom);showEdit = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {getAccidentReportPageable, saveReport, removeReport} from "@/api/tree";
export default {
  name: '',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        id: '1',
        title: '燃油槽车;火灾事故及防范',
        content: ' 引言（一）    燃油运输在公路运输中一直占有重要地位。尤其是近些年来全国各地加油站如雨后春笋般增加，更使石油的公路运输由短距离发展成跨地区，跨省的长途运输，并且单车油罐容量也由5m3增至30m3。因而汽车油槽车在油品运输及装卸中发生的事故日益频繁，损失也日益加大。这是一个值得引起重视的问题。案例分析（二）    案例分析   1995年8月4日，一辆汽车油槽车在某石油公司装油台充加90号汽油。由于油台电子阀门突然失灵，装油过量造成汽油冒顶外溢。在充装操作工按规定对槽车及地面进行清洗的过程中，汽车驾驶员擅自启动车辆，致使槽顶部汽油又泼溅到驾驶台与地面。当驾驶员再次启动汽车时发生火灾，二人烧伤面积达30%～40%，汽车烧毁报废。   从事故分析报告得知，装油使用的输油管是消防水带。插入槽车顶距罐底尚有1.19m就开始放油，油流速度过快，呈喷溅状，造成非导电材料消防水带集聚大量静电而引起火灾。   1987年11月30日，燕山县某厂装油台在给一辆东风140型汽车油槽充油时，槽车突然爆炸起火。爆炸冲击波将守在槽车顶部观察油位的工人掀翻落地，造成重伤。这起事故也是因静电放电引发的。防范措施（三）    防范措施   1. 静电接地不可忽视   从装油操作过程中看，静电产生部位主要是泵、过滤器、管道。如果汽车油槽车没有良好接地就进行充油作业，油罐车可带上10kV以上的静电压。只要遇到很小的火花就可点燃油气。因此为防范事故必须做到以下几点：   （1） 充油前必须装好接地线，并检验是否符合防静电标准。   （2） 装油时充油管必须伸至油槽底部，管口距罐底不得超过15cm，并严格控制油速不超过1m/s。   （3） 装油结束后必须稳油5分钟才能断开接地装置。   2.不能因有良好接地就放松警惕   尽管人们认识到静电积蓄的高电压放电是事故之源，并用良好接地来导走静电。但须认识到，接地点只能导走与其紧密相连的导体上的静电。面对不与其连接的导体及非导体上的静电荷却无能为力，或在短时间内无法导走。因此，操作时要提高警惕，要掌握正确处理各种突发情况的应急措施。   3.防止操作者人身带静电   为减少人体带电，一般情况下，在工作前操作人员应先接触接地装置以消除人体的静电。当然，操作者在工作时应穿防静电工作服及防静电鞋。   4.必须使用符合技术规范和安全要求的设备   发油台的自控、遥控、计量仪器仪表、阀门等必须定期检查，并制定相关的管理制度。注油管严禁使用不导电的聚乙烯软管。接卸油品时严禁用塑料容器。加强对静电接地设施的检验。对普遍使用的夹子和磁力连接装置，不能夹在或吸附在石油槽车的任意位置。   5.提高操作者的安全意识和工作责任心   所有接触汽车油槽车充油工作的人员必须加强安全操作知识的学习。学习石油及成品油的各种理化性质，有关安全操作知识及有关的消防法规，学习常用灭火方法，以便减少事故，提高工作安全性。 '
      }],
      oldForm:{},
      editFrom: {},
      page:{
        pageSize: 10,
        pageNumber: 0,
        total: 0
      },
      loading: false,
      showEdit: false
    }
  },
  methods: {
    saveReport(form) {
      console.log(form)
      const {id, title, content} = form
      saveReport({id, title, content}).then(result=>{
        console.log(result)
      })
    },
    removeReport(row) {
      removeReport(row.id).then(result=>{
        console.log(result)
        this.loadData()
      })
    },
    cancelEdit() {
      this.editFrom=this.oldForm
    },
    editReport(row) {
      this.editFrom = row
      this.oldForm = row
    },
    onSubmit() {
      console.log('submit!')
    },
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
    loadData() {
      this.loading = true
      getAccidentReportPageable(this.page).then(result=>{
        console.log(result.data.content)
        this.tableData = result.data.content
        this.page.total = result.data.totalElements
        this.loading = false
      })
    }

  },
  mounted() {
    this.loadData();
  }
}
</script>

<style>
._events_sty {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
