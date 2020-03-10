'use strict'

const { execSync } = require('child_process')
const stylelint = require('stylelint')
const path = require('path')
const chalk = require('chalk')

const log = console.log
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
          log(chalk.white('\n----------------------------------'))
          log(chalk.green(`source: ${x.source}`))
          if (x.warnings.length > 0) {
            x.warnings.forEach(warning => {
              log(chalk.yellow(`warnings:${JSON.stringify(warning)}`))
            })
          }
          if (x.parseErrors.length > 0) {
            x.parseErrors.forEach(error => {
              log(chalk.red(`parseErrors:${JSON.stringify(error)}`))
            })
          }
        })
        process.exit(128)
      }
    })
    .catch(err => {
      throw new Error(err)
      process.exit(128);
    })
} catch (err) {
  throw new Error(err)
}
