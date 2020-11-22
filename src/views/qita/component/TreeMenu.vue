<template>
	<div>
		<div>
			<ul class="l_tree">
				<li v-for="item in model" :key="item.id" class="l_tree_branch">
					<div class="l_tree_click">
						<button v-if="item.children" type="button" class="l_tree_children_btn"
							@click="toggle(item)">
							{{ !item.show ? "-" : "+" }}
						</button>
						<button v-if="item.children" type="button" class="l_folder" @click="getText(item)">
							{{ item.name }}
						</button>
					</div>
					<tree-menu v-show="!item.show" v-if="item.children" :model="item.children"></tree-menu>
					<div>
						<el-button v-for="(item, i) in keyNodes" :key="i">{{ item.label }}</el-button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Vue from "vue";

export default {
  name: "TreeMenu",
  props: {
    model: {},
  },
  data() {
    return {
      keyNodes: ["sds"],
    };
  },
  methods: {
    toggle: function (item) {
      var idx = this.model.indexOf(item);
      Vue.set(this.model[idx], "show", !item.show);
    },
    // getText: function (item) {
    //   console.log(item.name);
    // },
    getText: function (item) {
      var self = this;
      this.$store.dispatch("tree/findByLabelLike", item.name).then((result) => {
        var db_nodes = result;
        this.keyNodes = db_nodes;
        console.log("uiuui");
        console.log(this.keyNodes);
        this.$emit("re", this.keyNodes);
      });
    },
  },
};
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

*:before,
*:after {
	box-sizing: border-box;
}

ul,
li {
	list-style: none;
}

.l_tree_container {
	height: 100%;
	margin: 13px;
	position: relative;
}

.l_tree {
	width: calc(100% - 44px);
	height: 100%;
	padding-left: 42px;
}

.l_tree_branch {
	width: 100%;
	height: 100%;
	display: block;
	padding: 13px;
	position: relative;
}

.l_tree_branch .l_tree_children_btn {
	width: 26px;
	height: 26px;
	border-radius: 50%;
	background-color: #2283c1;
	font-size: 23px;
	text-align: center;
	color: #ffffff;
	outline: none;
	border: 0;
	cursor: pointer;
}

ul.l_tree:before {
	content: "";
	border-left: 1px solid #999999;
	height: calc(100%);
	position: absolute;
	left: 10px;
	top: 0px;
}

.l_tree .l_tree_branch:last-child::before {
	content: "";
	width: 3px;
	height: calc(100% - 24px);
	display: block;
	background-color: #ffffff;
	position: absolute;
	bottom: 0;
	left: -34px;
}

.l_tree,
.l_tree_branch {
	position: relative;
}

.l_tree_branch::after {
	content: "";
	width: 40px;
	height: 0;
	border-bottom: 1px solid #000;
	position: absolute;
	right: calc(100% - 9px);
	top: 22px;
}

.l_tree_container > .l_tree::before,
.l_tree_container > .l_tree > .l_tree_branch::after {
	display: none;
}

.l_folder {
	border-radius: 5px;
	border: 3px #d2e2fa solid;
	padding: 2px 10px 2px 10px;
}
</style>
