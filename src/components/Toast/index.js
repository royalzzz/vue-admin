import Vue from 'vue'
import Toast from './Toast'

const ToastTip = Vue.extend(Toast)

Toast.install = function (options, type) {
  if (options === undefined || options === null) {
    options = {
      msg: ''
    }
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      msg: options
    }
    if (type !== undefined && options !== null) {
      options.type = type
    }
  }

  const instance = new ToastTip({
    data: options
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
  })
}

export default Toast
