function state() {
  return {
    members: [],
    files: [],
    cursors: [],
    status: null,
    follow: true
  }
}

function member(data) {
  return {
    id: data.id,
    name: data.name,
    me: data.me || false,
    coding: false
  }
}

function file(data) {
  return {
    id: data.file,
    content: data.content,
    lang: data.lang
  }
}

function cursor(data) {
  return {
    id: data.sender,
    file: data.file,
    nick: data.nick || null,
    x: data.x,
    y: data.y
  }
}

module.exports = {
  state: state
, member: member
, file: file
, cursor: cursor
}
