module.exports = {
  lang: 'en-US',
  title: 'VUI docs',
  description: 'The docs of VUI.next',

  themeConfig: {
    repo: 'bluepower/vui-vc-next',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',

    nav: [
      { text: 'API Reference', link: '/' },
      {
        text: 'Changelog',
        link: 'https://github.com/bluepower/vui-vc-next/blob/dev/CHANGELOG.md'
      }
    ],

    sidebar: {
      '/': getConfigSidebar()
    }
  }  
}

function getConfigSidebar() {
  return [{
    text: 'API reference',
    children: [
      { text: 'VSkeleton', link: '/skeleton.html' },
      { text: 'VTag', link: '/tag.html' },
      { text: 'VPopup', link: '/popup.html' },
      { text: 'VIcon', link: '/icon.html' },
      { text: 'VButton', link: '/button.html' },
      { text: 'VTransition', link: '/transition.html' },
      { text: 'VLandscape', link: '/landscape.html' },
      { text: 'VToast', link: '/toast.html' },
      { text: 'VAmount', link: '/amount.html' },
      { text: 'VActivityIndicator', link: '/activity-indicator.html' },
      { text: 'VChart', link: '/chart.html' },
      { text: 'VProgress', link: '/progress.html' },
      { text: 'VResultPage', link: '/result-page.html' },
      { text: 'VActionBar', link: '/action-bar.html' },
      { text: 'VSwitch', link: '/switch.html' },
      { text: 'VActionSheet', link: '/action-sheet.html' },
      { text: 'VWatermark', link: '/watermark.html' },
      { text: 'VScrollView', link: '/scroll-view.html' },
      { text: 'VAgree', link: '/agree.html' }
    ]
  }]
}
