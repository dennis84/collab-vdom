var h = require('virtual-hyperscript')
  , hljs = require('highlight.js')
  , hook = require('./hook')

function makeLineNumbers(code) {
  var lines = code.split("\n")
  return h('span.line-numbers-rows', lines.map(function(ln) {
    return h('span')
  }))
}

function highlightCode(file) {
  if(hljs.getLanguage(file.lang)) {
    return hljs.highlight(file.lang, file.content)
  }

  return hljs.highlightAuto(file.content)
}

module.exports = function(file) {
  return h('code.hljs', [
    h('span', {
      'html': hook(function(node) {
        node.innerHTML = highlightCode(file).value
      })
    }),
    makeLineNumbers(file.content)
  ])
}
