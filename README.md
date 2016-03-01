# csv-viewer [![Build Status](http://img.shields.io/travis/shama/csv-viewer.svg)](https://travis-ci.org/shama/csv-viewer)

A WIP CSV viewer element.

![example](https://raw.githubusercontent.com/shama/csv-viewer/master/example/example.gif)

## Installing/Running

```shell
git clone git://github.com/shama/csv-viewer && cd csv-viewer
npm i
npm start
```

Visit `http://localhost:9966`

## Example

[https://shama.github.io/csv-viewer](https://shama.github.io/csv-viewer)

## Usage

```js
var viewer = require('csv-viewer')

// Get some CSV data
var csv = [
  ['Name', 'Address', 'Phone'],
  ['Grizzly', '123 Fake St', '707-123-4567'],
]

// Build the element and attach to page
var element = viewer(csv)
document.body.appendChild(element)
```
