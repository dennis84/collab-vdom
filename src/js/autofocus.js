var hook = require('./hook')

function autofocus(node) {
  setTimeout(function() {
    node.focus()
  }, 100)
}

module.exports = hook(autofocus)
