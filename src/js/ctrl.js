var _ = require('lodash')

function opened(state, conn) {
  conn.send('members')
  state.status = 'open'
  return state
}

function closed(state, conn) {
  state.status = 'closed'
  return state
}

function members(state, data) {
  state.members = data
  return state
}

function join(state, data) {
  if(undefined === _.find(state.members, {'id': data.id})) {
    state.members.push({ id: data.id, name: data.id })
  }
  return state
}

function leave(state, data) {
  var member = _.find(state.members, {'id': data.id})
  if (undefined !== member) {
    var index = state.members.indexOf(member)
    state.members.splice(index, 1)
  }
  return state
}

function changeNick(state, data) {
  var member = _.find(state.members, {'id': data.id})
    , cursor = _.find(state.cursors, {'sender': data.id})

  if(undefined !== member) {
    member.name = data.name
  }

  if(undefined !== cursor) {
    cursor.nickname = data.name
  }

  return state
}

function code(state, data) {
  var file = _.find(state.files, {'file': data.file})
  if(undefined === file) {
    state.files.push(data)
  } else {
    file.content = data.content
  }

  followFile(state, data.file)
  return state
}

function cursor(state, data) {
  var cursor = _.find(state.cursors, {'sender': data.sender})
    , member = _.find(state.members, {'id': data.sender})

  if(undefined !== member) {
    data.nickname = member.name
    member.coding = true
  }

  if(undefined === cursor) {
    state.cursors.push(data)
  } else {
    _.extend(cursor, data)
  }

  followFile(state, data.file)
  return state
}

function showFile(state, file) {
  followFile(state, file, true)
  return state
}

function followFile(state, filename, force) {
  if(true === state.follow || true === force) {
    state.files.forEach(function(file) {
      if(filename === file.file) {
        file.active = true
      } else {
        file.active = false
      }
    })
  }
}

function follow(state, value) {
  state.follow = value
  return state
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
}
