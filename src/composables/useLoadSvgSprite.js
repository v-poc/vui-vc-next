import useDefaultSvgList from './useDefaultSvgList'

const defaultSvgList = useDefaultSvgList()

const SVG_SPRITE_NODE_ID = '__VC_SVG_SPRITE_NODE__'

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

const renderSvgSprite = () => {
  const symbols = Object.keys(defaultSvgList)
    .map(iconName => {
      const svgContent = defaultSvgList[iconName].split('svg')[1]
      return `<symbol id=${iconName}${svgContent}symbol>`
    })
    .join('')
  return svgSprite(symbols)
}

const loadSvgSprite = () => {
  if (!document) {
    return
  }
  const svgNode = document.getElementById(`${SVG_SPRITE_NODE_ID}`)
  const mountNode = document.body

  if (!svgNode) {
    mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite())
  }
}

export default loadSvgSprite
