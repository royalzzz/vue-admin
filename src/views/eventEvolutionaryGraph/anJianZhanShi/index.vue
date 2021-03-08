<template>
  <div style="padding:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input v-model="formInline.user" placeholder="关键字搜索" style="width: 1000px;"></el-input>
      <el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          案例树搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="anlishu" max-height="560px" style="width: 100%">
      <el-table-column
        fixed
        prop="_id"
        label="Id"
        width="100">
      </el-table-column>
      <el-table-column
        prop="_events"
        label="内容"
        width="1000">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
<<<<<<< HEAD
            size="small"><i class="el-icon-view"></i>
            查看详细
=======
            size="small"
            @click="detail(scope.row);showTree = true">
            查看
>>>>>>> 7f780a4e7deaa97a58f0163477c4ec32482575ed
          </el-button>
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

    <el-drawer
      title="查看案例树" :visible.sync="showTree"
      direction="rtl" size="50%"
      style="height: auto; overflow-x: auto">
      <el-tree :visible.sync="showTree" :data="tftTree" default-expand-all :expand-on-click-node="false"></el-tree>
    </el-drawer>
  </div>
</template>

<script>
import { getEventTftPageable } from '@/api/tree'

export default {
  data() {
    return {
      formInline: {},
      anlishu: [],
      tftTree: [],
      showTree: false,
      page: {
        pageSize: 10,
        pageNumber: 0,
        total: 0
      },
      loading: false
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    detail(row) {
      console.log(row)
      this.tftTree = [JSON.parse(row._data)]
      console.log(this.tftTree)
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
    loadData() {
      this.loading = true
      getEventTftPageable(this.page).then((result) => {
        console.log(result)
        this.page.total = result.data.totalElements
        this.anlishu = result.data.content
        this.loading = false
      })
    }
  }
}
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
