const useTransition = function (position) {
  let effect
  switch (position) {
    case 'top':
      effect = 'm-slide-down'
      break
    case 'right':
      effect = 'm-slide-left'
      break
    case 'bottom':
      effect = 'm-slide-up'
      break
    case 'left':
      effect = 'm-slide-right'
      break
    default:
      effect = 'm-fade'
  }
  return effect
}

export default useTransition
