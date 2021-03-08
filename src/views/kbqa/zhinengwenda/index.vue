<template>
  <div style="padding:20px;text-align:center">
    <div>
      <img src="@/assets/kbqa/qa.png" style="width:100px;">
    </div>

    <el-input v-model="text" size="large" placeholder="请输入问题..." style="width:70%;">
      <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
    </el-input>

    <el-divider content-position="left"><i class="el-icon-chat-dot-round"></i></el-divider>

    <div id="container_stanford" style="text-align:left;">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="问题解析" name="1">
          <div style="padding:0 5px 5px 5px;">
            <el-card
              style="margin-top:5px;padding:5px;" shadow="hover"
              :body-style="{ padding: '10px' }">
              <div slot="header" class="clearfix">
                <span>命名实体识别</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看帮助</el-button>
              </div>
              <el-table :data="tokens">
                <el-table-column prop="index" label="index">
                </el-table-column>
                <el-table-column prop="word" label="word">
                </el-table-column>
                <el-table-column prop="originalText" label="originalText">
                </el-table-column>
                <el-table-column prop="lemma" label="lemma">
                </el-table-column>
                <el-table-column prop="characterOffsetBegin" label="characterOffsetBegin">
                </el-table-column>
                <el-table-column prop="characterOffsetEnd" label="characterOffsetEnd">
                </el-table-column>
                <el-table-column prop="pos" label="pos">
                </el-table-column>
                <el-table-column prop="ner" label="ner">
                </el-table-column>
              </el-table>
            </el-card>
            <el-card
              style="margin-top:5px;padding:5px;" shadow="hover"
              :body-style="{ padding: '10px' }">
              <div slot="header" class="clearfix">
                <span>依存句法树</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看帮助</el-button>
              </div>
              <div v-for="tree in trees" :key="tree.id">{{ tree }}</div>
              <iframe
                id="bdIframe" ref="bdIframe"
                :src="reportUrl" frameborder="0"
                style="width: 80%;height:180px;"></iframe>
              <el-table :data="deps">
                <el-table-column prop="dep" label="dep">
                </el-table-column>
                <el-table-column prop="shortName" label="shortName">
                </el-table-column>
                <el-table-column prop="longName" label="longName">
                </el-table-column>
                <el-table-column prop="dep" label="dep">
                </el-table-column>
                <el-table-column prop="dependent" label="dependent">
                </el-table-column>
                <el-table-column prop="dependentGloss" label="dependentGloss">
                </el-table-column>
                <el-table-column prop="governor" label="governor">
                </el-table-column>
                <el-table-column prop="governorGloss" label="governorGloss">
                </el-table-column>
              </el-table>
            </el-card>
            <el-card
              style="margin-top:5px;padding:5px;" shadow="hover"
              :body-style="{ padding: '10px' }">
              <div slot="header" class="clearfix">
                <span>句子依赖图</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看帮助</el-button>
              </div>
              <div v-for="graph in graphs" :key="graph.id">{{ graph }}</div>
            </el-card>
            <el-card
              style="margin-top:5px;padding:5px;" shadow="hover"
              :body-style="{ padding: '10px' }">
              <div slot="header" class="clearfix">
                <span>问题类型分析</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看帮助</el-button>
              </div>
              <div>问题类型分类，针对不同问题进行决策</div>
            </el-card>
          </div>
        </el-collapse-item>
        <el-collapse-item title="问题答案" name="2">
          答案在此展示。
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { analysis } from '@/api/kbqa'

export default {
  name: 'Zhinengwenda',
  data() {
    return {
      reportUrl: './viewer/index.html',
      activeName: '2',
      text: '',
      tokens: [],
      trees: '',
      graphs: '',
      testData: {},
      deps: [],
      timer: {}
    }
  },
  mounted() {},
  methods: {
    onSubmit() {
      analysis(this.text).then(res => {
        console.log(res)
        this.testData = res.data
        this.deps = []
        this.tokens = []
        this.graphs = []
        for (let i = 0; i < this.testData.sentences.length; i++) {
          this.tokens = this.tokens.concat(this.testData.sentences[i].tokens)
          this.deps = this.deps.concat(
            this.testData.sentences[i].basicDependencies
          )
          this.graphs = this.graphs.concat(this.testData.sentences[i].kbqaStanfordGraphs)
        }
        document.getElementById('bdIframe').contentWindow.location.reload(true)
        this.timer = setInterval(this.loadView, 1000)
      })
    },
    loadView() {
      document.getElementById('bdIframe').contentWindow.test(this.testData)
      clearInterval(this.timer)
    },
    tree2json(tree) {
      const stack = new Array()
      let start = 0
      let content = true
      for (let i = 0; i < tree.length; i++) {
        if (this.isLeft(tree[i])) {
          start = i + 1
        }
        if (this.isRight(tree[i])) {
          if (!content) {
            console.log('出栈 ' + stack.pop())
          } else {
            console.log('出栈 ' + stack.pop() + tree.substring(start, i))
            content = false
          }
          start = i
        }
        if (this.isContent(tree[i])) {
          if (
            !this.isLeft(tree.substring(start, i)) &&
						!this.isRight(tree.substring(start, i))
          ) {
            console.log('入栈 ' + tree.substring(start, i))
            stack.push(tree.substring(start, i))
            content = true
          }
        }
      }
    },
    isLeft(s) {
      return s === '('
    },
    isRight(s) {
      return s === ')'
    },
    isContent(s) {
      return s === ' '
    }
  }
}
</script>

<style>
.el-tag {
	margin-right: 10px;
}
</style>
