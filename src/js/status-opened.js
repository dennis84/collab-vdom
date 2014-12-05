var h = require('virtual-dom/h')

module.exports = h('div.center-me',
  h('div', [
    h('img', {
      'src': 'assets/images/loading-bubbles.svg',
      'height': '64',
      'width': '64'
    }),
    h('h3', 'Waiting for code')
  ]))
