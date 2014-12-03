var h = require('virtual-dom/virtual-hyperscript')
  , Modal = require('./modal')
  , changeNick = require('./change-nick')

function makeFile(file, events) {
  return h('li.list-group-item', h('a.link', {
    'className': file.active ? 'active' : '',
    'onclick': function(e) {
      events.showFile(file.id)
    }
  }, file.id))
}

function makeMember(member) {
  var icon = ''
  if(member.coding) {
    icon = 'glyphicon-pencil'
  } else if(member.me) {
    icon = 'glyphicon-user'
  }

  return h('li.list-group-item', [member.name,
    h('i.glyphicon.pull-right', {'className': icon})
  ])
}

module.exports = function(state, events, conn) {
  return h('div.navigation', [
    h('ul.list-group', [
      h('li.list-group-item', [
        'Follow',
        h('input.pull-right', {
          'type': 'checkbox',
          'checked': state.follow,
          'onclick': function(e) {
            events.follow(!state.follow)
          }
        })
      ]),
      h('li.list-group-item', [
        'Online',
        h('span.label.label-primary.pull-right', String(state.members.length))
      ]),
      h('li.list-group-item',
        h('a.link', {
          'onclick': function(e) {
            var modal = new Modal(changeNick.bind(null, conn))
            modal.show()
          }
        }, 'Change Nickname'))
    ]),
    h('h3', "Who's Online"),
    h('ul.list-group', state.members.map(function(member) {
      return makeMember(member)
    })),
    h('h3', 'Files'),
    h('ul.list-group', state.files.map(function(file) {
      return makeFile(file, events)
    }).reverse())
  ])
}
