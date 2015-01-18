var assert = require('assert')
  , Storage = require('../src/js/storage')
  , LocalStorage = require('./local-storage')

describe('storage', function() {
  it('should set and get data', function() {
    var storage = new Storage(new LocalStorage, 100)

    storage.set('state', {'foo': 'bar'})
    var res = storage.get('state')
    assert.deepEqual(res, {'foo': 'bar'})

    setTimeout(function() {
      assert.deepEqual(res, storage.get('state'))
    }, 10)
  })

  it('should set and get expired data', function() {
    var storage = new Storage(new LocalStorage, 0)

    storage.set('state', {'foo': 'bar'})
    var res = storage.get('state')

    setTimeout(function() {
      assert.equal(undefined, storage.get('state'))
    }, 10)
  })
})
