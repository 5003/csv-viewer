var yo = require('yo-yo')
var csjs = require('csjs')
var update = require('./lib/update.js')
var tbody = require('./lib/tbody.js')

module.exports = function csvViewer (data, opts) {
  console.time('csvViewer')
  var headerRow = data.splice(0, 1)[0]
  var asc = true
  var sortByIndex = 0
  var element = render(data)
  console.timeEnd('csvViewer')
  return element

  function render (data) {
    return yo`<div class="${className}">
      ${thead(headerRow)}
      ${tbody(data)}
    </div>`
  }

  function thead (row) {
    return yo`<div class="thead">
      <div class="${styles.row}">
        ${row.map(function (col, idx) {
          var icon = ''
          if (idx === sortByIndex) {
            icon = (asc) ? 'fa-caret-down' : 'fa-caret-up'
            icon = yo`<i className="fa ${icon}"></i>`
          }
          return yo`<div class="${styles.th}">
            <button onclick=${function () {
              sort(idx)
            }}>${col} ${icon}</button>
          </div>`
        })}
      </div>
    </div>`
  }

  function sort (idx) {
    asc = !asc
    sortByIndex = idx
    data = data.sort(function (a, b) {
      var x = a[sortByIndex] || ''
      var y = b[sortByIndex] || ''
      return (asc) ? x.localeCompare(y) : y.localeCompare(x)
    })
    update('.' + className, render(data))
  }
}

var styles = module.exports.styles = csjs`
.csv-viewer {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.th {
  flex: 1;
  background-color: #27ae60;
  border: 1px solid #27ae60;
  padding: .5em;
  text-overflow: ellipsis;
  overflow: hidden;
}
.csv-viewer .tr:nth-child(even) {
  background-color: #F5F5F5;
}
`
var className = styles['csv-viewer']
