var DiffMatchPatch = require('diff-match-patch')

function Patch(dmp) {
  this.dmp = dmp || new DiffMatchPatch
}

Patch.prototype.patch = function(old, patch) {
  if(!isPatch(patch)) return patch

  var patches = this.dmp.patch_fromText(patch)
    , result = this.dmp.patch_apply(patches, old)
  return result[0]
}

function isPatch(text) {
  var pattern = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/m
  return pattern.test(text)
}

module.exports = Patch
