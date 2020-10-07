import packageData from '../../package.json'
import { transformCamelCase } from '../utils/index'

import '../assets/styles/vui-reset.scss'
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
import VSwitch from './switch/index.vue'
import VActionSheet from './action-sheet/action-sheet.vue'

// components collection
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
  VActionSheet
}

// components desc array
const componentsDesc = Object.keys(components).map((item) => {
  const component = components[item]
  return {
    name: component.name || 'v-comp', // kebab-case
    component
  }
})

// components VUI array
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
}

const version = packageData.version

export {
  componentsVUI,
  install,
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
  VActionSheet
}
