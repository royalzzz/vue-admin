<template>
  <div style="padding:20px;">
    <el-tabs v-model="activeName">
      <el-tab-pane label="超参设置" name="first">
        <el-button type="primary" @click="dialogFormVisible = true">新建超参配置</el-button>
        <el-table :data="tableData" stripe style="width: 100%;margin-top:20px;">
          <el-table-column fixed prop="ID" label="编号" width="120"></el-table-column>
          <el-table-column prop="name" label="配置名" width="200"></el-table-column>
          <el-table-column prop="lr" label="学习率" width="120"></el-table-column>
          <el-table-column prop="epoch" label="迭代次数"></el-table-column>
          <el-table-column prop="batch" label="批量大小"></el-table-column>
          <el-table-column prop="window" label="窗口大小"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
              <el-button type="text" size="small"><i class="el-icon-delete"></i> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新建超参数配置" :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="配置名称">
              <el-input v-model="form.name" placeholder="用于记录本次超参设置"></el-input>
            </el-form-item>
            <el-form-item label="全局配置">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="学习率">
              <el-input v-model="form.name" placeholder="lr"></el-input>
            </el-form-item>
            <el-form-item label="迭代次数">
              <el-input v-model="form.name" placeholder="epoch"></el-input>
            </el-form-item>
            <el-form-item label="训练批次">
              <el-input v-model="form.name" placeholder="batch-size"></el-input>
            </el-form-item>
            <el-form-item label="可编辑">
              <el-radio-group v-model="form.resource">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注消息">
              <el-input v-model="form.desc" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="历史模型" name="second">
        <el-table :data="tableData2" border style="width: 100%;margin-top:20px;">
          <el-table-column fixed prop="ID" label="编号" width="120"></el-table-column>
          <el-table-column prop="name" label="配置名" width="200"></el-table-column>
          <el-table-column prop="train" label="训练集最高准确度"></el-table-column>
          <el-table-column prop="test" label="测试集最高准确度"></el-table-column>
          <el-table-column prop="val" label="验证集最高准确度"></el-table-column>
          <el-table-column prop="time" label="训练时长"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="模型测试" name="third">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="待测模型">
            <el-select placeholder="请选择待测模型">
              <el-option label="模型100001" value="shanghai"></el-option>
              <el-option label="模型100002" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测试数据">
            <el-input placeholder="Data"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">
              上传数据
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">开始测试</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="全局设置" name="fourth">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="模型">
            <el-select placeholder="请选择训练模型">
              <el-option label="模型100001" value="shanghai"></el-option>
              <el-option label="模型100002" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">设为全局模型</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Training',
  data() {
    return {
      activeName: 'first',
      dialogFormVisible: false,
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
      tableData: [{
        ID: '1',
        name: '2020第一次测试配置',
        lr: '0.001',
        epoch: 2000,
        batch: 2,
        window: 3
      }, {
        ID: '2',
        name: 'A算法',
        lr: '0.002',
        epoch: 50000,
        batch: 4,
        window: 3
      }, {
        ID: '3',
        name: 'B算法',
        lr: '0.001',
        epoch: 1000,
        batch: 2,
        window: 3
      }, {
        ID: '4',
        name: '超参设置',
        lr: '0.001',
        epoch: 100,
        batch: 2,
        window: 2
      }, {
        ID: '5',
        name: 'C算法',
        lr: '0.001',
        epoch: 2000,
        batch: 2,
        window: 3
      }, {
        ID: '6',
        name: '综合模型超参',
        lr: '0.001',
        epoch: 1000,
        batch: 2,
        window: 3
      }, {
        ID: '7',
        name: '正式上线前配置测试',
        lr: '0.001',
        epoch: 200,
        batch: 2,
        window: 3
      }, {
        ID: '8',
        name: '正式环境配置',
        lr: '0.001',
        epoch: 500,
        batch: 2,
        window: 3
      }],
      tableData2: [{
        ID: '1',
        name: '2020第一次测试配置',
        train: '98%',
        test: '83%',
        val: '48%',
        time: '2.5h'
      }, {
        ID: '2',
        name: 'H算法配置',
        train: '98%',
        test: '83%',
        val: '48%',
        time: '1.5h'
      }, {
        ID: '3',
        name: 'Test Config',
        train: '98%',
        test: '83%',
        val: '48%',
        time: '2.5h'
      }, {
        ID: '4',
        name: 'TextCNN',
        train: '98%',
        test: '76%',
        val: '35%',
        time: '4.5h'
      }, {
        ID: '5',
        name: 'RNN Attention',
        train: '98%',
        test: '89%',
        val: '63%',
        time: '2.5h'
      }, {
        ID: '6',
        name: '综合模型超参',
        train: '91%',
        test: '77%',
        val: '41%',
        time: '4.5h'
      }, {
        ID: '7',
        name: '正式上线前配置测试',
        train: '98%',
        test: '83%',
        val: '44%',
        time: '1h'
      }, {
        ID: '8',
        name: '正式环境配置',
        train: '99%',
        test: '87%',
        val: '68%',
        time: '2.5h'
      }]
    }
  }
}
</script>
