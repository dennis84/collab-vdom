var diff = require('virtual-dom/diff')
  , patch = require('virtual-dom/patch')
  , createElement = require('virtual-dom/create-element')
  , debounce = require('debounce')
  , raf = require('raf')
  , data = require('./data')
  , ctrl = require('./ctrl')
  , Connection = require('./connection')
  , ContentPatch = require('./patch')

var room = location.hash.substring(1)

if(!room) {
  var fs = require('fs')
  var html = fs.readFileSync(__dirname + '/../html/home.html', 'utf8')
  document.body.innerHTML = html
} else {
  var state = data.state()
  var events = {
    'showFile': ctrl.showFile.bind(null, state),
    'follow': ctrl.follow.bind(null, state)
  }

  var conn = new Connection(require('./ws-url'))
    , editor = require('./editor')
    , tree = editor(state, events, conn)
    , node = createElement(tree)
  document.body.appendChild(node)

  state.on('change', function(current) {
    raf(function() {
      var updated = editor(current, events, conn)
        , patches = diff(tree, updated)
      node = patch(node, patches)
      tree = updated
    })
  })

  var p = new ContentPatch
  conn.on('opened', ctrl.opened.bind(null, state))
  conn.on('closed', ctrl.closed.bind(null, state))
  conn.on('members', ctrl.members.bind(null, state))
  conn.on('join', ctrl.join.bind(null, state))
  conn.on('leave', ctrl.leave.bind(null, state))
  conn.on('change-nick', ctrl.changeNick.bind(null, state))
  conn.on('code', ctrl.code.bind(null, p, state))
  conn.on('cursor', debounce(ctrl.cursor.bind(null, state), 100))
  conn.connect(room)

  setInterval(function() {
    conn.send('ping')
  }, 30000)
}
