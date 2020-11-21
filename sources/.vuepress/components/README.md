1. 所有在 .vuepress/components 中找到的 *.vue 文件将会自动地被注册为全局的异步组件

2. 组件名是通过文件名取到的

3. 个自定义组件的名字，必须包含连接符，或者是 PascalCase（全大写开头）

    1. 否则，会导致HTML 渲染紊乱。[资料](https://vuepress.vuejs.org/zh/guide/using-vue.html#%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6)
