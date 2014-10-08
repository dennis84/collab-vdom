var h = require('virtual-hyperscript')
  , _ = require('lodash')
  , highlight = require('./highlight')
  , cursor = require('./cursor')

function pane(file, cursors) {
  return h('div.pane', [
    h('pre.content', highlight(file)),
    h('div.filename', file.file),
    h('div.cursors', _.map(cursors, function(c) {
      return cursor(c)
    }))
  ])
}

module.exports = function(state) {
  return h('div.editor', _.map(state.files, function(file) {
    return pane(file, _.filter(state.cursors, function(cursor) {
      return cursor.file === file.file
    }))
  }))
}
