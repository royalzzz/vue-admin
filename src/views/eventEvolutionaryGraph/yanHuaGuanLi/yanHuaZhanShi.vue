
<template>
  <div style="padding:20px;">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="概念选择">
        <el-select v-model="form.region" placeholder="请选择录入实体的概念">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="实体属性">
        <el-row>
          <el-col :span="8">
            <el-input v-model="form.name" placeholder="属性名" />
          </el-col>
          <el-col :span="1" style="text-align:center;">:</el-col>
          <el-col :span="8">
            <el-input v-model="form.name" placeholder="属性值" />
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="8">
            <el-input v-model="form.name" placeholder="属性名" />
          </el-col>
          <el-col :span="1" style="text-align:center;">:</el-col>
          <el-col :span="8">
            <el-input v-model="form.name" placeholder="属性值" />
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-button type="success" icon="el-icon-plus">添加属性</el-button>
        </el-row>
      </el-form-item>
      <el-form-item label="是否覆盖">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="存储设置">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="自动生成ID" name="type" />
          <el-checkbox label="新属性增加" name="type" />
          <el-checkbox label="遇到错误停止" name="type" />
          <el-checkbox label="默认展示字段" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="实体关系">
        <el-radio-group v-model="form.resource">
          <el-radio label="有" />
          <el-radio label="无" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关联关系">
        <el-row>
          <el-col :span="5">
            <el-select v-model="form.region" placeholder="请选择录入实体的概念">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-col>

          <el-col :span="5">
            <el-select v-model="form.region" placeholder="请选择实体">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-col>

          <el-col :span="5">
            <el-input v-model="form.name" placeholder="关系名" />
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="5">
            <el-select v-model="form.region" placeholder="请选择录入实体的概念">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-col>

          <el-col :span="5">
            <el-select v-model="form.region" placeholder="请选择实体">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-col>

          <el-col :span="5">
            <el-input v-model="form.name" placeholder="关系名" />
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-button type="success" icon="el-icon-plus">添加关系</el-button>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Zhishikuadd',
  data() {
    return {
      form: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
