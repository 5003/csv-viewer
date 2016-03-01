var test = require('tape')
var explorer = require('./index.js')

test('basically works', function (t) {
  t.plan(2)
  var files = [
    {
      path: 'bears',
      type: 'folder',
      mtime: new Date(),
      children: [
        {
          path: 'bears/grizzly.js',
          type: 'file',
          mtime: new Date()
        }
      ]
    }
  ]
  var element = explorer(files)
  var treeButton = element.querySelector('.fs-explorer-tree button')
  t.equal(treeButton.textContent, 'bears', 'tree should display the folder name')
  t.equal(treeButton.className, 'folder', 'tree should have the class folder on folders')
  t.end()
})
