var assert = require('assert')
  , DiffMatchPatch = require('diff-match-patch')
  , Patch = require('../src/js/patch')

describe('patch', function() {
  describe('initialize', function() {
    it('should be possible to pass dmp', function() {
      var dmp = new DiffMatchPatch
      var p = new Patch
      assert.notEqual(dmp, p.dmp)

      var dmp = new DiffMatchPatch
      var p = new Patch(dmp)
      assert.equal(dmp, p.dmp)
    })
  })

  describe('patch', function() {
    var p = new Patch
      , dmp = new DiffMatchPatch

    it('should do nothing with invalid patches', function() {
      assert.equal('foo', p.patch('', 'foo'))
    })

    it('should patch with valid format', function() {
      var patches = dmp.patch_make('foo', 'Foo')
        , text = dmp.patch_toText(patches)
      assert.equal('Foo', p.patch('foo', 'Foo'))
    })
  })
})
