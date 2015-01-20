var h = require('virtual-dom/h')
  , hljs = require('highlight.js')
  , hook = require('./hook')
  , cursor = require('./cursor')

function makeLineNumbers(code) {
  var lines = code.split("\n")
  return h('div.line-numbers', lines.map(function(ln) {
    return h('span')
  }))
}

function highlightCode(file) {
  if(hljs.getLanguage(file.lang)) {
    return hljs.highlight(file.lang, file.content)
  }

  return hljs.highlightAuto(file.content)
}

module.exports = function(file, cursors) {
  return h('pre.content', h('code.highlight', [
    makeLineNumbers(file.content),
    h('div.code', [
      h('div', {'html': hook(function(node) {
        node.innerHTML = highlightCode(file).value
      })}),
      h('div.cursors', cursors.map(cursor))
    ]) 
  ]))
}
