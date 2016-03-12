var objectAssign = require('object-assign')
var yo = require('yo-yo')
var csjs = require('csjs')
var domcss = require('dom-css')
var update = require('./update.js')

module.exports = function tbody (rows, opts) {
  console.time('tbody')
  opts = objectAssign({
    height: 500,
    rowHeight: 30
  }, opts)
  var scrollTop = 0
  var visibleStart = 0
  var visibleEnd = 0
  var displayStart = 0
  var displayEnd = 0
  var scrollTop = 0
  var element = render(partialRows(rows, scrollTop))
  console.timeEnd('tbody')
  return element

  function render (rows) {
    var tbody = yo`<div class="${styles.tbody}" onscroll=${onscroll}>
      ${toprow()}
      ${rows.map(function (row) {
        if (!row || row.length < 1 || row[0].length <= 1) return ''
        return yo`<div class="${styles.row}">
          ${row.map(function (col) {
            return yo`<div class="${styles.td}">${col}</div>`
          })}
        </div>`
      })}
      ${bottomrow()}
    </div>`
    return tbody
  }

  function onscroll () {
    var section = partialRows(rows, this.scrollTop)
    update('.' + styles.tbody, render(section))
  }

  function toprow () {
    var row = yo`<div></div>`
    domcss(row, 'height', displayStart * opts.rowHeight)
    return row
  }

  function bottomrow () {
    var row = yo`<div></div>`
    domcss(row, 'height', (rows.length - displayEnd) * opts.rowHeight)
    return row
  }

  function partialRows (rows, scrollTop) {
    var total = rows.length
    var rowsPerBody = Math.floor((opts.height - 2) / opts.rowHeight)
    visibleStart = Math.round(Math.floor(scrollTop / opts.rowHeight))
    visibleEnd = Math.round(Math.min(visibleStart + rowsPerBody))
    displayStart = Math.round(Math.max(0, Math.floor(scrollTop / opts.rowHeight) - rowsPerBody * 1.5))
    displayEnd = Math.round(Math.min(displayStart + 4 * rowsPerBody, total))
    return rows.slice(displayStart, displayEnd)
  }
}

var styles = module.exports.styles = csjs`
.tbody {
  overflow: auto;
  height: 500px;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.td {
  flex: 1;
  border: 1px solid #27ae60;
  padding: .5em;
  text-overflow: ellipsis;
  overflow: hidden;
}
.row:nth-child(even) {
  background-color: #F5F5F5;
}
`
