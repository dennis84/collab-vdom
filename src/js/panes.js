var h = require('virtual-dom/h')
  , highlight = require('./highlight')
  , cursor = require('./cursor')
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
  }, [
    h('pre.content', highlight(file)),
    h('div.cursors', cursors.map(cursor))
  ])
}

module.exports = function(state) {
  return h('div.editor', state.files.map(function(file) {
    return pane(file, state.cursors.filter(function(cursor) {
      return cursor.file === file.id
    }), state.follow)
  }))
}
