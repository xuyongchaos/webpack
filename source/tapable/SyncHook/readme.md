## 介绍
SyncHook 是单纯的同步串行hook

## 原理
```js
class SyncHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach(item => {
      item.task.call(null, ...args)
    })
  }
}

```