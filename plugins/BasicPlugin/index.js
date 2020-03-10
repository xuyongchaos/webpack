class BasicPlugin {
  constructor(options) {
    console.log('-----自定义插件的options:', options)
  }

  apply(compiler) {
    compiler.hooks.run.tap('BasicPlugin', function(comilation) {
      console.log(`--------------- ${new Date()} -----------------`)
      console.log('启动一次新的编译。')
    })
    compiler.hooks.watchRun.tap('BasicPlugin', function(comilation) {
      console.log(`--------------- ${new Date()} -----------------`)
      console.log(
        '和 run 类似，区别在于它是在监听模式下启动的编译，在这个事件中可以获取到是哪些文件发生了变化导致重新启动一次新的编译。'
      )
    })
    // compiler.plugin('compilation', function(comilation) {
    //   console.log('---一个新的compilation即将开始---')
    //   console.log(comilation)
    // })
    // compiler.plugin('after-compile', function(comilation) {
    //   console.log('---一次 Compilation 执行完成---')
    // })
  }
}

module.exports = BasicPlugin
