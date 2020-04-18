
// SyncHook的原理

module.exports = class SyncBailHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let res = true
    let i = 0
    do {
      res = this.tasks[i++].call(null, ...args)
    } while (i < this.tasks.length && res === undefined)
  }
}

