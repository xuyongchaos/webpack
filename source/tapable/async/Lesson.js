const { AsyncParallelHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tapAsync('a', (name, cb) => {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 2000)
    })
    this.hooks.arch.tapAsync('b', (name, cb) => {
      setTimeout(() => {
        console.log('react', name)
        cb()
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
