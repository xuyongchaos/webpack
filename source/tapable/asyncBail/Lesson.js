const { AsyncParallelBailHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelBailHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapPromise('a', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          reject('wrong')
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('b', (name) => {
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
      console.log('success')
    }).catch(() => {
      console.log('fail')
    })
  }
}

var a = new Lesson()
a.tap()
a.start()

