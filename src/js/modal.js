var createElement = require('virtual-dom/create-element')
  , h = require('virtual-dom/virtual-hyperscript')

function Modal(view) {
  this.node = null
  this.view = h('div', [
    view(this),
    h('div.modal-backdrop.fade.in')
  ])
}

Modal.prototype.show = function() {
  var modal = this
  this.node = createElement(this.view)
  this.node.addEventListener('click', function(e) {
    if(e.target.classList.contains('modal')) {
      modal.hide()
    }
  })

  document.body.appendChild(this.node)
}

Modal.prototype.hide = function() {
  if(null !== this.node) {
    this.node.remove()
  }
}

module.exports = Modal
