
// SyncHook的原理

module.exports = class SyncLoopHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let index = 0
    let ret
    do {
      ret = this.tasks[index](...args)
      if (ret === undefined) {
        index++
      }
    } while (index < this.tasks.length)
  }
}

