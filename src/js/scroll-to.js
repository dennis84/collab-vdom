var scroll = require('scroll')

function scrollTo(node, pos) {
  var offset = window.innerHeight * 0.3
  scroll.top(node, (pos - 1) * 23 - offset)
}

module.exports = scrollTo
