function Hook(fn) {
  this.fn = fn
}

Hook.prototype.hook = function(node, propName) {
  this.fn.apply(this, [node, propName])
}

function hook(fn) {
  return new Hook(fn)
}

module.exports = hook
