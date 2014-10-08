var diff = require('virtual-dom/diff')
  , patch = require('virtual-dom/patch')
  , createElement = require('virtual-dom/create-element')
  , emitter = require('emitter-component')
  , ctrl = require('./ctrl')
  , Connection = require('./connection')
  , raf = require('raf')

var room = location.hash.substring(1)

if(!room) {
  var home = require('../html/home.html')
  document.body.innerHTML = home
} else {
  var state = emitter({
    'members': [],
    'files':   [],
    'cursors': [],
    'status':  null,
    'follow':  true
  })

  var conn = new Connection('ws://localhost:9000')
  conn.on('opened', ctrl.opened.bind(null, state))
  conn.on('closed', ctrl.closed.bind(null, state))
  conn.on('members', ctrl.members.bind(null, state))
  conn.on('join', ctrl.join.bind(null, state))
  conn.on('leave', ctrl.leave.bind(null, state))
  conn.on('change-nick', ctrl.changeNick.bind(null, state))
  conn.on('code', ctrl.code.bind(null, state))
  conn.on('cursor', ctrl.cursor.bind(null, state))

  var editor = require('./editor')
    , tree = editor(state, conn)
    , node = createElement(tree)
  document.body.appendChild(node)

  state.on('change', function(s) {
    raf(function () {
      var updated = editor(s, conn)
        , patches = diff(tree, updated)
      node = patch(node, patches)
      tree = updated
    })
  })

  conn.connect(room)
}
