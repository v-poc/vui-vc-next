// The noop function
export const noop = function () { }

// Convert kebab-case to camelCase
export const transformCamelCase = (str = '') => str.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase())

// Format value by gap step
export const formatValueByGapStep = ({
  step,
  value,
  gap = ' ',
  direction = 'right',
  range,
  isAdd = 1,
  oldValue = ''
}) => {
  if (value.length === 0) {
    return {
      value,
      range
    }
  }

  const arr = value && value.split('') || []
  let _range = range
  let showValue = ''

  if (direction === 'right') {
    for (let j = arr.length - 1, k = 0; j >= 0; j--, k++) {
      const m = arr[j]
      showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue
    }
    if (isAdd === 1) {
      if (oldValue.length - showValue.length === -2) {
        _range = range + 1
      }
    } else {
      if (oldValue.length - showValue.length === 2) {
        _range = range - 1
      }
      if (_range <= 0) {
        _range = 0
      }
    }
  } else {
    arr.some((n, i) => {
      showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n
    })
    const adjust = range % (step + 1) === 0 ? 1 * isAdd : 0
    _range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adjust) : showValue.length
  }

  return {
    value: showValue,
    range: _range
  }
}

// Convert camelCase to kebab-case
export const kebab = (str = '') => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

// Format color string to kebab-case
export const formatColor = (str = '') => str.replace(/(.*)(\d)/, '$1-$2')

// Get Dpr
export const getDpr = () => {
  const getParam = (name, str) => {
    const reg = new RegExp(`(^|,)${name}=([^,]*)(,|$)`, 'i')
    const r = str.match(reg)
    if (r) {
      return r[2]
    }
    return null
  }

  const viewPort = typeof window !== 'undefined' ? document.querySelector('meta[name=viewport]') : null
  if (!viewPort) {
    return 1
  }

  const viewPortContent = viewPort.getAttribute('content')
  const initialScale = +(getParam('initial-scale', viewPortContent) || 1)
  const maximumScale = +(getParam('maximum-scale', viewPortContent) || 1)
  const minimumScale = +(getParam('minimum-scale', viewPortContent) || 1)

  return 1 / Math.min(initialScale, maximumScale, minimumScale)
}

// The throttle function
export const throttle = function (fn, interval) {  
  let last = 0 

  return function () {
    const context = this
    const args = arguments
    const now = +new Date()

    if (now - last >= interval) {
      last = now
      fn.apply(context, args)
    }
  }
}

// The debounce function
export const debounce = function (func = noop, wait = 300, immediate = false) {
  let timer = null
  let result
  return function() {
      const context = this
      const args = arguments

      if (timer) clearTimeout(timer)
      if (immediate) {
          const callNow = !timer
          timer = setTimeout(() => {
              timer = null
          }, wait)
          if (callNow) result = func.apply(context, args)
      } else {
          timer = setTimeout(() => {
              func.apply(context, args)
          }, wait)
      }
      return result
  }
}
