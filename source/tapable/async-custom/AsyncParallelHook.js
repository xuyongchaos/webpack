
// SyncHook的原理

module.exports = class AsyncParallelHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const cb = args.pop()
    let index = 0
    const done = () => {
      index++
      if (index === this.tasks.length) {
        cb()
      }
    }
    this.tasks.forEach(task => {
      task(...args, done)
    })
  }
}

