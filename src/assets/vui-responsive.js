(function (win, doc) {
  function onResize() {
    let w = win.innerWidth
    if (w > win.screen.width) {
      win.requestAnimationFrame(onResize)
    } else {
      w = w > 750 ? 750 : w
      doc.documentElement.style.fontSize = `${w * 100 / 750}px`
    }
  }

  onResize()

  win.addEventListener('resize', onResize)
})(window, document)
