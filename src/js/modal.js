var createElement = require('virtual-dom/create-element')
  , h = require('virtual-dom/h')

function modal(render) {
  var node, close = function() {
    if(node) node.remove()
  }

  var view = h('div', [render(close), h('div.modal-backdrop.fade.in')])
  node = createElement(view)
  node.addEventListener('click', function(e) {
    if(e.target.classList.contains('modal')) close()
  })

  document.addEventListener('keydown', function esc(e) {
    if(27 === e.keyCode) {
      document.removeEventListener('keydown', esc)
      close()
    }
  })

  document.body.appendChild(node)
}

module.exports = modal
