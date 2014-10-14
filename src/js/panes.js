var h = require('virtual-hyperscript')
  , _ = require('lodash')
  , highlight = require('./highlight')
  , cursor = require('./cursor')
  , scrollTo = require('./scroll-to')
  , hook = require('./hook')

function pane(file, cursors, follow) {
  return h('div.pane', {
    'className': file.active ? '' : 'hidden',
    'scroll': hook(function(node) {
      var firstCursor = _.first(cursors)
      if(undefined !== firstCursor && true === follow) {
        scrollTo(node, firstCursor.y)
      }
    })
  }, [
    h('pre.content', highlight(file)),
    h('div.filename', file.id),
    h('div.cursors', _.map(cursors, function(c) {
      return cursor(c)
    }))
  ])
}

module.exports = function(state) {
  return h('div.editor', _.map(state.files, function(file) {
    return pane(file, _.filter(state.cursors, function(cursor) {
      return cursor.file === file.id
    }), state.follow)
  }))
}
