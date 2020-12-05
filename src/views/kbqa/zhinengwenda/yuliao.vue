<template>
	<div style="padding: 20px">
		<h2>问题类型与意图标注</h2>
		<div>
			<el-tag effect="dark">问题总数：{{tagInformation.numberOfQuestions}}</el-tag>
			<el-tag type="success" effect="dark">问题类型：{{tagInformation.numberOfQuestionTypes}}</el-tag>
			<el-tag type="info" effect="dark">问题意图：{{tagInformation.numberOfQuestionIntent}}</el-tag>
			<el-tag type="warning" effect="dark">类型标注：{{tagInformation.numberOfQuestionTypeTag}}</el-tag>
			<el-tag type="danger" effect="dark">意图标注：{{tagInformation.numberOfQuestionIntentTag}}</el-tag>
		</div>
		<el-alert title="请注意问题的提示，避免重复的问题文本！" type="info" show-icon
			style="margin-top: 20px;width: 560px;">
		</el-alert>
		<el-divider></el-divider>

		<el-form label-width="80px" size="large">
			<el-form-item label="问题文本">
				<el-autocomplete v-model="question" :fetch-suggestions="querySearchAsync"
					placeholder="请输入问题" style="width: 480px;"></el-autocomplete>
			</el-form-item>

			<el-form-item label="问题类型">
				<el-select multiple v-model="questionType" placeholder="请选择问题类型" style="width: 480px;">
					<el-option v-for="item in questionTypes" :key="item.id" :label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="问题意图">
				<el-select filterable multiple v-model="questionIntent" placeholder="请选择问题意图"
					style="width: 480px;">
					<el-option v-for="item in questionIntents" :key="item.id" :label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" round style="width: 480px;" @click="onSubmit" v-loading="loading">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import {
	findAllQuestionTypes,
	tagInformation,
  findAllQuestionIntents,
  findByTextLike,
  tagQuestion
} from "@/api/kbqa";

export default {
	name: "Yuliao",
	data() {
		return {
			tagInformation: {
				numberOfQuestions: 0,
				numberOfQuestionTypes: 0,
				numberOfQuestionIntent: 0,
				numberOfQuestionTypeTag: 0,
				numberOfQuestionIntentTag: 0,
			},
			question: "",
			questionType: [],
			questionTypes: [],
			questionIntent: [],
      questionIntents: [],
      loading: false
		};
	},
	methods: {
		onSubmit() {
      this.loading = true;
      let tagData = {
        text: this.question,
        questionTypes: this.questionType,
        questionIntents: this.questionIntent
      };
      console.log(tagData);
			tagQuestion(tagData).then(res => {
        this.loadBasicData();
        this.question = '';
        this.questionType = [];
        this.questionIntent = [];
        this.loading = false;
        const h = this.$createElement;

        this.$notify({
          title: '标记成功',
          message: h('i', { style: 'color: teal'}, '问题和标注信息已保存！')
        });
      });
    },
    querySearchAsync(queryString, cb) {
      if (queryString !== '') {
        findByTextLike(queryString).then(res => {
          let keywords = [];
          res.data.forEach(function(item) {
            let obj = {};
            obj.value = item.text;
            obj.id = item.id;
            keywords.push(obj);
          });
          cb(keywords);
        });
      }
		},
		loadBasicData() {
			findAllQuestionTypes().then((res) => {
				this.questionTypes = res.data;
			});
			findAllQuestionIntents().then((res) => {
				this.questionIntents = res.data;
			});
			tagInformation().then((res) => {
				this.tagInformation = res.data;
			});
		},
	},
	mounted() {
		this.loadBasicData();
	},
};
</script>

<style>
.el-tag {
	margin-right: 10px;
}
</style>
