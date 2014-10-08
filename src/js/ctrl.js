var _ = require('lodash')

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
  state.members = data
  state.emit('change', state)
}

function join(state, data) {
  if(undefined === _.findWhere(state.members, {'id': data.id})) {
    state.members.push({ id: data.id, name: data.id })
    state.emit('change', state)
  }
}

function leave(state, data) {
  var member = _.findWhere(state.members, {'id': data.id})
  if (undefined !== member) {
    var index = state.members.indexOf(member)
    state.members.splice(index, 1)
    state.emit('change', state)
  }
}

function changeNick(state, data) {
  var member = _.findWhere(state.members, {'id': data.id})
    , change = false

  if (undefined !== member) {
    var index = state.members.indexOf(member)
    state.members[index].name = data.name
    change = true
  }

  var cursor = _.findWhere(state.cursors, {'sender': data.sender})
  if(undefined !== cursor) {
    var index = state.cursors.indexOf(cursor)
    state.cursors[index].nickname = data.name
    change = true
  }

  if(true === change) {
    state.emit('change', state)
  }
}

function code(state, data) {
  var file = _.findWhere(state.files, {'file': data.file})
  if(undefined === file) {
    state.files.push(data)
  } else {
    var index = state.files.indexOf(file)
    state.files[index] = data
  }

  state.emit('change', state)
}

function cursor(state, data) {
  var cursor = _.findWhere(state.cursors, {'sender': data.sender})
    , member = _.findWhere(state.members, {'id': data.sender})

  if(undefined !== member) {
    data.nickname = member.name
  }

  if(undefined === cursor) {
    state.cursors.push(data)
  } else {
    var index = state.cursors.indexOf(cursor)
    state.cursors[index] = data
  }

  state.emit('change', state)
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
}
