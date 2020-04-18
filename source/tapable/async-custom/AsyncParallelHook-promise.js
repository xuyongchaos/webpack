
// SyncHook的原理

class AsyncParallelHook {
  constructor() {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push({
      name,
      task
    })
  }

  promise(...args) {
    const tasks = this.tasks.map(task => task(...args))
    return Promise.all(tasks)
  }
}

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapPromise('a', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          resolve()
        }, 2000)
      })
    })
    this.hooks.arch.tapPromise('react', (name, cb) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name)
          resolve()
        }, 2000)
      })
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.promise('world').then(() => {
      // 这个方法是所有的promise全部执行完之后才会调用这个的
      console.log('end')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()
