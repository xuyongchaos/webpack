## 介绍
SyncLoopHook 遇到某个不返回undefined的监听函数会循环执行多次

## 原理
```js
class SyncLoopHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let index = 0
    let ret
    do {
      ret = this.tasks[index](...args)
      if (ret === undefined) {
        index++
      }
    } while (index < this.tasks.length)
  }
}
```