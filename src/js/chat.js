var h = require('virtual-dom/h')
  , scroll = require('scroll')
  , hook = require('./hook')

function makeMessage(message) {
  return h('li.message.media', h('div.media-body', [
    h('b.author', message.nick),
    h('span.text', message.text)
  ]))
}

module.exports = function(state, conn) {
  return h('div.chat', [
    h('div.conversation', {
      'scroll': hook(function(node) {
        scroll.top(node, 10000000000)
      })
    }, h('ul.messages.media-list', state.messages.map(makeMessage))),
    h('div.input', h('input.form-control.input-lg', {
      'autofocus': true,
      'placeholder': 'Send a message ...',
      'onkeypress': function(e) {
        if(13 === e.keyCode) {
          var value = e.target.value.trim()
          if('' !== value) {
            conn.send('message', {'text': value})
          }
          e.target.value = ''
        }
      }
    }))
  ])
}
