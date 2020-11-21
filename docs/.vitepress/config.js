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
  return [{ text: 'API Reference', link: '/' }]
}
