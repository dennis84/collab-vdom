var h = require('virtual-dom/h')
  , navigation = require('./navigation')
  , panes = require('./panes')
  , chat = require('./chat')

function editor(state, conn) {
  if(true === state.chat) {
    return chat(state, conn)
  }

  if('open' === state.status && 0 === state.files.length) {
    return require('./status-opened')
  }

  if('closed' === state.status) {
    return require('./status-closed')
  }

  return panes(state)
}

module.exports = function(state, events, conn) {
  return h('div.layout', [
    navigation(state, events, conn),
    h('div.editor-wrapper', editor(state, conn))
  ])
}
