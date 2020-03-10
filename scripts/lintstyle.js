'use strict'

const { execSync } = require('child_process')
const stylelint = require('stylelint')

console.log('-------- lintstyle ---------')
try {
  var ret = execSync('git diff --staged --diff-filter=ACMR --name-only', {
    encoding: 'utf-8'
  })
  var files = ret.split('\n') || []
  files = files.filter(x => /\.(css|less|vue)$/.test(x))
  console.log(files)
  stylelint
    .lint({
      files: files,
      syntax: 'less',
      fix: true
    })
    .then(ret => {
      console.log(ret.results)
    })
} catch (err) {
  throw new Error(err)
}
