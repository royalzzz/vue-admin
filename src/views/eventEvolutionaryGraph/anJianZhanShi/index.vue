<template>
  <div style="padding:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input v-model="formInline.user" placeholder="关键字搜索" style="width: 1000px;"></el-input>
      <el-form-item>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          案件事理图谱展示
        </el-button>
      </el-form-item>
    </el-form>
    <el-card style="height:650px;" align="center">
      <img src="@/assets/eventEvolutionaryGraph/anjianshilitupu.png" width="80%" align="center">
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {}
    }
  }
}
</script>
