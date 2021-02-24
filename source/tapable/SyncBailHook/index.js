const { SyncBailHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', function(name) {
      console.log('node', name)
      return undefined
    })
    this.hooks.arch.tap('b', function(name) {
      console.log('react', name)
      return '返回一个不为 === undefined的值，就会阻断后续的代码'
    })

    this.hooks.arch.tap('c', function () {
        console.log('js')
    })
  }

  // 触发事件
  start() {
    this.hooks.arch.call('world')
  }
}

var a = new Lesson()
a.tap()
a.start()
