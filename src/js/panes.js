var h = require('virtual-dom/h')
  , content = require('./content')
  , scrollTo = require('./scroll-to')
  , hook = require('./hook')

function pane(file, cursors, follow) {
  return h('div.pane', {
    'className': file.active ? '' : 'hidden',
    'scroll': hook(function(node) {
      var firstCursor = cursors[0]
      if(undefined !== firstCursor && true === follow) {
        scrollTo(node, firstCursor.y)
      }
    })
  }, content(file, cursors))
}

module.exports = function(state) {
  return h('div.editor', state.files.map(function(file) {
    return pane(file, state.cursors.filter(function(cursor) {
      return cursor.file === file.id
    }), state.follow)
  }))
}
