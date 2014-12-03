var h = require('virtual-dom/virtual-hyperscript')

module.exports = h('div.center-me',
  h('div', [
    h('h3', 'Connection lost'),
    h('button.btn.btn-primary', {
      'onclick': function(e) {
        window.location.reload()
      }
    }, 'refresh')
  ]))
