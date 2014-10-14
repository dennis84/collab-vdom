var diff = require('virtual-dom/diff')
  , patch = require('virtual-dom/patch')
  , createElement = require('virtual-dom/create-element')
  , emitter = require('emitter-component')
  , ctrl = require('./ctrl')
  , Connection = require('./connection')
  , raf = require('raf')
  , data = require('./data')

var room = location.hash.substring(1)

if(!room) {
  var home = require('../html/home.html')
  document.body.innerHTML = home
} else {
  var state = data.state()
  var events = {
    'showFile': handle.bind(null, ctrl.showFile),
    'follow': handle.bind(null, ctrl.follow)
  }

  function handle(fn) {
    var args = [].slice.call(arguments).slice(1)
    fn.apply(null, [state].concat(args))
  }

  var conn = new Connection('ws://localhost:9000')
    , editor = require('./editor')
    , tree = editor(state, events, conn)
    , node = createElement(tree)
  document.body.appendChild(node)

  state.on('change', function(current) {
    raf(function () {
      var updated = editor(current, events, conn)
        , patches = diff(tree, updated)
      node = patch(node, patches)
      tree = updated
    })
  })

  conn.on('opened', handle.bind(null, ctrl.opened))
  conn.on('closed', handle.bind(null, ctrl.closed))
  conn.on('members', handle.bind(null, ctrl.members))
  conn.on('join', handle.bind(null, ctrl.join))
  conn.on('leave', handle.bind(null, ctrl.leave))
  conn.on('change-nick', handle.bind(null, ctrl.changeNick))
  conn.on('code', handle.bind(null, ctrl.code))
  conn.on('cursor', handle.bind(null, ctrl.cursor))

  conn.connect(room)
}
