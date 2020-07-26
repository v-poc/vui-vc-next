const useTransition = function (position) {
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

export default useTransition
