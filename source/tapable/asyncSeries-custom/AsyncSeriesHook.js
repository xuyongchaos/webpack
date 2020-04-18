module.exports = class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fn = args.pop()
    let index = 0
    const next = () => {
      if (this.tasks.length === index) return fn()
      const task = this.tasks[index++]
      task(...args, next)
    }
    next()
  }
}

