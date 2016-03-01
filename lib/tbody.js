var objectAssign = require('object-assign')
var $ = require('bel')

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
  var element = render(partialRows(rows, 0))
  console.timeEnd('tbody')
  return element

  function render (rows) {
    var colspan = (rows[0] || []).length
    var top = 'height: ' + (displayStart * opts.rowHeight) + 'px; padding: 0; margin: 0;'
    var bottom = 'height: ' + ((rows.length - displayEnd) * opts.rowHeight) + 'px; padding: 0; margin: 0;'
    return $`<tbody onscroll=${function () {
      var section = partialRows(rows, this.scrollTop)
      element.update(render(section))
    }}>
      ${rows.map(function (row) {
        if (!row || row.length < 1 || row[0].length <= 1) return ''
        return $`<tr>
          ${row.map(function (col) {
            return $`<td>${col}</td>`
          })}
        </tr>`
      })}
    </tbody>`
  }

  // TODO: Calculate a section of table to render a ton of rows
  function partialRows (rows, scrollTop) {
    var total = rows.length
    var rowsPerBody = Math.floor((opts.height - 2) / opts.rowHeight)
    visibleStart = Math.round(Math.floor(scrollTop / opts.rowHeight))
    visibleEnd = Math.round(Math.min(visibleStart + rowsPerBody))
    displayStart = Math.round(Math.max(0, Math.floor(scrollTop / opts.rowHeight) - rowsPerBody * 1.5))
    displayEnd = Math.round(Math.min(displayStart + 4 * rowsPerBody, total))
    //return rows.slice(displayStart, displayEnd)
    return rows
  }
}
