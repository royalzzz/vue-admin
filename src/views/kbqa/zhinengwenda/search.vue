<template>
	<div style="padding:20px;">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="实体概念">
				<el-select v-model="select_key" placeholder="实体概念">
					<el-option label="Smart" value="smart_name" />
					<el-option label="Standard" value="standard_name" />
				</el-select>
			</el-form-item>
			<el-form-item label="实体">
				<el-autocomplete style="width:500px;" v-model="keyword"
					:fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect">
					<template slot-scope="{ item }">
						<div class="name">{{ item.value }}<span
								style="margin-left:20px;color:#B0C4DE;">{{ item.score }}</span></div>
					</template>
				</el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<el-card style="height:500px;">
			<el-row :gutter="10">
				<el-col :span="16" style="background:rgb(249,251,253)">
					<img src="@/assets/kbqa/graph.png" style="width:700px;" />
				</el-col>
				<el-col :span="8">
					<span style="font-size: 14pt;">节点详情</span>
					<div style="margin-top:20px;">
						<el-tag>危化品</el-tag>
						<el-tag style="margin-left: 5px;" type="success">危险性分类</el-tag>
						<el-tag style="margin-left: 5px;" type="info">属性</el-tag>
						<el-tag style="margin-left: 5px;" type="warning">防护措施</el-tag>
						<el-tag style="margin-left: 5px;" type="danger">健康危害</el-tag>
					</div>
					<el-table :data="tableData" style="width: 100%;margin-top:10px;">
						<el-table-column prop="date" label="属性名" />
						<el-table-column prop="name" label="属性值" />
					</el-table>
					<el-divider>
						<el-link type="primary">更多</el-link>
					</el-divider>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
import { findByKeyAndValue } from "@/api/kbqa";

export default {
	name: "Shishikusearch",
	data() {
		return {
			keyword: "",
			select_key: "smart_name",
			formInline: {
				user: "",
				region: ""
			},
			tableData: [
				{
					date: "CAS编号",
					name: "7789-12-0"
				},
				{
					date: "化学分子式",
					name: "Cr2H4Na2O9"
				},
				{
					date: "水溶性",
					name: "730 g/L (20°C)"
				},
				{
					date: "熔点",
					name: "357°C"
				},
				{
					date: "分子量",
					name: "275.00833"
				},
				{
					date: "英文名",
					name: "Sodium dichromate dihydrate"
				},
				{
					date: "中文名",
					name: "重铬酸钠"
				}
			]
		};
	},
	methods: {
		onSubmit() {
			findByKeyAndValue(this.select_key, this.keyword).then(res => {
				console.log(res);
			});
		},
		querySearchAsync(queryString, cb) {
			let self = this;
			findByKeyAndValue(this.select_key, queryString).then(res => {
				let keywords = [];
				res.data.hits.hits.forEach(function(item) {
					let obj = {};
					if (self.select_key === "smart_name") {
						obj.value = item.sourceAsMap.smart_name;
					} else {
						obj.value = item.sourceAsMap.standard_name;
					}

					obj.score = item.score;
					obj.chemical_id = item.sourceAsMap.chemical_id;
					keywords.push(obj);
				});
				cb(keywords);
			});
		},
		handleSelect(item) {
			console.log(item);
		}
	}
};
</script>
