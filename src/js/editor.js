var h = require('virtual-hyperscript')
  , _ = require('lodash')
  , navigation = require('./navigation')
  , changeNick = require('./change-nick')
  , panes = require('./panes')
  , scrollTo = require('./scroll-to')

function statusScreen(state) {
  if('open' === state.status && _.isEmpty(state.files)) {
    return require('./status-opened')
  }

  if('closed' === state.status) {
    return require('./status-closed')
  }
}

module.exports = function(state, conn) {
  return h('div.layout', [
    navigation(state),
    h('div.editor-wrapper', [
      statusScreen(state),
      panes(state)
    ]),
    changeNick(state, conn)
  ])
}
