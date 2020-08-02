import Vue from 'vue'
import ToastOptions from './toast.vue'

/**
 * Toast factory pattern
 * 
 * @param {Object} props
 * @returns {Toast} the Toast viewModel
 */
const Toast = function(props) {
  const {
    icon = '',
    iconSvg = false,
    content = '',
    duration = 3000,
    position = 'center',
    hasMask = false,
    parentNode = document.body
  } = props

  let vm = Toast.$_instance
  if (!vm) {
    const ToastConstructor = Vue.extend(ToastOptions)
    vm = new ToastConstructor({
      propsData: {
        icon,
        iconSvg,
        content,
        duration,
        position,
        hasMask
      }
    })
    Toast.$_instance = vm
    vm.$mount()
  }

  if (!vm.$el.parentNode) {
    parentNode.appendChild(vm.$el)
  }

  vm.icon = icon
  vm.iconSvg = iconSvg
  vm.content = content
  vm.duration = duration
  vm.position = position
  vm.hasMask = hasMask

  vm.show()

  return vm
}

// singleton
Toast.$_instance = null

Toast.component = ToastOptions

/**
 * Show info toast
 * 
 * @param {String} content
 * @param {Number} duration
 * @param {Boolean} hasMask
 * @param {HtmlElement} parentNode
 * @returns {Toast} the Toast viewModel
 */
Toast.info = function(
  content = '',
  duration = 3000,
  hasMask = false,
  parentNode = document.body
) {
  return Toast({
    icon: '',
    content,
    duration,
    hasMask,
    parentNode
  })
}

/**
 * Show succeed toast
 * 
 * @param {String} content
 * @param {Number} duration
 * @param {Boolean} hasMask
 * @param {HtmlElement} parentNode
 * @returns {Toast} the Toast viewModel
 */
Toast.succeed = function(
  content = '',
  duration = 3000,
  hasMask = false,
  parentNode = document.body
) {
  return Toast({
    icon: 'success',
    content,
    duration,
    hasMask,
    parentNode
  })
}

/**
 * Show failed toast
 * 
 * @param {String} content
 * @param {Number} duration
 * @param {Boolean} hasMask
 * @param {HtmlElement} parentNode
 * @returns {Toast} the Toast viewModel
 */
Toast.failed = function(
  content = '',
  duration = 3000,
  hasMask = false,
  parentNode = document.body
) {
  return Toast({
    icon: 'fail',
    content,
    duration,
    hasMask,
    parentNode
  })
}

/**
 * Show loading toast
 * 
 * @param {String} content
 * @param {Number} duration
 * @param {Boolean} hasMask
 * @param {HtmlElement} parentNode
 * @returns {Toast} the Toast viewModel
 */
Toast.loading = function(
  content = '',
  duration = 3000,
  hasMask = false,
  parentNode = document.body
) {
  return Toast({
    icon: 'spinner',
    iconSvg: true,
    content,
    duration,
    hasMask,
    parentNode
  })
}

/**
 * Hide toast
 */
Toast.hide = function() {
  const ToastConstructor = Vue.extend(ToastOptions)
  if (Toast.$_instance instanceof ToastConstructor && Toast.$_instance.visible) {
    Toast.$_instance.hide()
  }
}

export default Toast
