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
  if(undefined === findById(state.members, data.id)) {
    state.members.push({ id: data.id, name: data.id })
    state.emit('change', state)
  }
}

function leave(state, data) {
  var member = findById(state.members, data.id)
  if (undefined !== member) {
    var index = state.members.indexOf(member)
    state.members.splice(index, 1)
    state.emit('change', state)
  }
}

function changeNick(state, data) {
  var member = findById(state.members, data.id)
  if (undefined !== member) {
    var index = state.members.indexOf(member)
    state.members[index].name = data.name
    state.emit('change', state)
  }
}

function code(state, data) {
  var file = findById(state.files, data.id)
  if(undefined === file) {
    state.files.push(data)
  } else {
    var index = state.files.indexOf(file)
    state.files[index] = data
  }

  state.emit('change', state)
}

function cursor(state, data) {
}

function findById(xs, id) {
  return _.find(xs, function(x) {
    return x.id === id
  })
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
