import packageData from '../../package.json'
import { install, components } from './vui-components'

const version = packageData.version

export {
  install,
  version,
  components
}
