const { SyncHook } = require('tapable')

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['arch'])
    }
  }
  // 往钩子上注册事件
  tap() {
    this.hooks.arch.tap('a', function(name) {
      console.log('node', name)
    })
    this.hooks.arch.tap('b', function(name) {
        setTimeout(() => {
            console.log('react', name)
        }, 1000);
    })

    this.hooks.arch.tap('c', function(name) {
      console.log('js', name)
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