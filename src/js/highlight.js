var h = require('virtual-hyperscript')
  , _ = require('lodash')
  , hljs = require('highlight.js')

function InnerHtml(value) {
  this.value = value
}

InnerHtml.prototype.hook = function(node, propName) {
  node.innerHTML = this.value
}

function makeLineNumbers(code) {
  var lines = code.split("\n")
  return h('span.line-numbers-rows', _.map(lines, function(ln) {
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
  var code = highlightCode(file)
  return h('code.hljs', [
    h('span', {'html': new InnerHtml(code.value)}),
    makeLineNumbers(file.content)
  ])
}
