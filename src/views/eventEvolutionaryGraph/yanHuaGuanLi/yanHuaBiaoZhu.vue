<template>
  <div style="padding: 20px">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="always" style="height: 650px">
          <el-button type="text" @click="table = true">选择事故报告</el-button>
          <el-button type="text" @click="showTags = true">查看标注记录</el-button>
          <br/><br/>

          <el-drawer
            title="选择事故报告"
            :visible.sync="table"
            direction="rtl"
            size="50%"
            style="height: auto; overflow-x: auto"
          >
            <el-table :data="accidentreport">
              <el-table-column
                property="id"
                label="id"
                width="150"
              ></el-table-column>
              <el-table-column
                property="title"
                label="事故标题"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleClick(scope.row)"
                  >选择
                  </el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-drawer>
          <div style="height: 580px; overflow: auto">
            <el-input
              v-model="textarea"
              type="textarea"
              :rows="25"
              :placeholder="textarea"
            >
            </el-input>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" style="height: 650px">
          <div style="height: 600px; overflow: auto">
            <span> 选中事件为： </span><br/>
            <el-button
              type="warning"
              plain
              size="small"
              style="margin-top: 10px; margin-left: 10px"
              @click="findByLabelLike"
            >{{ selectionText }}
            </el-button
            >
            <br/><br/>

            <span> 当前事件推荐的标注节点： </span><br/>
            <el-button
              v-for="(item, i) in keyNodes"
              :key="i"
              type="success"
              plain
              size="small"
              style="margin-top: 10px; margin-left: 10px"
              @click="addBiaozhuPair"
            >{{ item.label }}
            </el-button
            >
            <br/><br/>
            <span>标准图全部节点：</span><br/><br/>
            <div>
              <el-button
                v-for="(item, i) in Nodes"
                :key="i"
                type="primary"
                plain
                size="small"
                style="margin-top: 10px; margin-left: 10px"
                @click="addBiaozhuPair"
              >{{ item.label }}
              </el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="该事故报告的标注记录" :visible.sync="showTags">
      <el-table :data="gridData">
        <el-table-column property="id" label="ID" width="50"></el-table-column>
        <el-table-column property="anli" label="事件"></el-table-column>
        <el-table-column property="biaozhun" label="标准事件" width="250"></el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteById(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import vis from "vis";
import * as treeApi from '@/api/tree';

export default {
  name: "",
  data() {
    return {
      // 标记事件
      selectionText: "请在右侧选择报告并选中文本",
      selectionStart: 0,
      selectionEnd: 0,
      //
      select: "",
      sourceid: 0,
      Nodes: [],
      keyNodes: [],
      redirect: undefined,
      otherQuery: {},
      textarea: "",
      table: false,
      showTags: false,
      loading: false,
      accidentreport: [
        {
          id: "2016-05-04",
          title: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      gridData: [],
      timer: null,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
    keyNodes: {
      handler: function (keyNodes) {
      },
      immediate: true,
    },
    textarea: {
      handler: function (textarea) {
        // console.log(textarea);
      },
      immediate: true,
    },
  },
  created() {
    this.getAllNode();
    this.getAccidentReport();
  },
  mounted() {
    window.addEventListener("click", this.selecttext);
  },
  methods: {
    handleCreate() {
      // console.log('handleCreate!')
    },
    getTree() {
      this.$store.dispatch("tree/getBiaozhuTree").then((result) => {
        // console.log(result)
        var nodes = new vis.DataSet(result.db_nodes);
        var edges = new vis.DataSet(result.db_edges);
        var container = document.getElementById("mynetwork");
        var data = {
          nodes: nodes,
          edges: edges,
        };
        var options = {};
        // var network = new vis.Network(container, data, options)
        vis.Network(container, data, options);
      });
    },
    findByLabelLike(data) {
      // console.log(data.label);
      this.select = this.selectionText;
      this.$store
        .dispatch("tree/findByLabelLike", this.selectionText)
        .then((result) => {
          var db_nodes = result;
          this.keyNodes = db_nodes;
        });

    },
    //
    addBiaozhuPair(event) {
      // console.log(this.select)
      // console.log(event.target.innerText)

      this.$alert(
        this.select + "&&" + event.target.innerText,
        "是否提交标注",
        {
          confirmButtonText: "提交",
          callback: (action) => {
            // console.log(action)
            if (action === "confirm") {
              this.$store
                .dispatch("tree/addBiaozhuPair", {
                  anli: this.select,
                  biaozhun: event.target.innerText,
                  source: 1,    //0代表案例树
                  sourceid: this.sourceid
                })
                .then((result) => {
                  var db_nodes = result;
                  this.keyNodes = db_nodes;
                });
            }
          },
        }
      );
    },
    getAllNode() {
      this.$store.dispatch("tree/findByLabelLike", "").then((result) => {
        var db_nodes = result;
        this.Nodes = db_nodes;
      });
    },
    getAccidentReport() {
      this.$store.dispatch("tree/getAccidentReport").then((result) => {
        var db_AccidentReport = result;
        this.accidentreport = db_AccidentReport;
      });
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch((_) => {
        });
    },
    handleClick(row) {
      // console.log(row.data);
      this.table = false;
      this.textarea = row.content;
      this.sourceid = row.id;
      treeApi.findBiaozhuPairBySourceid({source: 1, sourceid: this.sourceid}).then(result => {
        console.log(result.data);
        this.gridData = result.data
      })
    },
    selecttext() {
      const selectionText = document.getSelection().toString();
      if (
        selectionText.length > 0
        // &&this.accidentReport.content.indexOf(selectionText) >= 0
      ) {
        this.selectionText = selectionText;
        this.selectionStart = document.getSelection().anchorOffset;
        this.selectionEnd = document.getSelection().focusOffset;
        if (this.selectionEnd < this.selectionStart) {
          const tmp = this.selectionEnd;
          this.selectionEnd = this.selectionStart;
          this.selectionStart = tmp;
        }
      } else {
        (this.selectionText = "请在右侧选择报告并选中文本"),
          (this.selectionStart = 0);
        this.selectionEnd = 0;
      }
      // console.log(selectionText);
    },
    deleteById(row) {
      // console.log("asdasfsdfjkbsdbsdhjb", row.id);

      this.$confirm('此操作将删除该标注, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '不删除',
        type: 'warning'
      }).then(() => {
        treeApi.deletePairById(row.id).then(res=>{
          treeApi.findBiaozhuPairBySourceid({source: 0, sourceid: this.sourceid}).then(result => {
            console.log(result.data);
            this.gridData = result.data
          });
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style>
.el-tree-node__content:hover {
  background: rgba(255, 255, 255, 0.589);
}

.el-tree {
  background: #84878a;

  color: #050505;
}

.el-tree-node__content {
  height: 50px;
  background-color: rgb(255, 255, 255);
}

.el-drawer.rtl {
  overflow: scroll;
}
</style>
