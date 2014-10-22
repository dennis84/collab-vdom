var createElement = require('virtual-dom/create-element')

function Modal(view) {
  this.view = view(this)
  this.node = null
}

Modal.prototype.show = function() {
  this.node = createElement(this.view)
  document.body.appendChild(this.node)
}

Modal.prototype.hide = function() {
  if(null !== this.node) {
    this.node.remove()
  }
}

module.exports = Modal
