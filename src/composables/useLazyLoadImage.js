import { getCurrentInstance } from 'vue'
import LazyLoadImage from '../utils/lazyLoad'

const useLazyLoadImage = (options = {}, app) => {
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
