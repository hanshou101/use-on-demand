# use-on-demand

### 只要轻量的维护，就可以保持10年不过时（20年不敢说）。
只要轻量的维护，就可以保持10年不过时（20年不敢说）。

只要轻量的维护，就可以保持10年不过时（20年不敢说）。

只要轻量的维护，就可以保持10年不过时（20年不敢说）。

只要轻量的维护，就可以保持10年不过时（20年不敢说）。

------------
------------
------------
------------
------------
------------


# 1.1 远程npm使用方式

1. 【TS库】，直接使用
2. 【组件库】
    1. 需要加入【babel-plugin-import】插件的配置，使其能对【use-on-demand】按需导入。
    2. 每个库组件，需要在【main.js】中，提前用【Vue.use】加载。
        1. 目前，尚不清楚，支持 或 不支持【业务组件中import，然后放到components选项】的这种形式？？？？？？
    
    3.需要注意，有可能需要【import 'use-on-demand/lib-cp/style/index.css'】导入样式，也有可能不需要？？？？？？
    
3.其它的一些地方：
    1.使用【npx check-peer-dependencies】工具，来检查【peerDependencies】的对齐。

# 1.2 常见问题

1.报错【Error: ENOTEMPTY: directory not empty, rmdir 】

         1.需要升级到【 Node.js 12.10.0】，或以上。


2.报错【Cannot find module 'duplicate-package-checker-webpack-plugin'】
        
         1.需要检查，【npm link】和【npm link use-on-demand】设置是否正确。

3.在【/example】里面的测试组件，都不应该使用【@lib-cp】的external方式。

         1.原因是，这样更方便于开发；减少更新时间。

# 2.1 本地开发调试方式

1. 将该仓库，Clone下来，执行【npm link】
2. 在其它业务仓库，导入库
    1. dependencies里，加入【"use-on-demand": "github:hanshou101/use-on-demand#master"】
    2. 执行【npm link use-on-demand】，以链接到本地库。
3. 加入【postinstall】钩子
    1. 在每次【install】之后，自动再将【npm link use-on-demand】绑定。

4. 在【服务端发包】的【build】指令之前，安装最新依赖
    1. 【npm install github:hanshou101/use-on-demand#master】

5. 需要注意，以上步骤，需要为【npm】添加【unsafe操作权限】
    1. 新建【.npmrc】文件。
    2. 添加【unsafe-perm = true】语句。

6. 需要注意，因为【npm link 库】时，【webpack】会默认去解析【TS库】中的代码并编译；这会导致错误，所以我们要关闭：
    1. 在【chainWebpack】中，加入【config.resolve.symlinks(false); // 解决【npm link】时，webpack解析错误的问题。】









# 【Vue Cli 4】test-vue-cli-4

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
