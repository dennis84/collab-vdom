var createElement = require('virtual-dom/create-element')
  , h = require('virtual-hyperscript')

function Modal(view) {
  this.node = null
  this.view = h('div', [
    view(this),
    h('div.modal-backdrop.fade.in')
  ])
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
