var document = require('global/document')
var yo = require('yo-yo')

module.exports = function update (f, t) {
  if (typeof f === 'string') {
    f = document.querySelector(f)
  }
  yo.update(f, t, {
    onBeforeMorphEl: function (f, t) {
      f.onscroll = t.onscroll
      f.onclick = t.onclick
    },
    onBeforeMorphElChildren: function (f, t) {
      f.onscroll = t.onscroll
      f.onclick = t.onclick
    }
  })
}
