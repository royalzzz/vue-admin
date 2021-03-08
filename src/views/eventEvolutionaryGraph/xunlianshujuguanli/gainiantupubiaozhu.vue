<template>
  <div style="padding: 20px">
    <el-form ref="numberValidateForm" :model="biaozhunNodepair" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标准图节点">
        <el-select v-model="label" filterable :placeholder="biaozhunNodepair.label" @change="handleClick">
          <el-option
            v-for="item in nodes"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="标注内容"
        prop="biaozhutext"
        :rules="[{ required: true, message: '标注内容不能为空'}]">
        <el-input v-model.number="biaozhunNodepair.biaozhutext" type="textarea" :rows="2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPair()">提交</el-button>
        <el-button @click="resetPair()">重置刷新</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="records" border max-height="440px" style="width: 100%">
      <el-table-column property="id" label="ID" width="200"></el-table-column>
      <el-table-column property="biaozhutext" label="文本"></el-table-column>
      <el-table-column property="node" label="标准图节点" width="250"></el-table-column>
      <el-table-column property="nodeid" label="标准图节点Id" width="250"></el-table-column>
      <el-table-column width="70">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteNodeBiaozhuPairById(scope.row)">删除</el-button>
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
</template>

<!-- 输入一段文字，标记到概念图的节点上 -->
<script>
import * as treeApi from '@/api/tree'
export default {
  name: 'GainiantupubiaozhuVue',
  data() {
    return {
      loading: false,
      value: '',
      nodes: [],
      biaozhunNodepair: { biaozhutext: '', label: '请选择', id: 0 },
      records: [],
      page: {
        pageSize: 10,
        pageNumber: 0,
        total: 0
      }
    }
  },
  mounted() {
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
    getAllNode() {
      this.$store.dispatch('tree/findByLabelLike', '').then((result) => {
        var db_nodes = result
        this.nodes = db_nodes
        console.log(this.nodes)
      })
    },
    getRecords() {
      this.loading = true
      if (this.biaozhunNodepair.id === 0) {
        treeApi.findAllEventNodeBiaozhuPairPageable(this.page).then((result) => {
          this.records = result.data.content
          this.page.total = result.data.totalElements
          this.loading = false
        })
      } else {
        treeApi.findEventNodeBiaozhuPairbyNodeid(this.biaozhunNodepair.id).then((result) => {
          this.records = result.data
          this.loading = false
        })
      }
    },
    // findAllEventNodeBiaozhuPair() {
    //   treeApi.findAllEventNodeBiaozhuPair().then((result) => {
    //     this.records=result.data
    //   })
    // },
    handleClick(id) {
      this.biaozhunNodepair = this.nodes.find((item) => {
        return item.id === id
      })
      console.log(this.biaozhunNodepair)
      treeApi.findEventNodeBiaozhuPairbyNodeid(this.biaozhunNodepair.id).then((result) => {
        this.records = result.data
      })
    },
    submitPair() {
      if (this.biaozhunNodepair.id === 0 || this.biaozhunNodepair === '') {
        this.$message.warning('未选择标准图节点，不可提交')
      } else {
        console.log(this.biaozhunNodepair)
        treeApi.addEventNodeBiaozhuPair({ id: this.biaozhunNodepair.id, label: this.biaozhunNodepair.label, biaozhutext: this.biaozhunNodepair.biaozhutext }).then((result) => {
          this.loadData()
          if (result.code === 1) {
            this.$message({
              showClose: true,
              message: '提交成功',
              type: 'success'
            })
          } else { this.$message.error('出现了错误') }
        })
      }
    },
    resetPair() {
      this.biaozhunNodepair = { biaozhutext: '', label: '请选择', id: 0 }
      location.reload()
    },
    deleteNodeBiaozhuPairById(row) {
      console.log(row)
      treeApi.deleteNodeBiaozhuPairById(row.id).then((result) => {
        console.log(result)
        if (result.code === 1) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('出现了错误')
        }
        this.loadData()
      })
    },
    loadData() {
      this.getAllNode()
      this.getRecords()
    }
  }
}
</script>

<style scoped>

</style>
