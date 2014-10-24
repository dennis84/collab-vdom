var h = require('virtual-hyperscript')

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
    }
  }, h('div.cursor'))
}
