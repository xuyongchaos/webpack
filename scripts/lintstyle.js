'use strict'

const { execSync } = require('child_process')
const stylelint = require('stylelint')
const path = require('path')
const chalk = require('chalk')

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
      fix: true,
      configFile: path.join(__dirname, '../.stylelintrc.js')
    })
    .then(ret => {
      if (ret.errored) {
        const filterRets = ret.results.filter(x => x.errored)
        filterRets.forEach(x => {
          console.log(`source: ${x.source}`)
          if (x.warnings.length > 0) {
            x.warnings.forEach(warning => {
              console.log(chalk.blue(`warnings:${JSON.stringify(warning)}`))
            })
          }
          if (x.parseErrors.length > 0) {
            x.parseErrors.forEach(error => {
              console.log(chalk.red(`parseErrors:${JSON.stringify(error)}`))
            })
          }
        })
        process.exit(-1)
      }
    })
    .catch(err => {
      throw new Error(err)
    })
} catch (err) {
  throw new Error(err)
}
