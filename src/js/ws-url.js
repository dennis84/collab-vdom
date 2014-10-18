if('localhost' === window.location.hostname) {
  module.exports = 'ws://localhost:9000'
} else {
  module.exports = 'wss://radiant-dusk-8167.herokuapp.com'
}
