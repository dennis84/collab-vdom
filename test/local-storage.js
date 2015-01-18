function LocalStorage() {
  this.data = {}
}

LocalStorage.prototype.setItem = function(key, value) {
  this.data[key] = value
}

LocalStorage.prototype.getItem = function(key) {
  return this.data[key]
}

LocalStorage.prototype.removeItem = function(key) {
  delete this.data[key]
}

module.exports = LocalStorage
