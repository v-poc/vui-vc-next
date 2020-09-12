import packageData from '../../package.json'
import { install, components } from './vui-components'

const version = packageData.version

const {
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
  VResultPage
} = components

export {
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
  VResultPage
}
