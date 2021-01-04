# 服务器，相关辅助工具，相关

        1. 注意，所有的依赖，都不要放进【package.json】里面去。
        2. 那安装依赖的方式：
                1. 我们可以通过【npm install -g】去安装。然后再【npm link 库】。
                        1. 经过实验，这种方式，应该是绝对有效的。
                2. 我们可以通过【WebStrom - Libraries】去安装。
        3.现有依赖清单：
                【lodash-id】、【@types/lodash-id】、
                【lowdb】、【@types/lowdb】、
                【jade/或pug】、
                【http-errors】、【@types/http-errors】
                【cookie-parser】、
                【request】、【@types/request】
                【morgan】、
                【cors】、【@types/cors】
