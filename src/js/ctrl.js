var d = require('./data')

function opened(state, conn) {
  conn.send('members')
  state.status = 'open'
  state.emit('change', state)
}

function closed(state, conn) {
  state.status = 'closed'
  state.emit('change', state)
}

function members(state, data) {
  state.members = data.map(d.member)
  state.emit('change', state)
}

function join(state, data) {
  if(undefined === find(state.members, data.id)) {
    state.members.push(d.member(data))
    state.emit('change', state)
  }
}

function leave(state, data) {
  var member = find(state.members, data.id)
    , cursor = find(state.cursors, data.id)

  if(undefined !== member) {
    var index = state.members.indexOf(member)
    state.members.splice(index, 1)
  }

  if(undefined !== cursor) {
    var index = state.cursors.indexOf(cursor)
    state.cursors.splice(index, 1)
  }

  state.emit('change', state)
}

function changeNick(state, data) {
  var member = find(state.members, data.id)
    , cursor = find(state.cursors, data.id)

  if(undefined !== member) {
    member.name = data.name
  }

  if(undefined !== cursor) {
    cursor.nick = data.name
  }

  state.messages.map(function(message) {
    message.nick = data.name
  })

  state.emit('change', state)
}

function code(patch, state, data) {
  var file = find(state.files, data.file)
  data.content = patch.patch((file || {}).content || '', data.content)

  if(undefined === file) {
    state.files.push(d.file(data))
  } else {
    file.content = data.content
  }

  activateFile(state, data.file)
  state.emit('change', state)
}

function cursor(state, data, sender) {
  var cursor = find(state.cursors, sender)
    , member = find(state.members, sender)

  data.sender = sender

  if(undefined !== member) {
    data.nick = member.name
    member.coding = true
  }

  data = d.cursor(data)

  if(undefined === cursor) {
    state.cursors.push(data)
  } else {
    cursor.file = data.file
    cursor.x = data.x
    cursor.y = data.y
  }

  activateFile(state, data.file)
  state.emit('change', state)
}

function showFile(state, file) {
  activateFile(state, file, true)
  state.emit('change', state)
}

function follow(state, value) {
  state.follow = value
  state.emit('change', state)
}

function message(state, data, sender) {
  var member = find(state.members, sender)
  if(undefined !== member) {
    data.nick = member.name
  }

  data.sender = sender
  state.messages.push(d.message(data))

  if(false === state.chat) {
    state.unreadMessages ++
  }

  state.emit('change', state)
}

function toggleChat(state) {
  state.chat = !state.chat
  state.unreadMessages = 0
  state.emit('change', state)
}

function find(collection, id) {
  for(i in collection) {
    if(id === collection[i].id) {
      return collection[i]
    }
  }
}

function activateFile(state, id, force) {
  if(true === state.follow || true === force) {
    state.files.forEach(function(file) {
      if(id === file.id) {
        file.active = true
      } else {
        file.active = false
      }
    })
  }
}

module.exports = {
  'opened': opened
, 'closed': closed
, 'members': members
, 'join': join
, 'leave': leave
, 'changeNick': changeNick
, 'code': code
, 'cursor': cursor
, 'showFile': showFile
, 'follow': follow
, 'message': message
, 'toggleChat': toggleChat
}
