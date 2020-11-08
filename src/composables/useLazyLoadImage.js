import { getCurrentInstance } from 'vue'
import { DEFAULT_IMG_URL, THROTTLE_DELAY } from '../constants/index'
import { hasIntersectionObserver, scrollParent, loadImage, throttle, logInfo } from '../utils/index'

const LAZY_EVENTS = ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove', 'transitioncancel']

const LoadImageState = {
  loading: 0,
  loaded: 1,
  error: -1
}

// ImageManager class
class ImageManager {
  constructor (options) {
    this.el = options.el
    this.parent = options.parent
    this.src = options.src
    this.error = options.error
    this.loading = options.loading
    this.cache = options.cache
    this.state = LoadImageState.loading

    this.render(this.loading)
  }

  load (next) {
    if (this.state > LoadImageState.loading) {
      return
    }
    if (this.cache.has(this.src)) {
      this.state = LoadImageState.loaded
      this.render(this.src)
      return
    }
    this.renderSrc(next)
  }

  isInView () {
    const rect = this.el.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.left < window.innerWidth
  }

  update (src) {
    const currentSrc = this.src
    if (src !== currentSrc) {
      this.src = src
      this.state = LoadImageState.loading
    }
  }

  renderSrc (next) {
    loadImage(this.src).then(() => {
      this.state = LoadImageState.loaded
      this.render(this.src)
      this.cache.add(this.src)
      next && next()
    }).catch((e) => {
      this.state = LoadImageState.error
      this.render(this.error)
      logInfo(`load failed with src image(${this.src}), error msg: ${e.message}`)
      next && next()
    })
  }

  render (src) {
    this.el.setAttribute('src', src)
  }
}

// LazyLoadImage class
class LazyLoadImage {
  constructor (options) {
    this.error = options.error || DEFAULT_IMG_URL
    this.loading = options.loading || DEFAULT_IMG_URL

    this.cache = new Set()
    this.managerQueue = []
    this.throttleLazyHandler = throttle(this.lazyHandler.bind(this), THROTTLE_DELAY)

    this.init()
  }

  add (el, binding) {
    const src = binding.value
    const parent = scrollParent(el)

    const manager = new ImageManager({
      el,
      parent,
      src,
      error: this.error,
      loading: this.loading,
      cache: this.cache
    })

    this.managerQueue.push(manager)

    if (hasIntersectionObserver) {
      this.observer && this.observer.observe(el)
    } else {
      this.addListenerTarget(parent)
      this.addListenerTarget(window)
      this.throttleLazyHandler()
    }
  }

  update (el, binding) {
    const src = binding.value
    const manager = this.managerQueue.find((manager) => {
      return manager.el === el
    })
    manager && manager.update(src)
  }

  remove (el) {
    const manager = this.managerQueue.find((manager) => {
      return manager.el === el
    })
    manager && this.removeManager(manager)
  }

  init () {
    if (hasIntersectionObserver) {
      this.initIntersectionObserver()
    } else {
      this.targetQueue = []
    }
  }

  initIntersectionObserver () {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const manager = this.managerQueue.find((manager) => {
            return manager.el === entry.target
          })
          if (manager) {
            if (manager.state === LoadImageState.loaded) {
              this.removeManager(manager)
              return
            }
            manager.load()
          }
        }
      })
    }, {
      rootMargin: '0px',
      threshold: 0
    })
  }

  addListenerTarget (el) {
    if (!this.targetQueue) {
      return
    }

    let target = this.targetQueue.find((target) => {
      return target.el === el
    })

    if (!target) {
      target = {
        el,
        ref: 1
      }
      this.targetQueue.push(target)
      this.addListener(el)
    } else {
      target.ref++
    }
  }

  removeListenerTarget (el) {
    if (!this.targetQueue) {
      return
    }

    this.targetQueue.some((target, index) => {
      if (el === target.el) {
        target.ref--
        if (!target.ref) {
          this.removeListener(el)
          this.targetQueue.splice(index, 1)
        }
        return true
      }
      return false
    })
  }

  addListener (el) {
    LAZY_EVENTS.forEach((event) => {
      el.addEventListener(event, this.throttleLazyHandler, {
        passive: true,
        capture: false
      })
    })
  }

  removeListener (el) {
    LAZY_EVENTS.forEach((event) => {
      el.removeEventListener(event, this.throttleLazyHandler)
    })
  }

  lazyHandler (e) {
    for (let i = this.managerQueue.length - 1; i >= 0; i--) {
      const manager = this.managerQueue[i]
      if (manager.isInView()) {
        if (manager.state === LoadImageState.loaded) {
          this.removeManager(manager)
          return
        }
        manager.load()
      }
    }
  }

  removeManager (manager) {
    const index = this.managerQueue.indexOf(manager)
    if (index > -1) {
      this.managerQueue.splice(index, 1)
    }
    if (this.observer) {
      this.observer.unobserve(manager.el)
    } else {
      this.removeListenerTarget(manager.parent)
      this.removeListenerTarget(window)
    }
  }
}

const useLazyLoadImage = (options, app) => {
  if (!app) {
    const currInstance = getCurrentInstance()
    if (!currInstance || !currInstance.appContext || !currInstance.appContext.app) {
      return
    }
    app = currInstance.appContext.app
  }

  if (!app.directive('lazy')) {
    const lazy = new LazyLoadImage(options)
    app.directive('lazy', {
      mounted: lazy.add.bind(lazy),
      updated: lazy.update.bind(lazy),
      unmounted: lazy.update.bind(lazy)
    })
  }
}

export default useLazyLoadImage
