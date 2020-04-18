
// SyncHook的原理

module.exports = class SyncHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push({
      name,
      task
    })
  }

  call(...args) {
    this.tasks.forEach(item => {
      item.task.call(null, ...args)
    })
  }
}
