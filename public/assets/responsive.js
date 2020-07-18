(function (win, doc) {
  function onResize () {
    var ww = win.innerWidth
    if (ww > win.screen.width) {
      win.requestAnimationFrame(onResize)
    } else {
      if (ww > 750) {
        ww = 750
      }
      doc.documentElement.style.fontSize = ww * 100 / 750 + 'px'
    }
  }

  onResize()

  win.addEventListener('resize', onResize)
})(window, document)