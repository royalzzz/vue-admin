<template>
  <div>
    <transition name="fade">
      <div v-if="visible" class="toast">
        <!-- <div class="toast title">{{title}}</div>
				<div class="toast msg">{{msg}}</div>-->
        <i :class="icon" :style="{ color: color, fontSize: 50 + 'px'}"></i>
        <div class="msg">{{ msg }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'FaultTree',
  data() {
    return {
      visible: false,
      type: '',
      msg: '',
      duration: 3000,
      icon: 'el-icon-circle-check',
      color: 'grey'
    }
  },
  mounted() {
    if (this.type === 'success') {
      this.icon = 'el-icon-circle-check'
      this.color = 'green'
    } else if (this.type === 'error') {
      this.icon = 'el-icon-circle-close'
      this.color = 'red'
    } else if (this.type === 'unlink') {
      this.icon = 'unlink'
      this.color = 'orange'
    } else if (this.type === 'sorry') {
      this.icon = 'frown outline'
      this.color = 'orange'
    } else {
      this.icon = 'info'
      this.color = 'blue'
    }
    this.close()
  },
  methods: {
    close() {
      window.setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  }
}
</script>
<style>
.toast {
	text-align: center;
	/*background:linear-gradient(rgba(247, 245, 245, 0.95),rgba(236, 235, 235, 0.65));*/
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 6px;
	position: fixed;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 200px;
	height: 120px;
	padding: 10px;
	z-index: 999;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	border-style: solid;
	border-width: 1px;
	border-color: rgb(235, 232, 232);
	/* box-shadow: silver 0px 0px 1px; */
}
.toast .msg {
	margin-top: 10px;
	color: gray;
	font-size: 12pt;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
