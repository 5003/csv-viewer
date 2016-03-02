var csvViewer = require('../index.js')
var $ = require('bel')
var createRouter = require('base-router')
var parseCSV = require('babyparse').parse
var nets = require('nets')

// Create a route that loads our model
var router = createRouter({
  '/csv-viewer/:file': function (params, done) {
    nets({
      url: '/csv-viewer/example/' + (params.file || 'example.csv')
    }, function (err, res, csv) {
      csv = parseCSV(csv.toString())
      // TODO: Check for errors in csv
      done(err, csv)
    })
  }
})

// Create a loading state
var loading = $`<div className="loading"><i className="fa fa-spinner fa-spin"></i> Loading files....</div>`
router.on('loading', function () {
  app.update(render(loading))
})

// On successful transitions, render the app
router.on('transition', function (router, csv) {
  app.update(render(csvViewer(csv.data)))
})

// Main application
function render (contents) {
  var nav = [
    'example.csv',
    'big.csv',
    'transactions.csv'
  ]
  return $`<div className="app">
    <nav>
      <h3>CSV Viewer</h3>
      ${nav.map(function (item) {
        return $`<button onclick=${function () {
          router.transitionTo('/csv-viewer/' + item)
        }}>${item}</button>`
      })}
    </nav>
    ${contents}
  </div>`
}

// Initial render
var app = render(loading)
document.body.appendChild(app)

// Start by going to example.csv
router.transitionTo('/csv-viewer')
