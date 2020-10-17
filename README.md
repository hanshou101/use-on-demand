# use-on-demand
# 只要轻量的维护，就可以保持10年不过时（20年不敢说）。
# 只要轻量的维护，就可以保持10年不过时（20年不敢说）。
# 只要轻量的维护，就可以保持10年不过时（20年不敢说）。
# 只要轻量的维护，就可以保持10年不过时（20年不敢说）。
# 只要轻量的维护，就可以保持10年不过时（20年不敢说）。

------------
------------
------------
------------
------------
------------


# 使用方式

1. 【TS库】，直接使用
2. 【组件库】
    1. 需要加入【babel-plugin-import】插件的配置，使其能对【use-on-demand】按需导入。
    2. 每个库组件，需要在【main.js】中，提前用【Vue.use】加载。
        1. 目前，不支持【业务组件中import，然后放到components选项】的这种形式。

# 本地开发方式
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
