const path = require('path');

function resolve(dir) {
	return path.resolve(__dirname, dir);
}

const ComponentsEntry = require('./packages/components.json');   // WARN 无效，【lib】模式不支持多入口。

/**
 * TIP 这种方法，甚是巧妙！！！
 * @type { VueCliService_ProjectOptions_Type }
 */
const cfg = {
	/**
	 * 【开发模式】页面。
	 */
	pages              : {
		index: {
			entry   : 'examples/main.ts',
			template: 'public/index.html',
			filename: 'index.html',
		},
	},
	/**
	 * 关闭source map有两个好处
	 *
	 * 减少打包编译的时间；
	 * 避免在生产环境中用F12开发者工具在Sources中看到源码。
	 */
	productionSourceMap: false,
	/**
	 * 当作为一个库构建时，要将其设置为 false 免得用户自己导入 CSS。
	 */
	css                : {
		extract: false,
	},
	/**
	 * devServer项
	 */
	devServer          : {
		port: 8091,
		hot : true,
		open: 'Google Chrome',
	},
	/**
	 *
	 */
	configureWebpack   : {
		resolve: {
			extensions: ['.js', '.ts', '.tsx',/*    */'.vue', '.json'],
			/**
			 * 文件别名
			 */
			alias     : {
				'@'   : resolve('packages'),
				assets: resolve('examples/assets'),
				views : resolve('examples/views'),
			},
		},
		/**
		 * 暴露默认导出配置
		 */
		output : {
			libraryExport: 'default',
		},
		/**
		 * 【打包模式】入口文件。
		 *        1.WARN 无效，【lib】模式不支持多入口。
		 */
		// entry              : ComponentsEntry,
	},
	/** @type {import('webpack-chain')} */
	chainWebpack       : config => {
	},
};

module.exports = cfg;
