var h = require('virtual-dom/h')
  , scroll = require('scroll')
  , hook = require('./hook')
  , autofocus = require('./autofocus')

function makeMessage(message) {
  return h('li.message.media', h('div.media-body', [
    h('b.author', message.nick),
    h('span.text', message.text)
  ]))
}

function conversation(messages) {
  if(0 === messages.length) {
    return h('div.center-me', [
      h('h3', 'There are currently no messages.')
    ])
  }

  return h('div.conversation', {
    'scroll': hook(function(node) {
      scroll.top(node, 10000000000)
    })
  }, h('ul.messages.media-list', messages.map(makeMessage)))
}

module.exports = function(state, conn) {
  return h('div.chat', [
    conversation(state.messages),
    h('div.input', h('input.form-control.input-lg', {
      'autofocus': autofocus,
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
