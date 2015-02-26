var assert = require('assert')
  , parse = require('../src/js/parse-message')

describe('parse-message', function() {
  it('should parse', function() {
    var res = parse('foo@bar{}')
    assert.equal('foo', res.event)
    assert.equal('bar', res.sender)
    assert.deepEqual({}, res.data)

    var res = parse('foo@bar')
    assert.equal('foo', res.event)
    assert.equal('bar', res.sender)
    assert.equal(null, res.data)

    var res = parse('foo')
    assert.equal('foo', res.event)
    assert.equal(undefined, res.sender)
    assert.equal(null, res.data)

    var res = parse('')
    assert.equal(undefined, res.event)
    assert.equal(undefined, res.sender)
    assert.equal(null, res.data)

    var res = parse('@@')
    assert.equal(undefined, res.event)
    assert.equal(undefined, res.sender)
    assert.equal(null, res.data)
  })
})
