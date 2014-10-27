var h = require('virtual-hyperscript')
  , navigation = require('./navigation')
  , panes = require('./panes')

function statusScreen(state) {
  if('open' === state.status && 0 === state.files.length) {
    return require('./status-opened')
  }

  if('closed' === state.status) {
    return require('./status-closed')
  }
}

module.exports = function(state, events, conn) {
  return h('div.layout', [
    navigation(state, events, conn),
    h('div.editor-wrapper', [
      statusScreen(state),
      panes(state)
    ])
  ])
}
