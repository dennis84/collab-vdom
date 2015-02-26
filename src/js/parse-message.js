function parse(text) {
  var res = text.match(/^([a-z-]+)?@?([a-z0-9]+)?(.*)$/)
    , data = null

  try {
    var data = JSON.parse(res[3])
  } catch(e) {}

  return {
    event: res[1]
  , sender: res[2]
  , data: data
  }
}

module.exports = parse
