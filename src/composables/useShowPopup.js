import { ref } from 'vue'

const useShowPopup = () => {
  const mapping = ref({})
  
  // show/hide popup
  const showPopup = (type, isShow) => {
    mapping.value[type] = isShow
  }

  return {
    mapping,
    showPopup
  }
}

export default useShowPopup
