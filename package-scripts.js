const npsUtils = require('nps-utils'); // not required, but handy!

const quo  = `\"`;   // 双引号
const tQuo = new Array(3 + 1).join(quo);    // 三个双引号

const tsNode_cmdHead = `    ts-node  --files  --compiler-options=\"{ \\\"module\\\":\\\"commonjs\\\" }\"    `;

const LostErrorSentry_Cfg = {
	srcPath         : `./sources/sentry/init`,
	staticTargetPath: `./sources/sentry/dist/static`,
	TsName          : 'LostErrorSentry.ts',
	JsName          : 'LostErrorSentry.js',
	MinJsName       : 'LostErrorSentry.min.js',

	tsPath() {
		return this.srcPath + '/' + this.TsName;
	},

	jsPath() {
		return this.srcPath + '/' + this.JsName;
	},

	minJsPath() {
		return this.srcPath + '/' + this.MinJsName;
	},

	staticMinJsPath() {
		return this.staticTargetPath + '/' + this.MinJsName;
	},

};

module.exports = {
	scripts: {
		/**
		 * Demo展示。
		 */
		demo: {
			/**
			 * 辅助命令
			 */
			'copy-local-config'       : 'shx cp -f ./config/api.config.local.ts ./config/api.config.ts',              // 复制【环境配置】
			'inject-cdn-2-tradingView': `${tsNode_cmdHead}  ./sources/gen/gen-tradingView.ts`,
		},
		/**
		 * 合约相关
		 */
		swap: {
			'CalcReturnTest': `${tsNode_cmdHead} ./sources/swap/CalcReturnTest/swap.bgex.com.ts`,
		},

		/**
		 * 相关打包命令
		 */
		ts: {
			'gen-tsconfig': `${tsNode_cmdHead}  ./sources/gen/demo/gen-tsconfig.ts`,                                         // 动态js生成 tsconfig.js
			'compile-lib' : npsUtils.series(
				npsUtils.series.nps('ts.gen-tsconfig'),
				'tsc',          // 1.先进行编译
				`${tsNode_cmdHead} ./sources/gen/demo/copy-after-tsc.ts`,                   // 2.再进行【复制】
				`${tsNode_cmdHead} ./sources/gen/demo/clean-after-copy.ts`,
			),
			typedoc       : {
				'gen-typedoc-cfg': `${tsNode_cmdHead}  ./sources/gen/demo/gen-typedoc.ts`,
				'build-typedoc'  : npsUtils.series(
					`${tsNode_cmdHead}  ./sources/gen/demo/gen-typedoc.ts`,					// 先生成配置文件
					'typedoc',																														// 再生成文档
				),
			},
			i18n          : {
				'$t_search': npsUtils.series(
					'cd ./sources/vue/i18n',												// 先进入目录，然后再执行。（这样，相对路径友好一些。）
					`${tsNode_cmdHead}  	xX_VueI18N_$t_search.ts`,				// 搜索全量【$t】
				),
				'map': npsUtils.series(
					'cd ./sources/vue/i18n',												// 先进入目录，然后再执行。（这样，相对路径友好一些。）
					`${tsNode_cmdHead}  	xX_VueI18N_map.ts`,				// 搜索全量【$t】
				),
			},
		},


		vue: {

			'webpack-3': {


				/**
				 * 开发
				 *        1.本地调试模块
				 */
				// 'serve': 'vue-cli-service serve',
				'serve': 'cross-env NODE_ENV=development webpack-dev-server --open --hot',
				/**
				 * 打包
				 *        1.打包成NPM包，供其它项目使用
				 */
				// 'build': 'vue-cli-service build',
				'build': 'cross-env NODE_ENV=production webpack --progress --hide-modules',
				// 检查
				'lint' : 'vue-cli-service lint',
			},

			'cli-4': {
				'serve'    : 'vue-cli-service serve',
				'build'    : 'vue-cli-service build',
				'test:unit': 'vue-cli-service test:unit',
				'lint'     : 'vue-cli-service lint',
				'lib'      : [
					'vue-cli-service build\'',
					'--target lib',
					'--name use-on-demand',
					/**
					 * 1.这里重要的一点是[chunkhash]组件名称中的。
					 *        1.我们希望将库组件永久虚拟地缓存，因此如果组件的新版本发布，我们需要为组件提供唯一的URL。
					 */
					// "--name \"MyComponent.[chunkhash]\"",
					'--dest lib-cp',
					//
					// '--formats umd-min',
					// "--formats \"commonjs,umd,umd-min\"",       // 默认值
					// "--no-clean",
					//
					'packages/to-build.ts',
				].join(' '),


				/**
				 * TIP 多组件打包
				 */
				'multi-cp': {
					'serve': 'vue-cli-service serve',
					'build': npsUtils.series(
						/**
						 * FIXME 此处，【NPM】工具会报错【Refusing to install package with name "use-on-demand" under a package also called "use-on-demand". Did you name your project the same as the dependency you're installing?】
						 * 				0.参考资料：https://docs.npmjs.com/cli/install#limitations-of-npms-install-algorithm
						 * 				1.根据官方提示，加上【--force】标记，即可。
						 */
						// 'echo "首先，从GitHub上拉一次包。因为【特殊原因】无法使用 npm link。"    &&    npm install github:hanshou101/use-on-demand#master --force',
						'echo "问题已修复，可以正常使用 npm link" ',
						'vue-cli-service build',
					),
				},

				/**
				 * 1.参考资料：
				 * 				[webpack 相关 | Vue CLI](https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9%E6%8F%92%E4%BB%B6%E9%80%89%E9%A1%B9)
				 */
				'inspect-config': {
					'production': 'vue-cli-service inspect --mode production > inspect-output.production.js',
				},

			},


			'cp': {
				'gen-type': 'vuedts packages',
			},

		},

		/**
		 * Sentry相关
		 */
		sentry: {
			'tsc'                 : npsUtils.series(
				// `tsc.cmd --target es3 --module umd ${LostErrorSentry_Cfg.tsPath()}`,       // FIXME 注意，这里如果指定module，则无法直接执行。
				`tsc.cmd --target es3 --module none ${LostErrorSentry_Cfg.tsPath()}`,   // FIXME 如果想直接执行，则需要指定module。
				// `tsc.cmd --target es3 --module umd --types ${LostErrorSentry_TsPath}`,
				// `tsc.cmd ${LostErrorSentry_TsPath} --target es3 --module umd`,
				// `tsc.cmd ${LostErrorSentry_TsPath}`,
			),
			'uglify'              : npsUtils.series(
				`uglifyjs  ${LostErrorSentry_Cfg.jsPath()}  -m  -o  ${LostErrorSentry_Cfg.minJsPath()}`,
				`shx cp -f ${LostErrorSentry_Cfg.minJsPath()} ${LostErrorSentry_Cfg.staticMinJsPath()}`,
			),
			/**
			 * 此处，不能使用【npsUtils.series】，原因是【前一个任务，会报出非0错误码】。
			 */
			'combine-tsc-uglifyjs': [
				npsUtils.series.nps('sentry.tsc'),
				npsUtils.series.nps('sentry.uglify'),
			].join(' & '),
		},


		/**
		 * NPM发布、部署相关。
		 */
		npm: {
			'auto-publish'      : npsUtils.series(
				npsUtils.series.nps('ts.compile-lib'),
				npsUtils.series.nps('vue.cli-4.multi-cp.build'),
				'npm version patch',
				'npm publish',
			),
			'complete-reinstall': npsUtils.series(
				'shx rm -rf .cache/ dist/ package-lock.json  node_modules/',    // 清除目录
				'npm install',                                                        // 重装依赖
			),
		},


		/**
		 * Robot自动机器人。
		 */
		robot: {
			Demo1: `${tsNode_cmdHead}  ./sources/robot/demo/Demo1.ts`,
		},

		/**
		 * VuePress文档
		 */
		vuepress: {
			'docs'       : {
				'dev'   : 'vuepress dev ./sources',
				'build' : 'vuepress build ./sources',
				'deploy': {
					'github-pages____nps': npsUtils.series(
						`echo '老是用CMD执行并报错，我也不知道为什么，就很烦' && exit 1`,
						// 头（不知道有没有用）
						// `#!/usr/bin/env sh`,
						// 确保脚本抛出遇到的错误
						'set -e',
						// 生成静态文件
						'npm run vuepress____docs:build',
						// 进入生成的文件夹
						'cd docs-dist',
						// 如果是发布到自定义域名
						// `echo 'www.example.com' > CNAME`,
						// 新建Git仓库信息（一般来说，打包过程中，已经把之前的Git信息 清掉）
						`git init`,
						`git add -A`,
						`git commit -m 'deploy'`,
						/**
						 * 如果发布到 https://<USERNAME>.github.io
						 * 				1.强制push，覆盖掉之前的内容。
						 * 				2.WARN 特别注意，GitHub于最近，将【main】而不是【master】 作为了仓库的默认分支。
						 */
						`git push -f git@github.com:hanshou101/hanshou101.github.io.git master`,
						// 如果发布到 https://<USERNAME>.github.io/<REPO>
						// `git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages`,
						/**
						 * 将【单破折号 -】指定为参数，它将替换为的值是【OLDPWD】。
						 * 				0.参考资料：
						 * 								https://stackoverflow.com/a/9740356/6264260
						 * 				1.即以前的工作目录。（上一个工作目录，cd前的）
						 */
						'cd -',
					),
					'github-pages____sh' : './sources/.vuepress/deploy.sh',
				},
			},
			'gen-sitemap': npsUtils.series(
				// 'set NODE_TLS_REJECT_UNAUTHORIZED=1',										// WARN 用于屏蔽【安全性报错】
				`${tsNode_cmdHead}  ./sources/gen/demo/gen-sitemap.ts`,
			),
		},

		/**
		 * 测试
		 */
		test: {
			jest: 'jest',
		},

	},
};
