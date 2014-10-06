var emitter = require('emitter-component')

function Connection(url) {
  this.url = url
  this.ws = null
}

emitter(Connection.prototype)

Connection.prototype.connect = function(room) {
  var connection = this
  this.ws = new WebSocket(this.url + '/' + room)
  this.ws.onopen = function() {
    connection.emit('opened', connection)
  }

  this.ws.onclose = function() {
    connection.emit('closed', connection)
  }

  this.ws.onmessage = function(e) {
    var pos = e.data.search(/[{\[]/)
      , evt = e.data.substring(0, pos)
      , data = e.data.substring(pos)
    connection.emit(evt, JSON.parse(data))
  }
}

Connection.prototype.send = function(e, data) {
  var message = e
  if (undefined !== data) {
    message += JSON.stringify(data)
  }

  return this.ws.send(message)
}

module.exports = Connection
