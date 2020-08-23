<template>
  <div style="padding:20px;">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <el-row :gutter="20">
            <div style="height:400px;border-radius:3px;padding:20px;overflow:auto">
              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url" />
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">库库智能机器人</div>
                    <div>请问有什么可以帮到您？</div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <div style="height:40px;"></div>
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">您</div>
                    <div>苯是什么？</div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url2" />
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url" />
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">库库智能机器人</div>
                    <div>苯（Benzene，C₆H₆）一种碳氢化合物即最简单的芳烃，在常温下是甜味、可燃、有致癌毒性的无色透明液体，并带有强烈的芳香气味。</div>
                    <div style="margin-top:5px;"><el-link @click="dialogVisible = true"> >>推理依据 </el-link></div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <div style="height:40px;"></div>
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">您</div>
                    <div>苯有毒吗？</div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url2" />
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url" />
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">库库智能机器人</div>
                    <div>苯具有毒性。</div>
                    <div style="margin-top:5px;"><el-link @click="dialogVisible2 = true"> >>推理依据 </el-link></div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <div style="height:40px;"></div>
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">您</div>
                    <div>人体吸入苯有什么危害</div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url2" />
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url" />
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">库库智能机器人</div>
                    <div>由于苯的挥发性大，暴露于空气中很容易扩散。人和动物吸入或皮肤接触大量苯进入体内，会引起急性和慢性苯中毒。</div>
                    <div style="margin-top:5px;"><el-link> >>推理依据 </el-link></div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <div style="height:40px;"></div>
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">您</div>
                    <div>苯用来做什么？</div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url2" />
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url" />
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">库库智能机器人</div>
                    <div>苯经取代反应、加成反应、氧化反应等生成的一系列化合物可以作为制取塑料、橡胶、纤维、染料、去污剂、杀虫剂等的原料。大约10%的苯用于制造苯系中间体的基本原料。</div>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <div style="height:40px;"></div>
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">您</div>
                    <div>具有致癌性的化学品有哪些？</div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url2" />
                </el-col>
              </el-row>

              <el-row :gutter="20" style="margin-bottom: 20px;">
                <el-col :span="2">
                  <el-avatar shape="square" :size="40" :fit="fit" :src="url" />
                </el-col>
                <el-col :span="20">
                  <div style="background:whitesmoke;padding:10px;border-radius:3px;">
                    <div style="font-size:8pt;color:grey;margin-bottom:5px;">库库智能机器人</div>
                    <div>甲醇、甲醛、氟气、氢氟酸、钋、钚...</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-row>
          <el-row :gutter="20" style="margin-top:10px;">
            <el-input v-model="textarea" placeholder="请输入您的问题" :rows="3" type="textarea" />
          </el-row>
          <el-row style="float:right;margin-top:10px;margin-bottom:10px;">
            <el-button type="primary" plain>发送</el-button>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card-component" style="margin-left:8px;">
          <div slot="header" class="box-card-header">
            <el-image shape="square" :size="100" :fit="fit" :src="url" />
          </div>
          <div style="position:relative;">
            <div>
              <el-tag>危化品</el-tag>
              <el-tag type="success">理化性质</el-tag>
              <el-tag type="info">防护</el-tag>
              <el-tag type="warning">应急</el-tag>
              <el-tag type="danger">危险性</el-tag>
            </div>
            <div style="margin-top:20px;">
              <span>危化品知识</span>
              <el-progress :percentage="70" />
            </div>
            <div class="progress-item">
              <span>危险性知识</span>
              <el-progress :percentage="58" />
            </div>
            <div class="progress-item">
              <span>防护知识</span>
              <el-progress :percentage="42" />
            </div>
            <div class="progress-item">
              <span>应急处理</span>
              <el-progress :percentage="30" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="推理依据" :visible.sync="dialogVisible">
      <div style="width:100%;text-align:center;"><img src="@/assets/kbqa/ben.png" alt=""></div>
      <div style="margin-top:10px;">苯（Benzene，C₆H₆）一种碳氢化合物即最简单的芳烃，在常温下是甜味、可燃、有致癌毒性的无色透明液体，并带有强烈的芳香气味。</div>
    </el-dialog>
    <el-dialog title="推理依据" :visible.sync="dialogVisible2">
      <div style="width:100%;text-align:center;"><img src="@/assets/kbqa/youdu.png" alt=""></div>
      <div style="margin-top:10px;">苯（Benzene，C₆H₆）- 毒性 => 有毒。</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Zhinengwenda',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      dialogVisible: false,
      dialogVisible2: false,
      textarea: '',
      url: 'https://pic4.zhimg.com/v2-9b1be1d9c2ffc173297fa7562ccb0b12_1200x500.jpg',
      url2: 'http://www.shejiye.com/uploadfile/icon/2017/0203/shejiyeicondc4fz0bubgs.png',
      fit: 'scale-down'
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
