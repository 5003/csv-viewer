var csvViewer = require('../index.js')
var yo = require('yo-yo')
var createRouter = require('base-router')
var parseCSV = require('babyparse').parse
var nets = require('nets')

// Create a route that loads our model
var router = createRouter({
  '/:file': function (params, done) {
    nets({
      url: 'example/' + (params.file || 'example.csv')
    }, function (err, res, csv) {
      csv = parseCSV(csv.toString())
      // TODO: Check for errors in csv
      done(err, csv)
    })
  }
}, { location: 'hash' })

// Create a loading state
var loading = yo`<div className="loading"><i className="fa fa-spinner fa-spin"></i> Loading files....</div>`
router.on('loading', function () {
  yo.update(app, render(loading))
})

// On successful transitions, render the app
router.on('transition', function (router, csv) {
  yo.update(app, render(csvViewer(csv.data)))
})

// Main application
function render (contents) {
  var nav = [
    'example.csv',
    'big.csv',
    'transactions.csv'
  ]
  return yo`<div className="app">
    <nav>
      <h3>CSV Viewer</h3>
      ${nav.map(function (item) {
        return yo`<button onclick=${function () {
          router.transitionTo('/' + item)
        }}>${item}</button>`
      })}
    </nav>
    <div class="contents">
      ${contents}
    </div>
  </div>`
}

// Initial render
var app = render(loading)
document.body.appendChild(app)

// Start by going to example.csv
router.transitionTo('/')
