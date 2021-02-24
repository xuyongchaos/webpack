## 介绍
SyncWaterfallHook 上一个hook订阅的返回值是下一个的参数

## 原理

```js
class SyncWaterfallHook {
  constructor() {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const [first, ...others] = this.tasks
    const ret = first(...args)
    others.reduce((a, b) => {
      if (a === undefined) {
        return b(...args)
      } else {
        return b(a)
      }
    }, ret)
  }
}
```