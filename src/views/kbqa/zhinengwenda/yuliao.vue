<template>
  <div style="padding:20px;">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-button type="success" @click="dialogVisible = true">新增问答语料</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="dialogVisible2 = true">自动生成问答语料</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">
          上传问答语料
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="ID" label="编号" width="120"></el-table-column>
      <el-table-column prop="question" label="问题"></el-table-column>
      <el-table-column prop="answer" label="答案"></el-table-column>
      <el-table-column prop="evidence" label="证据"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="录入问答语料" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="问题">
          <el-input v-model="form.name" placeholder="问题"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="form.name" placeholder="答案"></el-input>
        </el-form-item>
        <el-form-item label="证据">
          <el-input v-model="form.name" placeholder="证据"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="自动生成问答语料" :visible.sync="dialogVisible2" style="text-align:center;">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
      <div style="margin-top: 10px;">生成示例</div>
      <img src="@/assets/kbqa/youdu.png" alt="" width="200" style="margin-top: 10px;">
      <el-divider content-position="left">属性问题</el-divider>
      <div style="margin-top: 10px;">苯的颜色？——无色</div>
      <div style="margin-top: 10px;">苯的味道？——甜味</div>
      <div style="margin-top: 10px;">苯的化学式？——C6H6</div>
      <el-divider content-position="left">是非问题</el-divider>
      <div style="margin-top: 10px;">苯是白色的吗？——苯是无色的</div>
      <div style="margin-top: 10px;">苯有毒吗？——苯有毒性</div>
      <div style="margin-top: 10px;">苯是芳烃吗？——苯是一种芳烃</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Yuliao',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '是',
        desc: ''
      },
      dialogVisible: false,
      dialogVisible2: false,
      tableData: [{
        ID: '10001',
        question: '苯的外观与性状',
        answer: '无色透明液体，有强烈芳香味。',
        evidence: '来源于SDS数据库中苯的安全技术说明书中第九部分 理化特性外观与性状: 无色透明液体，有强烈芳香味。'
      }, {
        ID: '10002',
        question: '苯的熔点',
        answer: '熔点/凝固点(℃): 5.5',
        evidence: '来源于SDS数据库中苯的安全技术说明书中第九部分 理化特性 熔点/凝固点(℃): 5.5'
      }, {
        ID: '10003',
        question: '苯的溶解性',
        answer: '溶解性：不溶于水，溶于醇、醚、丙酮、等多数有机溶剂。',
        evidence: '来源于SDS数据库中苯的安全技术说明书中第九部分 理化特性 溶解性：不溶于水，溶于醇、醚、丙酮、等多数有机溶剂。'
      }, {
        ID: '10004',
        question: '苯的外观与性状',
        answer: '无色透明液体，有强烈芳香味。',
        evidence: '来源于SDS数据库中苯的安全技术说明书中第九部分 理化特性外观与性状: 无色透明液体，有强烈芳香味。'
      }, {
        ID: '10005',
        question: '吸入苯蒸气该如何处理',
        answer: '迅速脱离现场至空气新鲜处。保持呼吸道通畅。如呼吸困难，给输氧。呼吸、心跳停止，立即进行心肺复苏术。就医。',
        evidence: '"来源于SDS数据库中苯的安全技术说明书中第四部分 急救措施 吸 入：迅速脱离现场至空气新鲜处。保持呼吸道通畅。如呼吸困难，给输氧。呼吸、心跳停止，立即进行心肺复苏术。就医。"'
      }, {
        ID: '10006',
        question: '眼睛接触苯该如何处理',
        answer: '用水细心地冲洗数分钟。如戴隐形眼镜并可方便地取出，则取出隐形眼镜。继续冲洗。如果眼睛刺激持续：就医。',
        evidence: '"来源于SDS数据库中苯的安全技术说明书中第四部分 急救措施 眼睛接触：用水细心地冲洗数分钟。如戴隐形眼镜并可方便地取出，则取出隐形眼镜。继续冲洗。如果眼睛刺激持续：就医。"'
      }, {
        ID: '10007',
        question: '苯的消防措施',
        answer: '采用泡沫、干粉、二氧化碳、砂土灭火。',
        evidence: '"来源于SDS数据库中苯的安全技术说明书中第五部分 消防措施 灭火方法和灭火剂：从上风向进入火场,喷水冷却容器，可能的话将容器从火场移至空旷处。如有液体流淌时，应筑堤拦截漂散流淌的易燃液体或挖沟导流。采用泡沫、干粉、二氧化碳、砂土灭火。"'
      }, {
        ID: '10008',
        question: '苯泄漏的应急处理',
        answer: '"小量泄漏：用砂土或其它不燃材料吸收。使用洁净的无火花工具收集吸收材料。大量泄漏：构筑围堤或挖坑收容。用泡沫覆盖，减少蒸发。喷水雾能减少蒸发，但不能降低泄漏物在受限制空间内的易燃性。用防爆泵转移至槽车或专用收集器内。"',
        evidence: '"来源于SDS数据库中苯的安全技术说明书中第六部分 泄漏应急处理 小量泄漏：用砂土或其它不燃材料吸收。使用洁净的无火花工具收集吸收材料。大量泄漏：构筑围堤或挖坑收容。用泡沫覆盖，减少蒸发。喷水雾能减少蒸发，但不能降低泄漏物在受限制空间内的易燃性。用防爆泵转移至槽车或专用收集器内。"'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>
.el-tag {
  margin-right: 10px;
}
</style>
