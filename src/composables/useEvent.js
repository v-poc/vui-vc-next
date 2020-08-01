import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

export default function useEvent(
  el = ref(document),
  name = '',
  handler = () => {}
) {
  // unwrap el
  const node = el.value

  // add event
  const addEvent = () => node && node.addEventListener(name, handler)

  // remove event
  const removeEvent = () => node && node.removeEventListener(name, handler)

  onMounted(addEvent)
  onBeforeUnmount(removeEvent)

  return removeEvent
}
