<template>
  <div style="padding: 20px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input
        v-model="formInline.user"
        placeholder="关键字搜索"
        style="width: 1000px"
      ></el-input>
      <el-form-item>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
        >
          概念事理图谱展示
        </el-button>
      </el-form-item>
    </el-form>
    <el-card style="height: 800px">
      <TreeGraph :json-data="jsonData" />
    </el-card>
  </div>
</template>

<script>
import TreeGraph from '@/components/Graph/TreeGraph'

export default {
  components: { TreeGraph },
  data() {
    return {
      jsonData: {
        test: 'hahaha'
      },
      formInline: {},
      graph: null
    }
  },
  mounted() {

  }
}
</script>
