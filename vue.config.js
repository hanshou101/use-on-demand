const { xX_getEntries, xX_resolve } = require('./sources/webpack/webpack-util');

console.log('当前Node环境', process.env.NODE_ENV);


const InteractOuterProject_Helper = {
	/**
	 * 1.支持以下形式：
	 * 					string
	 * 					Array
	 * 					Object
	 * 					Function
	 * 					Regex
	 * 2.【key】为require后的模块名，【value】为【模块内主入口，导出的根变量】的名字。
	 * 					1.import Vue from 'vue' ————————> export default Vue ————————> 'vue' : 'Vue'
	 */
	__externals: {
		// 交给【外部】
		'vue': {
			// commonjs : 'Vue',				// module.exports = Vue ;
			// commonjs2: 'Vue',				// module.exports.default = Vue ;
			// amd      : 'Vue',				// 类似 commonjs ，但是用【AMD模块系统】
			// root     : 'Vue',				// window.Vue ; 挂载在Window上面。

			/**
			 * WARN 见鬼了？？？？？？
			 * 				1.网上教的都是一些傻逼么？
			 * 				2.原本的正确解法的链接，找不到了。
			 */
			root     : 'Vue',
			commonjs : 'vue',
			commonjs2: 'vue',
			amd      : 'vue',
		},

		// 'element-ui': 'ElementUI',				// 交给【外部】
		// 'element-ui': 'Element',				// 交给【外部】
		'element-ui': 'element-ui',				// 交给【外部】


		// 'vue-fragment': 'vue-fragment',	// WARN 此处，暂时交由内部打包
	},
	// externalsType: 'var',		// 另外一项功能
};

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
		// Babel编译
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
		// 打包时，样式抽取出来
		extract  : {
			filename: 'style/[name].css',	// 在lib文件夹中建立style文件夹中，生成对应的css文件。
		},
	},
	configureWebpack   : {
		// 多入口
		entry : {
			...xX_getEntries('packages/components'),
			...xX_getEntries('packages/cp-element-ui'),
		},
		// 打包后的文件输出
		output: {
			filename     : '[name]/index.js',
			libraryTarget: 'commonjs2',
		},
	},
	chainWebpack       : config => {
		// Babel编译
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

		// 删除一些【无用功能】
		config.optimization.delete('splitChunks');
		config.plugins.delete('copy');
		config.plugins.delete('html');
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
		config.plugins.delete('hmr');
		config.entryPoints.delete('app');

		// 字体Loader
		config.module
					.rule('fonts')
					.use('url-loader')
					.tap(option => {
						option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]';
						return option;
					});


		config.externals({
			...config.get('externals'),											// 防止被直接覆盖
			...InteractOuterProject_Helper.__externals,
		});		// 将【部分使用中依赖】，由外部提供。

		// console.log('真正配置', config.get('externals'));

	},
	outputDir          : 'lib-cp',		// 略微改名
	productionSourceMap: false,
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;
