'use strict'

const getFileStaged = require('./getFileStaged')
const { execSync } = require('child_process')

async function main() {
  try {
    var files = await getFileStaged()
    if (files.length > 0) {
      execSync(`git add ${files.join(' ')}`, {
        encoding: 'utf-8'
      })
    }
  } catch (err) {
    console.error(err)
    process.exit(128)
  }
}

main()
