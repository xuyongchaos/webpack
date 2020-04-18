class AsyncSeriesHook {
  constructor() {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    const [first, ...others] = this.tasks
    return others.reduce((p, n) => { // 跟redux的源码一致
      return p.then(() => n(...args))
    }, first(...args))
  }
}

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapPromise('a', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          resolve()
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('b', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name)
          resolve()
        }, 1000)
      })
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.promise('world').then(function() {
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()
