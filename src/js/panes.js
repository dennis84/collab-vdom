var h = require('virtual-hyperscript')
  , _ = require('lodash')
  , highlight = require('./highlight')

function pane(file) {
  return h('div.pane', [
    h('pre.content', highlight(file)),
    h('div.filename', file.file)
  ])
}

module.exports = function(state) {
  var files = state.files
  return h('div.editor', _.map(files, function(file) {
    return pane(file)
  }))
}
