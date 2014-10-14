var h = require('virtual-hyperscript')
  , _ = require('lodash')

function getCursorTop(c) {
  return (c.y - 1) * 23 + 'px'
}

function getCursorLeft(c) {
  return c.x - 1 + 'ch'
}

module.exports = function(cursor) {
  return h('div.cursor-container', {
    'title': cursor.nick || cursor.id,
    'style': {
      'top': getCursorTop(cursor),
      'left': getCursorLeft(cursor)
    },
    'attributes': {
      'data-placement': 'top'
    }
  }, h('div.cursor'))
}
