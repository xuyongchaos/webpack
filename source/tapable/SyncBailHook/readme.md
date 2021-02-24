## 介绍
SyncBailHook 指的是保险hook，可以随时停止后续事件的执行，返回值不是undefined的话，就会阻断后面

## 原理

```
class SyncBailHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    let res = true
    let i = 0
    do {
      res = this.tasks[i++].call(null, ...args)
    } while (i < this.tasks.length && res === undefined)
  }
}
```