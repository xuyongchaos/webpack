
// SyncHook的原理

module.exports = class SyncWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const [first, ...others] = this.tasks
    const ret = first(...args)
    others.reduce((a, b) => {
      if (a === undefined) {
        return b(...args)
      } else {
        return b(a)
      }
    }, ret)
  }
}

