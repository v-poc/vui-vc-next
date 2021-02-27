module.exports = () => {
  const plugins = {
    'postcss-pxtorem': {
      rootValue: 100,
      minPixelValue: 2,
      propWhiteList: []
    }
  }

  return {
    plugins
  }
}
