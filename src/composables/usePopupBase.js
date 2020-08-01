const usePopupBase = function () {
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

export default usePopupBase
