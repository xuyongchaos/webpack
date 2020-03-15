'use strict'

const { execSync } = require('child_process')

module.exports = async function() {
  try {
    var ret = execSync('git diff --staged --diff-filter=ACMR --name-only', {
      encoding: 'utf-8'
    })
    var files = ret.split('\n') || []
    files = files.filter(x => /\.(css|less|vue)$/.test(x))
    return files
  } catch (err) {
    console.error(err)
    process.exit(128)
  }
}
