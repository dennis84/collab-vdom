var assert = require('assert')
  , emitter = require('emitter-component')
  , DiffMatchPatch = require('diff-match-patch')
  , Patch = require('../src/js/patch')
  , ctrl = require('../src/js/ctrl')
  , d = require('../src/js/data')
  , Storage = require('../src/js/storage')
  , LocalStorage = require('./local-storage')

describe('ctrl', function() {
  function Connection() {}
  Connection.prototype.send = function() {}
  var conn = new Connection

  describe('opened', function() {
    it('should change the state', function() {
      var state = d.state()
        , storage = new Storage(new LocalStorage)
      ctrl.opened(state, storage, conn)
      assert.equal('open', state.status)
    })
  })

  describe('closed', function() {
    it('should change the state', function() {
      var state = d.state()
        , storage = new Storage(new LocalStorage)
      ctrl.closed(state, storage)
      assert.equal('closed', state.status)
    })
  })

  describe('members', function() {
    it('should add members', function() {
      var state = d.state()
      var members = [{id: 1, name: 'foo'}, {id: 2, name: 'bar'}]
      ctrl.members(state, members)
      assert.equal(2, state.members.length)
    })
  })

  describe('join', function() {
    it('should add a member', function() {
      var state = d.state()
      ctrl.join(state, {'id': 1})
      assert.equal(1, state.members.length)
      assert.equal(1, state.members[0].name)
      ctrl.join(state, {'id': 1})
      assert.equal(1, state.members.length)
      ctrl.join(state, {'id': 2, 'name': 'foo'})
      assert.equal(2, state.members.length)
      assert.equal('foo', state.members[1].name)
    })
  })

  describe('leave', function() {
    it('should remove a member', function() {
      var state = d.state()
      state.members = [
        d.member({'id': 1, 'name': 'foo'}),
        d.member({'id': 2, 'name': 'bar'})
      ]
      state.cursors = [
        d.cursor({'sender': 1, 'file': '', 'x': 1, 'y': 1})
      ]

      ctrl.leave(state, {'id': 1, 'name': 'foo'})
      assert.equal(1, state.members.length)
      assert.equal(0, state.cursors.length)
      ctrl.leave(state, {'id': 2, 'name': 'bar'})
      assert.equal(0, state.members.length)
      ctrl.leave(state, {'id': 3, 'name': 'baz'})
      assert.equal(0, state.members.length)
    })
  })

  describe('changeNick', function() {
    it('should change the nickname', function() {
      var state = d.state()
      state.members = [d.member({'id': 1, 'name': 'foo'})]
      state.cursors = [d.cursor({'sender': 1, 'file': '', 'x': 1, 'y': 1})]
      state.messages = [d.message({'sender': 1, 'text': ''})]
      ctrl.changeNick(state, {'id': 1, 'name': 'bar'})
      assert.equal('bar', state.members[0].name)
      assert.equal('bar', state.cursors[0].nick)
      assert.equal('bar', state.messages[0].nick)
    })
  })

  describe('code', function() {
    it('should add or update files', function() {
      var state = d.state()
        , patch = new Patch

      ctrl.code(patch, state, {'file': 'hello.js', 'content': ''})
      assert.equal(1, state.files.length)
      ctrl.code(patch, state, {'file': 'hello.js', 'content': 'hello'})
      assert.equal(1, state.files.length)
      assert.equal('hello', state.files[0].content)
      ctrl.code(patch, state, {'file': 'world.js', 'content': 'world'})
      assert.equal('world', state.files[1].content)
    })

    it('should patch files', function() {
      var state = d.state()
        , dmp = new DiffMatchPatch
        , patch = new Patch(dmp)

      ctrl.code(patch, state, {'file': 'hello.js', 'content': 'foo'})

      var patches = dmp.patch_make('foo', 'Foo')
        , text = dmp.patch_toText(patches)

      ctrl.code(patch, state, {'file': 'hello.js', 'content': text})
      assert.equal('Foo', state.files[0].content)
    })
  })

  describe('cursor', function() {
    it('should add or update cursors', function() {
      var state = d.state()
      state.members = [d.member({'id': 1, 'name': 'foo', 'y': 1})]
      state.files = [d.file({'file': 'hello.js', 'content': 'hello'})]

      ctrl.cursor(state, {'file': 'hello.js', 'y': 1}, 1)
      assert.equal('foo', state.cursors[0].nick)
      assert.equal(1, state.cursors.length)
      ctrl.cursor(state, {'file': 'hello.js', 'y': 1}, 2)
      assert.equal(2, state.cursors.length)
      assert.equal(1, state.cursors[1].y)
      ctrl.cursor(state, {'file': 'world.js', 'y': 2}, 2)
      assert.equal(2, state.cursors.length)
      assert.equal(2, state.cursors[1].y)
    })
  })

  describe('showFile', function() {
    it('should active/deactivate files', function() {
      var state = d.state()
      state.files = [
        d.file({'file': 'foo.js', 'active': false}),
        d.file({'file': 'bar.js', 'active': false}),
        d.file({'file': 'baz.js', 'active': true})
      ]
      ctrl.showFile(state, 'foo.js')
      assert.equal(true, state.files[0].active)
      assert.equal(false, state.files[1].active)
      assert.equal(false, state.files[2].active)
    })
  })

  describe('follow', function() {
    it('change the state', function() {
      var state = d.state()
      assert.equal(true, state.follow)
      ctrl.follow(state, false)
      assert.equal(false, state.follow)
    })
  })

  describe('message', function() {
    it('adds a message', function() {
      var state = d.state()
      assert.equal(0, state.unreadMessages)

      ctrl.message(state, {'text': 'a'}, 1)
      assert.equal('a', state.messages[0].text)
      assert.equal(1, state.messages[0].author)
      assert.equal(1, state.messages[0].nick)
      assert.equal(1, state.unreadMessages)
      ctrl.message(state, {'text': 'b'}, 2)
      assert.equal('b', state.messages[1].text)

      ctrl.toggleChat(state)
      assert.equal(0, state.unreadMessages)
    })
  })
})
