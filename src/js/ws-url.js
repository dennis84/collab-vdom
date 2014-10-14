if('localhost' === window.location.hostname) {
  module.exports = 'ws://localhost:9000'
} else {
  module.exports = 'wss://polar-woodland-4270.herokuapp.com'
}
