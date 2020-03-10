### 使用
```
npm run dev
npm run build
```

### 说明
用来测试webpack中的各种配置
- 处于暂存区的文件pre-commit时stylelint和eslint
- DllPlugin加快打包速度
- 配置文件解耦和环境变量注入DefinePlugin
- proxy相关的三种用法
  - 使用before函数单纯的用来mock数据
  - 使用devServer.proxy解决本地发开的跨域问题
  - 使用webpack-dev-middleware本地起一个express服务， 处理本地开发时接口相关问题
- BannerPlugin为文件添加版权信息
- splitChunks和coyWebpackPlugin(拷贝和transform文件很有用)
- resolve.alias 添加快捷方式加快速度
- resolve.modules 指定第三方模块的查找目录
