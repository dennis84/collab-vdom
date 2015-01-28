var h = require('virtual-dom/h')
  , scroll = require('scroll')
  , hook = require('./hook')
  , autofocus = require('./autofocus')

function humanize(timestamp) {
  var diff = (Date.now() - timestamp) / 1000
  if(diff < 60) return 'now'
  var minutes = Math.floor(diff / 60)
  if(1 === minutes) return 'about a minute ago'
  var houres = Math.floor(minutes / 60)
  if(0 === houres) return minutes + ' minutes ago'
  if(1 === houres) return 'about an hour ago'
  return houres + ' houres ago'
}

function makeMessage(message) {
  return h('li.message', h('div', [
    h('div', [
      h('b.author', message.nick),
      h('span.created-at', humanize(message.createdAt))
    ]),
    h('div.text', message.text)
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
