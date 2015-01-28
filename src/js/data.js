var emitter = require('emitter-component')

function state() {
  return emitter({
    members: [],
    files: [],
    cursors: [],
    status: null,
    follow: true,
    chat: false,
    messages: [],
    unreadMessages: 0
  })
}

function member(data) {
  return {
    id: data.id,
    name: data.name || data.id,
    me: data.me || false,
    coding: false
  }
}

function file(data) {
  return {
    id: data.file,
    content: data.content,
    lang: data.lang,
    active: false
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

function message(data) {
  return {
    author: data.sender,
    nick: data.nick || data.sender,
    text: data.text,
    createdAt: Date.now()
  }
}

module.exports = {
  state: state
, member: member
, file: file
, cursor: cursor
, message: message
}
