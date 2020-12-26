import { SVG_SPRITE_NODE_ID, DEFAULT_SVG_LIST } from '../constants/index'

const svgSprite = (contents) => `
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  id=${SVG_SPRITE_NODE_ID}
  style="position:absolute;width:0;height:0"
>
  <defs>
    ${contents}
  </defs>
</svg>
`

const renderSvgSprite = (svgList) => {
  const list = svgList || DEFAULT_SVG_LIST
  const symbols = Object.keys(list)
    .map(iconName => {
      const svgContent = list[iconName].split('svg')[1]
      return `<symbol id=${iconName}${svgContent}symbol>`
    })
    .join('')
  return svgSprite(symbols)
}

const loadSvgSprite = (svgList) => {
  if (!document) {
    return
  }
  const svgNode = document.getElementById(SVG_SPRITE_NODE_ID)
  const mountNode = document.body

  if (!svgNode) {
    mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite(svgList))
  } else if (svgNode && svgList) {
    svgNode && svgNode.parentNode.removeChild(svgNode)
    mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite(svgList))
  }
}

export default loadSvgSprite
