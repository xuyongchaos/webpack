// const { SyncHook }  = require('tapable')
const SyncHook = require('./SyncHook.js')
class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', function(name) {
      console.log('node', name)
    })
    this.hooks.arch.tap('b', function(name) {
      console.log('react', name)
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
