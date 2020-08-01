const useEventListener = function ({
  isBind = true,
  node = document,
  name = '',
  handler = () => {}
}) {
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
