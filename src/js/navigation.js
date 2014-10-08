var h = require('virtual-hyperscript')
  , _ = require('lodash')
  , ctrl = require('./ctrl')

function makeFile(state, file) {
  return h('li.list-group-item', h('a', {
    'onclick': function(e) {
      ctrl.showFile(state, file)
    }
  }, file.file))
}

module.exports = function(state) {
  return h('div.navigation', [
    h('ul.list-group', [
      h('li.list-group-item', [
        'Follow',
        h('input.pull-right', {
          'type': 'checkbox',
          'checked': state.follow,
          'onclick': function(e) {
            state.follow = !state.follow
          }
        })
      ]),
      h('li.list-group-item', [
        'Online',
        h('span.label.label-primary.pull-right', String(state.members.length))
      ]),
      h('li.list-group-item',
        h('a', {
          'attributes': {
            'data-toggle': 'modal',
            'data-target': '#change-nick'
          }
        }, 'Change Nickname'))
    ]),
    h('h3', "Who's Online"),
    h('ul.list-group', _.map(state.members, function(member) {
      return h('li.list-group-item', member.name)
    })),
    h('h3', "Files"),
    h('ul.list-group', _.map(state.files, function(file) {
      return makeFile(state, file)
    }))
  ])
}
