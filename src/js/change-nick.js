var h = require('virtual-dom/h')
  , autofocus = require('./autofocus')

module.exports = function(member, conn, modal) {
  return h('div.modal.fade.in',
    h('div.modal-dialog.modal-sm',
      h('div.modal-content',
        h('form', {
          'onsubmit': function(e) {
            e.preventDefault()
            var nick = e.target.querySelector('input').value.trim()
            if('' !== nick) {
              conn.send('change-nick', {'name': nick})
              modal.hide()
            }
          }
        }, [
          h('div.modal-body', [
            h('label', 'Nickname'),
            h('input.form-control.input-lg', {
              'autofocus': autofocus,
              'value': member.name
            })
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
