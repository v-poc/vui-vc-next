import packageData from '../../package.json'
import { transformCamelCase } from '../utils/index'
import { DEFAULT_IMG_PLACEHOLDER } from '../constants/index'
import useLazyLoadImage from '../composables/useLazyLoadImage'

import '../assets/styles/vui-reset.scss'
import '../assets/styles/vui-animation.scss'
import VSkeleton from './skeleton/index.vue'
import VTag from './tag/index.vue'
import VPopup from './popup/index.vue'
import VPopupTitleBar from './popup/title-bar.vue'
import VIcon from './icon/index.vue'
import VButton from './button/index.vue'
import VTransition from './transition/index.vue'
import VLandscape from './landscape/index.vue'
import VToast from './toast/toast.vue'
import VAmount from './amount/index.vue'
import VActivityIndicator from './activity-indicator/index.vue'
import VChart from './chart/index.vue'
import VProgress from './progress/circular.vue'
import VResultPage from './result-page/index.vue'
import VActionBar from './action-bar/index.vue'
import VOnePiece from './misc/op.vue'
import VCoolButton from './misc/cool-button.vue'
import VLikeButton from './misc/like-button.vue'
import VSwitch from './switch/index.vue'
import VActionSheet from './action-sheet/action-sheet.vue'
import VWatermark from './watermark/index.vue'
import VScrollView from './scroll-view/index.vue'
import VScrollViewMore from './scroll-view/more.vue'
import VScrollViewRefresh from './scroll-view/refresh.vue'
import VAgree from './agree/index.vue'
import VTabBar from './tab-bar/index.vue'
import VCubeAnim from './misc/cube-anim.vue'
import VTabs from './tabs/index.vue'
import VTabPane from './tabs/tab-pane.vue'
import VFab from './button/fab.vue'

// components collection (keep router)
const components = {
  VSkeleton,
  VTag,
  VPopup,
  VPopupTitleBar,
  VIcon,
  VButton,
  VTransition,
  VLandscape,
  VToast,
  VAmount,
  VActivityIndicator,
  VChart,
  VProgress,
  VResultPage,
  VActionBar,
  VOnePiece,
  VSwitch,
  VActionSheet,
  VWatermark,
  VScrollView,
  VAgree,
  VTabBar
}

// components collection (skip router)
const skipRouterComponents = {
  VCubeAnim,
  VCoolButton,
  VLikeButton,
  VScrollViewMore,
  VScrollViewRefresh,
  VTabs,
  VTabPane,
  VFab
}

// components collection
const componentsCollection = { ...components, ...skipRouterComponents }

// components desc array
const componentsDesc = Object.keys(componentsCollection).map((item) => {
  const component = componentsCollection[item]
  return {
    name: component.name || 'v-comp', // kebab-case
    component
  }
})

// components VUI array for demo showcase
const componentsVUI = Object.keys(components).map((item) => item.slice(1))

// install function
const install = function (app) {
  if (!app || install.installed) {
    return
  }

  componentsDesc.forEach((item) => {
    const kebabCaseName = item.name
    const camelCaseName = transformCamelCase(`-${kebabCaseName}`)
    const registerComponent = item.component
    app.component(kebabCaseName, registerComponent) // kebab-case
    app.component(camelCaseName, registerComponent) // camelCase
  })

  // register global custom directive
  addDirective({
    app,
    defaultImage: DEFAULT_IMG_PLACEHOLDER
  })
}

// add custom directive function
const addDirective = function (config = {}) {
  // register v-lazy directive
  useLazyLoadImage({
    loading: config.defaultImage,
    error: config.defaultImage
  }, config.app)
}

const version = packageData.version

export {
  componentsVUI,
  install,
  addDirective,
  version,
  VSkeleton,
  VTag,
  VPopup,
  VPopupTitleBar,
  VIcon,
  VButton,
  VTransition,
  VLandscape,
  VToast,
  VAmount,
  VActivityIndicator,
  VChart,
  VProgress,
  VResultPage,
  VActionBar,
  VOnePiece,
  VSwitch,
  VActionSheet,
  VWatermark,
  VScrollView,
  VAgree,
  VTabBar,
  VCubeAnim,
  VCoolButton,
  VLikeButton,
  VScrollViewMore,
  VScrollViewRefresh,
  VTabs,
  VTabPane,
  VFab
}
