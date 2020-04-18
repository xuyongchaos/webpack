const SyncLoopHook = require('./SyncLoopHook')
// 同步遇到某个不返回undefined的监听函数会执行多次

class Lesson {
  constructor() {
    this.index = 0
    this.hooks = {
      arch: new SyncLoopHook(['arch', 'a'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', (name) => {
      console.log('node', name)
      return ++this.index === 3 ? undefined : '继续学'
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
