<template>
  <div style="padding: 20px; text-align: center">
    <div>
      <img src="@/assets/kbqa/qa.png" style="width: 100px">
    </div>

    <el-input
      v-model="text"
      size="large"
      placeholder="请输入问题..."
      @keyup.enter.native="onSubmit"
      style="width: 70%; position: sticky">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="onSubmit"></el-button>
    </el-input>

    <!-- <el-divider content-position="left"><i class="el-icon-chat-dot-round"></i></el-divider> -->
    <div style="width:100%;" id="div_width"></div>

    <div id="container_stanford" style="text-align: left; padding-top: 100px" v-show="resShow">
      <el-card style="margin-top: 20px">
        <h2 style="color: SteelBlue;">问题答案</h2>
      </el-card>
      <el-card style="margin-top: 20px">
        <h2 style="color: gray;">问题解析</h2>
        <div v-if="tokens.length != 0">
          <h4 style="color:LightSlateGray">命名实体识别</h4>
          <el-table :data="tokens" stripe border>
            <el-table-column prop="index" label="index"> </el-table-column>
            <el-table-column prop="word" label="word"> </el-table-column>
            <el-table-column prop="originalText" label="originalText">
            </el-table-column>
            <el-table-column prop="lemma" label="lemma"> </el-table-column>
            <el-table-column
              prop="characterOffsetBegin"
              label="characterOffsetBegin">
            </el-table-column>
            <el-table-column
              prop="characterOffsetEnd"
              label="characterOffsetEnd">
            </el-table-column>
            <el-table-column prop="pos" label="pos"> </el-table-column>
            <el-table-column prop="ner" label="ner"> </el-table-column>
          </el-table>
        </div>

        <div v-show="deps.length != 0">
          <h4 style="color:LightSlateGray">依存句法分析</h4>
          <div 
            element-loading-background="rgba(235, 235, 235, 0.5)"
            element-loading-text="正在加载中"
            v-loading="loading">
            <iframe
              id="bdIframe"
              ref="bdIframe"
              :src="reportUrl"
              frameborder="0"
              style="width: 100%;"></iframe>
          </div>
          <el-table :data="deps" stripe border>
            <el-table-column prop="dep" label="dep"> </el-table-column>
            <el-table-column prop="shortName" label="shortName">
            </el-table-column>
            <el-table-column prop="longName" label="longName"> </el-table-column>
            <el-table-column prop="dep" label="dep"> </el-table-column>
            <el-table-column prop="dependent" label="dependent">
            </el-table-column>
            <el-table-column prop="dependentGloss" label="dependentGloss">
            </el-table-column>
            <el-table-column prop="governor" label="governor"> </el-table-column>
            <el-table-column prop="governorGloss" label="governorGloss">
            </el-table-column>
          </el-table>
        </div>
        
        <div v-show="graphs.length != 0">
          <h4 style="color:LightSlateGray">句子依赖图</h4>
          <div id="mountNode"></div>
          <div v-for="graph in graphs" :key="graph.id">{{ graph }}</div>
        </div>

        <div>
          <h4 style="color:LightSlateGray">问题类型分析</h4>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { analysis } from '@/api/kbqa'
import G6 from '@antv/g6'
// import '@antv/g6/lib/plugins/tooltip'

export default {
  name: 'Zhinengwenda',
  data() {
    return {
      resShow: false,
      loading: true,
      reportUrl: './viewer/index.html',
      text: '',
      tokens: [],
      trees: '',
      graphs: '',
      testData: {},
      deps: [],
      timer: {},
      depGraph: {},
      tooltip: {}
    }
  },
  mounted() {
    const self = this
    window["loadViewDone"] = () => {
      self.loading = false
    }
    // this.tooltip = new G6.Plugins['tool.tooltip']()
    this.depGraph = new G6.Graph({
      container: 'mountNode',
      width: document.getElementById('div_width').offsetWidth,
      height: 300,
      defaultNode: {
        size: 0,
        style: {
          fill: 'Azure',
          stroke: 'LightSteelBlue'
        }
      }
      // plugins: [ this.tooltip ]
    })
  },
  methods: {
    onSubmit() {
      console.log('width=' + document.getElementById('div_width').offsetWidth)
      this.loading = true
      analysis(this.text).then((res) => {
        this.resShow = true
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
          this.graphs = this.graphs.concat(
            this.testData.sentences[i].kbqaStanfordGraphs
          )
        }
        document.getElementById('bdIframe').contentWindow.location.reload(true)
        this.timer = setInterval(this.loadView, 1000)
      })
    },
    loadView() {
      document.getElementById('bdIframe').contentWindow.test(this.testData)
      clearInterval(this.timer)
      const nodes = []
      const edges = []
      for (let i = 0; i < this.graphs.length; i++) {
        console.log(this.graphs[i])
        const gs = this.graphs[i].split('->')
        console.log(gs)
        for (let j = 0; j < gs.length; j++) {
          if (gs[j] !== '') {
            console.log(gs[j])

            const text = gs[j].split('/')[0]
            const ner = gs[j].split('/')[1]

            console.log(text, ner)
            const node = {
              id: '' + i + j,
              label: text,
              // shape: 'rect',
              pos: ner.split('(')[0],
              dep: ner.split('(')[1].substring(0, ner.split('(')[1].length - 1)
            }
            nodes.push(node)

            if (j !== 0) {
              const edge = {
                id: 'edge' + i + j,
                target: '' + i + j,
                source: '' + i + (j - 1)
              }
              edges.push(edge)
            }
          }
        }
      }
      const data = {
        nodes: nodes,
        edges: edges
      }
      console.log(data)
      // this.depGraph.read(data)
      // this.depGraph.node({
      //   tooltip(model) {
      //     return '<span>ID:' + model.id + '[' + model.pos + '] [' + model.dep + ']</span>'
      //   }
      // })
      this.depGraph.data(data)
      
      this.depGraph.render()
      this.depGraph.fitView()
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
