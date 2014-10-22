var h = require('virtual-hyperscript')

module.exports = function(conn, modal) {
  return h('div', [
    makeModal(conn, modal),
    makeBackdrop()
  ])
}

function makeBackdrop() {
  return h('div.modal-backdrop.fade.in')
}

function makeModal(conn, modal) {
  return h('div.modal.fade.in.bs-modal-sm#change-nick', {
    'style': {'display': 'block'},
    'onclick': function(e) {
      if('change-nick' === e.target.id) {
        modal.hide()
      }
    }
  }, h('div.modal-dialog.modal-sm',
      h('div.modal-content',
        h('form', {
          'onsubmit': function(e) {
            e.preventDefault()
            var nick = e.target.querySelector('input').value
            if('' !== nick) {
              conn.send('change-nick', {'name': nick})
              modal.hide()
            }
          }
        }, [
          h('div.modal-body', [
            h('label', 'Nickname'),
            h('input.form-control.input-lg', {'autofocus': true})
          ]),
          h('div.modal-footer', [
            h('button.btn.btn-default', {
              'type': 'button',
              'onclick': function(e) {
                modal.hide()
              }
            }, 'Close'),
            h('button.btn.btn-primary', {'type': 'submit'}, 'Apply')
          ])
        ]))))
}
