var h = require('virtual-hyperscript')
  , _ = require('lodash')
  , navigation = require('./navigation')
  , changeNick = require('./change-nick')
  , panes = require('./panes')

function statusScreen(state) {
  if('open' === state.status && _.isEmpty(state.files)) {
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
