import { root, isInBrowser } from './env'

// Log info
export const logInfo = (content, type = 'info') => {
  import.meta.env.DEV && console[type] && console[type]('[VUI-log] %c%s', 'background: #69C;color: #FFF', content)
}

// Mix properties into target object
export function extend(toTarget, fromSource) {
  for (const key in fromSource) {
    toTarget[key] = fromSource[key]
  }
  return toTarget
}

// effects - easeOut Cubic
export const easeOutCubic = (pos) => {
  return Math.pow(pos - 1, 3) + 1
}

// effects - easeInOut Cubic
export const easeInOutCubic = (pos) => {
  if ((pos /= 0.5) < 1) {
    return 0.5 * Math.pow(pos, 3)
  }

  return 0.5 * (Math.pow(pos - 2, 3) + 2)
}

// The render function
export const render = (function(global) {
  // for SSR
  if (!isInBrowser) {
    return function(content, left, top) {
      content.style.marginLeft = left ? `${-left}px` : ''
      content.style.marginTop = top ? `${-top}px` : ''
    }
  }
  const docStyle = document.documentElement.style

  let engine

  if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
    engine = 'presto'
  } else if ('MozAppearance' in docStyle) {
    engine = 'gecko'
  } else if ('WebkitAppearance' in docStyle) {
    engine = 'webkit'
  } else if (typeof navigator.cpuClass === 'string') {
    engine = 'trident'
  }

  const vendorPrefix = {
    trident: 'ms',
    gecko: 'Moz',
    webkit: 'Webkit',
    presto: 'O',
  }[engine]

  const helperElem = document.createElement('div')
  const perspectiveProperty = vendorPrefix + 'Perspective'
  const transformProperty = vendorPrefix + 'Transform'

  if (helperElem.style[perspectiveProperty] !== undefined) {
    return function(content, left, top, zoom = 1, useNativeDriver = true) {
      if (useNativeDriver) {
        content.style[transformProperty] = `translate3d(${-left}px,${-top}px,0) scale(${zoom})`
      } else {
        content.style[transformProperty] = `translate(${-left}px,${-top}px) scale(${zoom})`
      }
    }
  } else if (helperElem.style[transformProperty] !== undefined) {
    return function(content, left, top, zoom = 1) {
      content.style[transformProperty] = `translate(${-left}px,${-top}px) scale(${zoom})`
    }
  } else {
    return function(content, left, top, zoom) {
      content.style.marginLeft = left ? `${-left}px` : ''
      content.style.marginTop = top ? `${-top}px` : ''
      content.style.zoom = zoom || 1
    }
  }
})(root)

// Load image
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      resolve()
      dispose()
    }

    image.onerror = (e) => {
      reject(e)
      dispose()
    }

    image.src = src

    const dispose = () => {
      image.onload = image.onerror = null
    }
  })
}

function checkIntersectionObserver () {
  if (isInBrowser &&
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in IntersectionObserverEntry.prototype)) {
      Object.defineProperty(IntersectionObserverEntry.prototype,
        'isIntersecting', {
          get: function (instance) {
            return instance.intersectionRatio > 0
          }
        })
    }
    return true
  }
  return false
}

// Check IntersectionObserver
export const hasIntersectionObserver = checkIntersectionObserver()

const checkStyle = (el, prop) => {
  return getComputedStyle(el).getPropertyValue(prop)
}

const checkOverflow = (el) => {
  return checkStyle(el, 'overflow') + checkStyle(el, 'overflow-y') + checkStyle(el, 'overflow-x')
}

// Scroll parent
export const scrollParent = (el) => {
  let parent = el

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break
    }

    if (!parent.parentNode) {
      break
    }

    if (/(scroll|auto)/.test(checkOverflow(parent))) {
      return parent
    }

    parent = parent.parentNode
  }

  return window
}
