<template>
  <div style="padding: 15px">
    <div>
      <el-tag>问题总数：{{ tagInformation.numberOfQuestions }}</el-tag>
      <el-tag type="success">问题类型：{{ tagInformation.numberOfQuestionTypes }}</el-tag>
      <el-tag type="warning">问题意图：{{ tagInformation.numberOfQuestionIntent }}</el-tag>
      <el-tag type="info">类型标注：{{ tagInformation.numberOfQuestionTypeTag }}</el-tag>
      <el-tag type="danger">意图标注：{{ tagInformation.numberOfQuestionIntentTag }}</el-tag>
    </div>
    <h2>问题类型与意图标注</h2>
    <el-alert
      title="提示: 输入问题时请注意问题的提示，避免重复的问题文本！批量标注问题请先检查是否已有该批量的相关问题。" type="info"
      show-icon
      style="margin-top: 20px;">
    </el-alert>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="自定义问题" name="first">
        <el-card>
          <el-tag>问题灵感</el-tag>
          <el-tag type="success">氢氧化钠的熔点是多少？</el-tag>
          <el-tag type="info">苯是否有毒？</el-tag>
          <el-tag type="warning">接触硫酸该如何处理？</el-tag>
          <el-tag type="danger">甲苯的危险性分类是什么级别？</el-tag>
        </el-card>
        <el-form label-width="80px" size="large" style="margin-top:20px;">
          <el-form-item label="问题文本">
            <el-autocomplete
              v-model="question" :fetch-suggestions="querySearchAsync"
              placeholder="请输入问题" style="width: 480px;"></el-autocomplete>
          </el-form-item>

          <el-form-item label="问题类型">
            <el-select v-model="questionType" multiple placeholder="请选择问题类型" style="width: 480px;">
              <el-option
                v-for="item in questionTypes" :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="问题意图">
            <el-select
              v-model="questionIntent" filterable
              multiple placeholder="请选择问题意图"
              style="width: 480px;">
              <el-option
                v-for="item in questionIntents" :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button v-loading="loading" type="primary" style="width: 480px;" @click="onSubmit">
              提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="批量生成" name="second">
        <el-alert title="批量生成问题提示" type="error" description="该功能已禁止使用" show-icon>
        </el-alert>
        <el-form label-width="80px" size="large" style="margin-top:20px;">
          <el-form-item label="批量规则">
            <el-input
              ref="batchTextRef" v-model="batchText"
              placeholder="请输入内容"
              style="width: 600px;"></el-input>
            <el-button
              type="info" plain
              style="margin-left:10px;"
              @click="insertIntoText('#CHEMICAL')">
              插入 #CHEMICAL
            </el-button>
            <el-button type="info" plain @click="insertIntoText('#INTENT')">插入 #INTENT</el-button>
          </el-form-item>
          <el-form-item label="意图选择">
            <el-select
              v-model="questionIntent" filterable
              multiple placeholder="请选择问题意图"
              style="width: 600px;">
              <el-option
                v-for="item in questionIntents" :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题类型">
            <el-select v-model="questionType" multiple placeholder="请选择问题类型" style="width: 600px;">
              <el-option
                v-for="item in questionTypes" :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              v-loading="loading" type="primary"
              style="width: 600px;"
              icon="el-icon-document-copy" disabled
              @click="onSubmitBatch">
              批量生成
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="模板生成" name="third">
        <el-alert
          title="模板生成问题提示" type="info"
          description="使用通配字符串$CHEMICAL代表危化品，使用$INTENT代表问题的意图。例如：#CHEMICAL的#INTENT是什么？系统将会生成 [氢氧化钠的化学式是什么？苯的化学式是什么？...]"
          show-icon>
        </el-alert>
        <el-form label-width="80px" size="large" style="margin-top:20px;">
          <el-form-item label="模板规则">
            <el-input
              ref="batchTextRef" v-model="batchText"
              placeholder="请输入内容"
              style="width: 600px;"></el-input>
            <el-button
              type="info" plain
              style="margin-left:10px;"
              @click="insertIntoText('#CHEMICAL')">
              插入 #CHEMICAL
            </el-button>
            <el-button type="info" plain @click="insertIntoText('#INTENT')">插入 #INTENT</el-button>
          </el-form-item>
          <el-form-item label="意图选择">
            <el-select
              v-model="questionIntent" filterable
              multiple placeholder="请选择问题意图"
              style="width: 600px;">
              <el-option
                v-for="item in questionIntents" :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问题类型">
            <el-select v-model="questionType" multiple placeholder="请选择问题类型" style="width: 600px;">
              <el-option
                v-for="item in questionTypes" :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              v-loading="loading" type="primary"
              style="width: 600px;"
              icon="el-icon-printer" disabled
              @click="onSubmitBatch">
              模板生成
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="问题标注管理" name="fourth">
        <el-alert title="问题标注提示" type="info" description="" show-icon>
        </el-alert>
        <el-table v-loading="tableLoading" :data="questions" stripe style="width: 100%">
          <el-table-column prop="id" label="编号" width="80">
          </el-table-column>
          <el-table-column prop="text" label="问题文本">
          </el-table-column>
          <el-table-column prop="intents" label="问题意图">
          </el-table-column>
          <el-table-column prop="types" label="问题类型">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" disabled><i class="el-icon-view"></i> 查看详细</el-button>
              <el-button type="text" size="small" disabled @click="handleClick(scope.row)">
                <i
                  class="el-icon-edit"></i> 编辑
              </el-button>
              <el-button type="text" size="small" style="color:red;">
                <i class="el-icon-delete"></i>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <el-pagination
          :current-page="page.pageNumber + 1" :page-sizes="[10, 20, 30, 100]"
          :page-size="page.pageSize" background
          layout="total, sizes, prev, pager, next, jumper" :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" @next-click="nextPage"
          @prev-click="prevPage">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  findAllQuestionTypes,
  tagInformation,
  findAllQuestionIntents,
  findByTextLike,
  tagQuestion,
  tagBatchQuestion,
  findQuestionTextByPage
} from '@/api/kbqa'

export default {
  name: 'Yuliao',
  data() {
    return {
      activeName: 'first',
      tagInformation: {
        numberOfQuestions: 0,
        numberOfQuestionTypes: 0,
        numberOfQuestionIntent: 0,
        numberOfQuestionTypeTag: 0,
        numberOfQuestionIntentTag: 0
      },
      page: {
        pageSize: 10,
        pageNumber: 0,
        total: 0
      },
      question: '',
      questionType: [],
      questionTypes: [],
      questionIntent: [],
      questionIntents: [],
      loading: false,
      tableLoading: false,
      batchText: '',
      questions: []
    }
  },
  mounted() {
    this.loadBasicData()
    this.loadData()
  },
  methods: {
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
    loadData() {
      this.tableLoading = true
      findQuestionTextByPage(this.page).then((res) => {
        this.questions = res.data.content
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].types = ''
          for (let j = 0; j < this.questions[i].kbqaQuestionTypes.length; j++) {
            this.questions[i].types +=
							' ' + this.questions[i].kbqaQuestionTypes[j].name
          }
          this.questions[i].intents = ''
          for (
            let j = 0;
            j < this.questions[i].kbqaQuestionIntents.length;
            j++
          ) {
            this.questions[i].intents +=
							' ' + this.questions[i].kbqaQuestionIntents[j].name
          }
          // this.questions[i].createTime = (this.questions[i].createTime).substring(0,19).replace('T', ' ');
        }
        console.log(this.questions)
        this.page.total = res.data.totalElements
        this.tableLoading = false
      })
    },
    insertIntoText(txt) {
      this.batchText += txt
      this.$refs.batchTextRef.$el.children[0].focus()
    },
    cleanData() {
      this.question = ''
      this.batchText = ''
      this.questionType = []
      this.questionIntent = []
      this.loading = false
    },
    changeTab() {
      this.cleanData()
      this.loadBasicData()
      this.loadData()
    },
    onSubmitBatch() {
      if (this.batchText === '') {
        this.$toast({
          msg: '问题文本为空',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.loading = true
      const tagData = {
        text: this.batchText,
        questionTypes: this.questionType,
        questionIntents: this.questionIntent
      }
      tagBatchQuestion(tagData).then((res) => {
        this.loadBasicData()
        this.cleanData()
        this.$toast({
          msg: '标记成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    onSubmit() {
      if (this.question === '') {
        this.$toast({
          msg: '问题文本为空',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.loading = true
      const tagData = {
        text: this.question,
        questionTypes: this.questionType,
        questionIntents: this.questionIntent
      }
      console.log(tagData)
      tagQuestion(tagData).then((res) => {
        this.loadBasicData()
        this.cleanData()
        this.$toast({
          msg: '标记成功',
          type: 'success',
          duration: 1000
        })
        // const h = this.$createElement;
        // this.$notify({
        //   title: '标记成功',
        //   message: h('i', { style: 'color: teal'}, '问题和标注信息已保存！')
        // });
      })
    },
    querySearchAsync(queryString, cb) {
      if (queryString !== '') {
        findByTextLike(queryString).then((res) => {
          const keywords = []
          res.data.forEach(function (item) {
            const obj = {}
            obj.value = item.text
            obj.id = item.id
            keywords.push(obj)
          })
          cb(keywords)
        })
      }
    },
    loadBasicData() {
      findAllQuestionTypes().then((res) => {
        this.questionTypes = res.data
      })
      findAllQuestionIntents().then((res) => {
        this.questionIntents = res.data
      })
      tagInformation().then((res) => {
        this.tagInformation = res.data
      })
    }
  }
}
</script>

<style>
.el-tag {
	margin-right: 10px;
}
</style>
