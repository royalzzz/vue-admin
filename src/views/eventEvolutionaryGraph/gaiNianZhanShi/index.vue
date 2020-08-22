<template>
  <div style="padding:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input v-model="formInline.user" placeholder="关键字搜索" style="width: 1000px;"></el-input>
      <el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          概念事理图谱展示
        </el-button>
      </el-form-item>
    </el-form>
    <el-card style="height:800px;">
      <img src="@/assets/eventEvolutionaryGraph/标准事故树事理图谱.png" width="100%">
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
      }
    }
  }
}
</script>
