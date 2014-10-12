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
  var state = {
    'members': [],
    'files':   [],
    'cursors': [],
    'status':  null,
    'follow':  true
  }

  var events = {
    'showFile': update.bind(null, ctrl.showFile),
    'follow': update.bind(null, ctrl.follow)
  }

  var conn = new Connection('ws://localhost:9000')
    , editor = require('./editor')
    , tree = editor(state, events, conn)
    , node = createElement(tree)
  document.body.appendChild(node)

  function update(fn) {
    var args = [].slice.call(arguments).slice(1)
    raf(function () {
      state = fn.apply(null, [state].concat(args))
      var updated = editor(state, events, conn)
        , patches = diff(tree, updated)
      node = patch(node, patches)
      tree = updated
    })
  }

  conn.on('opened', update.bind(null, ctrl.opened))
  conn.on('closed', update.bind(null, ctrl.closed))
  conn.on('members', update.bind(null, ctrl.members))
  conn.on('join', update.bind(null, ctrl.join))
  conn.on('leave', update.bind(null, ctrl.leave))
  conn.on('change-nick', update.bind(null, ctrl.changeNick))
  conn.on('code', update.bind(null, ctrl.code))
  conn.on('cursor', update.bind(null, ctrl.cursor))

  conn.connect(room)
}
