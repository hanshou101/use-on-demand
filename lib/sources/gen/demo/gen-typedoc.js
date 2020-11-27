"use strict";
var GenTypedocUtil = /** @class */ (function () {
    function GenTypedocUtil() {
        /**
         *
         */
        this.typedocCfg = {
            // TIP——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
            // TIP——————————————————————————————————————————以下为【输入选项】——————————————————————————————————————————————————————————————
            // TIP——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
            /**
             * 转换项目的模式：
             * 				WARN 恰恰相反？很奇怪吧
             * 				file 			目录形式，为【基于模块层次、namespace】的树状。
             * 				modules 	目录形式，为【文件路径】列表。（对于生成内部使用文档的项目最有用）
             */
            'mode': 'file',
            // 'mode'                : 'modules',
            /**
             * 需要生成文档的目录
             */
            'inputFiles': [
                // './ts-docs',
                './sources',
            ],
            /**
             * 排除 某些不需要生成文档 的文件
             */
            'exclude': [
                // 注意，这里是【星加】，不是【星星】
                '**/*+(index|.spec|.e2e).ts',
                // 不为 【.d.ts】文件 生成专门文档
                '**/**.d.ts',
                'sources/tradingview/**/*.*',
            ],
            /**
             * 打开【.d.ts】声明文件的解析。（同时应使用【excludeExternals】！）
             */
            'includeDeclarations': true,
            /**
             * 避免为【外部的TypeScript文件】创建文档。（配合【includeDeclarations】使用！）
             */
            'excludeExternals': true,
            /**
             * 指定【外部的TypeScript文件】的格式。
             */
            'externalPattern': [
                '(lib|external)/**/*.ts',
                'lib-cp/**/*.ts',
                'examples/**/*.ts',
                'packages/**/*.ts',
            ],
            /**
             * 全局TS文件的主入口。（可能并没有这个）
             * 				1.WARN 此处，必须为【内外双层引号】。
             */
            // 'entryPoint'          : '"index"',
            /**
             * 即使项目有TypeScript错误，也要生成文档。
             * 				1.如果仅在成功构建后生成文档，则启用此选项将提供性能优势。
             * 				2.WARN 我感觉，我需要生成一份【完整文档】，来看一下，是什么样子的。所以可以忽略报错。
             */
            'ignoreCompilerErrors': true,
            // 'ignoreCompilerErrors': false,						// 此处，不再允许错误（更加严格）
            //
            //
            //
            //
            //
            //
            //
            //
            // 'excludeNotExported'  : '',			// 从生成的文档中删除本地符号。默认为false。
            // 'excludePrivate'      : '',			// 从生成的文档中删除私有类成员。默认为false。
            // 'excludeProtected'    : '',			// 从生成的文档中删除受保护的类成员。默认为false。
            // 'stripInternal'       : '',			// 删除@internal以TypeScript识别的注释注释的成员。
            // 'media'               : '',			// 指定将复制到输出文件的媒体目录。可以media://file.jpg在doc注释中将媒体链接到。
            // 'includes'            : '',			// 指定包含文件的目录，该文件可以通过[[include:file.md]]doc注释注入到生成的文档中。
            // TIP——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
            // TIP——————————————————————————————————————————以下为【输出选项】——————————————————————————————————————————————————————————————
            // TIP——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
            /**
             * 输出目录
             * 				1.WARN 此处有一个小技巧，将【ts-docs】文件，放到【vuepress】的子目录下。
             */
            // 'out': 'ts-docs',
            'out': 'lib-docs-dist/ts-docs',
        };
    }
    GenTypedocUtil.prototype.gen = function () {
        console.log('开始生成', 'typedoc.json文件');
        require('fs').writeFileSync('typedoc.json', JSON.stringify(this.typedocCfg, null, 2));
    };
    return GenTypedocUtil;
}());
new GenTypedocUtil().gen();
//# sourceMappingURL=gen-typedoc.js.map