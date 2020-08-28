const usePopupTitleBarBase = function () {
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

export default usePopupTitleBarBase
