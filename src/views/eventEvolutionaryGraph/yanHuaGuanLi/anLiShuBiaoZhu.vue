<template>
  <div style="padding: 20px">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="always" style="height: 650px">
          <el-button type="text" @click="table = true">选择案例树</el-button
          ><br /><br />
          <el-drawer
            title="选择案例树"
            :visible.sync="table"
            direction="rtl"
            size="50%"
            style="height: auto; overflow-x: auto"
          >
            <el-table :data="eventtft">
              <el-table-column
                property="_id"
                label="id"
                width="100"
              ></el-table-column>
              <el-table-column property="_events" label="案例内容">
                <template slot-scope="scope">
                  <el-tooltip :content="scope.row._events" placement="left">
                    <p class="_events_sty">{{ scope.row._events }}</p>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleClick(scope.row)"
                    >选择</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-drawer>
          <div style="height: 580px; overflow: auto">
            <el-tree
              :data="testdata"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="findByLabelLike"
            ></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always" style="height: 650px">
          <div style="height: 600px; overflow: auto">
            <span> 当前事件推荐的标注节点： </span><br />
            <div>
              <el-button
                v-for="(item, i) in keyNodes"
                :key="i"
                type="success"
                plain
                size="small"
                style="margin-top: 10px; margin-left: 10px"
                @click="addBiaozhuPair"
                >{{ item.label }}</el-button
              ><br />
            </div>
            <br />
            <span>标准图全部节点：</span><br />
            <div>
              <el-button
                v-for="(item, i) in Nodes"
                :key="i"
                type="primary"
                plain
                size="small"
                style="margin-top: 10px; margin-left: 10px"
                @click="addBiaozhuPair"
                >{{ item.label }}</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vis from "vis";

export default {
  name: "",
  data() {
    return {
      select: "",
      Nodes: [],
      keyNodes: [],
      redirect: undefined,
      otherQuery: {},
      testdata: [
        {
          andor: "undefined",
          children: [
            {
              andor: "and",
              children: [
                {
                  andor: "and",
                  children: [
                    {
                      andor: "",
                      children: [],
                      gradeId: "",
                      label: "罐内碱渣上面浮着一层汽油，汽油挥发",
                    },
                    { andor: "", children: [], gradeId: "", label: "空气" },
                  ],
                  gradeId: "IA7",
                  label: "A7$罐内气体达到爆炸极限",
                },
                {
                  andor: "and",
                  children: [
                    {
                      andor: "undefined",
                      children: [
                        {
                          andor: "and",
                          children: [
                            {
                              andor: "undefined",
                              children: [
                                {
                                  andor: "",
                                  children: [],
                                  gradeId: "",
                                  label: "开泵之前管内充满汽油",
                                },
                              ],
                              gradeId: "",
                              label: "装渣时需用碱渣将汽油顶出",
                            },
                            {
                              andor: "",
                              children: [],
                              gradeId: "",
                              label: "碱渣进口设在罐上部",
                            },
                          ],
                          gradeId: "Ic1",
                          label: "c1$汽油从罐上部喷洒下落，油品剧烈喷溅",
                        },
                      ],
                      gradeId: "",
                      label: "静电产生",
                    },
                    {
                      andor: "undefined",
                      children: [
                        {
                          andor: "undefined",
                          children: [
                            {
                              andor: "",
                              children: [],
                              gradeId: "",
                              label:
                                "油、水、碱渣等混合物在冲击下，产生大量泡沫",
                            },
                          ],
                          gradeId: "",
                          label: "泡沫及其他浮游物收集静电",
                        },
                      ],
                      gradeId: "",
                      label: "静电积聚",
                    },
                    {
                      andor: "undefined",
                      children: [
                        { andor: "", children: [], gradeId: "", label: "罐壁" },
                      ],
                      gradeId: "",
                      label: "放电部位",
                    },
                  ],
                  gradeId: "Ic",
                  label: "c$静电火花",
                },
              ],
              gradeId: "",
              label: "碱渣罐爆炸",
            },
          ],
          gradeId: "",
          label: "1977年某炼厂碱渣罐爆炸事故P37",
        },
      ],
      sourceid: 0,
      table: false,
      loading: false,
      eventtft: [
        {
          _id: "2016-05-04",
          _events: "上海市普陀区金沙江路 1518 弄",
        },
        {
          _id: "2016-05-04",
          _events: "上海市普陀区金沙江路 1518 弄",
        },
        {
          _id: "2016-05-04",
          _events: "上海市普陀区金沙江路 1518 弄",
        },
      ],
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
      handler: function (keyNodes) {},
      immediate: true,
    },
    textarea: {
      handler: function (textarea) {
        // console.log(textarea)
      },
      immediate: true,
    },
  },
  created() {
    this.getAllNode();
    this.getEventTft();
  },
  methods: {
    handleCreate() {
      //   console.log('handleCreate!')
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
      //   console.log(data.label)
      this.select = data.label;
      this.$store
        .dispatch("tree/findByLabelLike", data.label)
        .then((result) => {
          var db_nodes = result;
          this.keyNodes = db_nodes;
        });
    },
    //
    addBiaozhuPair(event) {
      //   console.log(this.select)
      //   console.log(event.target.innerText)

      this.$alert(
        this.select + "*****" + event.target.innerText,
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
                  source: 0,    //0代表案例树
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
    getEventTft() {
      this.$store.dispatch("tree/getEventTft").then((result) => {
        var db_EventTft = result;
        this.eventtft = db_EventTft;
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
        .catch((_) => {});
    },
    handleClick(row) {
      this.testdata = JSON.parse("[" + row._data + "]");
      this.table = false;
      this.sourceid = row._id;
      //   console.log(this.testdata)
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
._events_sty {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
.el-tooltip__popper {
  max-width: 600px;
  line-height: 180%;
}
</style>
