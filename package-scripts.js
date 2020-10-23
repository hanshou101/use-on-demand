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
					'build': 'vue-cli-service build',
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
	},
};
