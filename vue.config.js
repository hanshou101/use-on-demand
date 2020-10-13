const { xX_getEntries, xX_resolve } = require('./sources/webpack/webpack-util');


/**
 * TIP 开发环境配置
 * @type { VueCliService_ProjectOptions_Type }
 */
const devConfig = {
	pages           : {
		index: {
			entry   : 'examples/main.ts',
			template: 'public/index.html',
			filename: 'index.html',
		},
	},
	configureWebpack: {
		resolve: {
			extensions: [
				'.js', '.vue', '.json',
				'.ts', '.tsx',
			],
			alias     : {
				'@'     : xX_resolve('packages'),
				'assets': xX_resolve('examples/assets'),
				'views' : xX_resolve('examples/views'),
			},
		},
	},
	chainWebpack    : config => {
		config.module
					.rule('js')        // TIP 此处，是TS转化过后的JS文件
					.include
					.add('/packages')
					.end()
					.use('babel')
					.loader('babel-loader')
					.tap(options => {
						return options;
					});
	},
	devServer       : {
		port: 8091,
		hot : true,
		open: 'Google Chrome',
	},
};


/**
 * TIP 打包环境配置
 * @type { VueCliService_ProjectOptions_Type }
 */
const buildConfig = {
	css                : {
		sourceMap: true,
		extract  : {
			filename: 'style/[name].css',
		},
	},
	configureWebpack   : {
		entry : {
			...xX_getEntries('packages/components'),
		},
		output: {
			filename     : '[name]/index.js',
			libraryTarget: 'commonjs2',
		},
	},
	chainWebpack       : config => {
		config.module
					.rule('js')        // TIP 此处，是TS转化过后的JS文件
					.include
					.add('/packages')
					.end()
					.use('babel')
					.loader('babel-loader')
					.tap(options => {
						return options;
					});
		config.optimization.delete('splitChunks');
		config.plugins.delete('copy');
		config.plugins.delete('html');
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
		config.plugins.delete('hmr');
		config.entryPoints.delete('app');

		config.module
					.rule('fonts')
					.use('url-loader')
					.tap(option => {
						option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]';
						return option;
					});
	},
	outputDir          : 'lib-cp',		// 略微改名
	productionSourceMap: false,
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;
