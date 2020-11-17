<template>
  <div style="padding: 20px">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input
        v-model="formInline.user"
        placeholder="关键字搜索"
        style="width: 850px"
      ></el-input>
      <el-form-item>
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-edit"
          @click="handleCreate"
        >
          事件防护措施搜索
        </el-button>
        <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
          事故报告下载
        </el-button> -->
      </el-form-item>
    </el-form>
    <el-row :gutter="12">
      <el-col :span="17">
        <el-card shadow="always">
          <img
            src="@/assets/eventEvolutionaryGraph/fanghucuoshi.png"
            width="100%"
          >
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="hover">
          <el-table :data="tableData" width="100" margin-top="10px">
            <el-table-column prop="date" label="属性名" width="80"/>
            <el-table-column prop="name" label="属性值"/>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [
        {
          date: '节点',
          name: '1.甲苯在流入重氮化前储罐的同时也流入了废甲苯储罐'
        },
        {
          date: '对应节点',
          name: '容器内液态物料泄漏'
        },
        {
          date: '对应物质',
          name: '甲苯'
        },
        {
          date: '应急场景',
          name: '泄漏'
        },
        {
          date: '处置措施',
          name:
            '消除所有点火源。根据液体流动和蒸气扩散的影响区域划定警戒区，无关人员从侧风、上风向撤离至安全区。建议应急处理人员戴正压自给式呼吸器，穿防毒、防静电服。作业时使用的所有设备应接地。禁止接触或跨越泄漏物。尽可能切断泄漏源。防止泄漏物进入水体、下水道、地下室或密闭性空间。小量泄漏：用砂土或其它不燃材料吸收。使用洁净的无火花工具收集吸收材料。大量泄漏：构筑围堤或挖坑收容。用飞尘或石灰粉吸收大量液体。用泡沫覆盖，减少蒸发。喷水雾能减少蒸发，但不能降低泄漏物在受限制空间内的易燃性。用防爆泵转移至槽车或专用收集器内。'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

