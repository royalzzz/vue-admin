<template>
  <div style="padding: 20px;">
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="search.keyword" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success">
          <i class="el-icon-plus"></i>
          新增SDS
        </el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="cas" label="CAS" width="120"></el-table-column>
      <el-table-column prop="chineseName" label="中文名称" width="200"></el-table-column>
      <el-table-column prop="englishName" label="英文名称" width="220"></el-table-column>
      <el-table-column prop="mf" label="化学分子式" width="100"></el-table-column>
      <el-table-column prop="shape" label="性状"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small"><i class="el-icon-view"></i> 查看详细</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">
            <i
              class="el-icon-edit"></i> 编辑
          </el-button>
          <el-button type="text" size="small" style="color:red;">
            <i class="el-icon-delete"></i> 删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      :current-page="page.pageNumber + 1" :page-sizes="[10, 20, 30, 100]"
      :page-size="page.pageSize" background
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @next-click="nextPage" @prev-click="prevPage">
    </el-pagination>
  </div>
</template>

<script>
import { findByPage } from '@/api/kbqa'

export default {
  name: 'Sds',
  data() {
    return {
      search: {
        keyword: ''
      },
      tableData: [],
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
    onSubmit() {
      this.loadData()
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
      findByPage(this.page).then(res => {
        this.tableData = res.data.content
        this.page.total = res.data.totalElements
        // this.page.pageSize = res.data.pageable.pageSize;
        // this.page.pageNumber = res.data.pageable.pageNumber;
        this.loading = false
      })
    }
  }
}
</script>
