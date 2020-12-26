import { ref } from 'vue'

const useEventListener = function ({
  isBind = true,
  el = ref(document),
  name = '',
  handler = () => {}
}) {
  // unwrap el
  const node = el.value

  let performEvent = () => {}
  if (isBind) {
    // add event
    performEvent = () => node && node.addEventListener(name, handler, false)
  } else {
    // remove event
    performEvent = () => node && node.removeEventListener(name, handler, false)
  }
  return performEvent
}

export default useEventListener
