
class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fn = args.pop()
    let index = 0
    const next = (err, data) => {
      const task = this.tasks[index]
      if (!task || err === 'error') return fn()
      if (index === 0) {
        task(data, next)
      } else {
        task(data, next)
      }
      index++
    }
    next(null, ...args)
  }
}

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb('error', '结果')
      }, 1000)
    })
    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
        cb(null)
      }, 1000)
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.callAsync('world', function() {
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()
