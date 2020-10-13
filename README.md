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
2. 【组件库】，需要加入
    1. 【Webpack】的Tree-Shaking。
    2.


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

6.

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
