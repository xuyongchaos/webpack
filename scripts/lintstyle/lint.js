'use strict'

const getFileStaged = require('./getFileStaged')
const stylelint = require('stylelint')
const path = require('path')
const chalk = require('chalk')
const log = console.log

async function main() {
  try {
    var files = await getFileStaged()
    if (files.length) {
      stylelint
        .lint({
          files: files,
          fix: true,
          configFile: path.join(__dirname, '../../.stylelintrc.js')
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
          console.error(err)
          process.exit(128)
        })
    }
  } catch (err) {
    console.error(err)
    process.exit(128)
  }
}

main()
