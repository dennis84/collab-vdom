function Storage(ls, ttl) {
  this.ls = ls
  this.ttl = undefined === ttl ? 10000 : ttl
}

Storage.prototype.set = function(key, data) {
  data.timestamp = Date.now()
  this.ls.setItem(key, JSON.stringify(data))
}

Storage.prototype.get = function(key) {
  var data = this.ls.getItem(key)
  if(!data) return
  data = JSON.parse(data)
  if(data.timestamp + this.ttl < Date.now()) {
    this.ls.removeItem(key)
    return
  }
  delete data['timestamp']
  return data
}

module.exports = Storage
