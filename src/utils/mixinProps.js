export const getPopupBase = function () {
  return {
    // Whether display popup
    value: {
      type: Boolean,
      default: false
    },
    // Whether display mask
    hasMask: {
      type: Boolean,
      default: true
    },
    // Whether click upon mask to close popup
    maskClosable: {
      type: Boolean,
      default: true
    },
    // Whether display large radius
    largeRadius: {
      type: Boolean,
      default: false
    },
    // The animation effect of popup
    transition: {
      type: String,
      default: ''
    }    
  }
}

export const getPopupTitleBarBase = function () {
  return {
    // The title of popup title bar
    title: {
      type: String,
      default: ''
    },
    // The description of popup title bar
    describe: {
      type: String,
      default: ''
    },
    // The confirmation text
    okText: {
      type: String,
      default: ''
    },
    // The cancellation text
    cancelText: {
      type: String,
      default: ''
    },
    // The position of title and description
    titleAlign: {
      type: String,
      default: 'center'
    },
    // Whether display large radius
    largeRadius: {
      type: Boolean,
      default: false
    },
    // Whether display right close button only
    onlyClose: {
      type: Boolean,
      default: false
    }    
  }
}

export const getTransition = function (position) {
  let effect
  switch (position) {
    case 'top':
      effect = 'v-slide-down'
      break
    case 'right':
      effect = 'v-slide-left'
      break
    case 'bottom':
      effect = 'v-slide-up'
      break
    case 'left':
      effect = 'v-slide-right'
      break
    default:
      effect = 'v-fade'
  }
  return effect
}
