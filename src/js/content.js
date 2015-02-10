var h = require('virtual-dom/h')
  , hljs = require('highlight.js')
  , hook = require('./hook')
  , cursor = require('./cursor')
  , Thunk = require('vdom-thunk')

function makeLineNumbers(code) {
  var lines = code.split("\n")
  return h('div.line-numbers', lines.map(function(ln) {
    return h('span')
  }))
}

function highlightCode(file, fn) {
  if(hljs.getLanguage(file.lang)) {
    return hljs.highlight(file.lang, file.content).value
  }

  return hljs.highlightAuto(file.content).value
}

function code(file) {
  return h('div', {'html': hook(function(node) {
    node.innerHTML = highlightCode(file)
  })})
}

module.exports = function(file, cursors) {
  return h('pre.content', h('code.highlight', [
    makeLineNumbers(file.content),
    h('div.code', [
      Thunk(code, file),
      h('div.cursors', cursors.map(cursor))
    ]) 
  ]))
}
