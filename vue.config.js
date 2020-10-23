const CircularDependencyPlugin = require('circular-dependency-plugin');
const circlePlugin             = new CircularDependencyPlugin({
	exclude         : /a\.js|node_modules/,       // exclude detection of files based on a RegExp
	failOnError     : 'error',                    // add errors to webpack instead of warnings TODO 此处，临时修改为只warning，而不error
	allowAsyncCycles: false,                      // // allow import cycles that include an asyncronous import,    e.g. via import(/* webpackMode: "weak" */ './file.js')
	cwd             : process.cwd(),              // set the current working directory for displaying module paths
});

const { Externals_TypeE }           = require('./sources/webpack/webpack-util');
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
			 * 				2.来自【Element-UI】源码库，可以正常工作。
			 */
			[Externals_TypeE.Window_Root]               : 'Vue',
			[Externals_TypeE.Module_Exports]            : 'vue',
			[Externals_TypeE.Module_Exports_Default]    : 'vue',		// TIP 【试验】得出，import模式主要是用这个！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			[Externals_TypeE.Module_Exports_Default_AMD]: 'vue',
		},
		// WARN 采用【Element-UI】源码库，的另一种build配置
		// vue: 'vue',	// TIP 尝试
		// vue: 'Vue',	// TIP 尝试

		// 'element-ui': 'ElementUI',				// 交给【外部】
		// 'element-ui': 'Element',				// 交给【外部】
		// 'element-ui': 'element-ui',				// 交给【外部】
		// 'element-ui': 'ELEMENT',					// 交给【外部】

		'element-ui': {
			[Externals_TypeE.Window_Root]               : 'Element',			// TIP Window的【CDN】模式
			[Externals_TypeE.Module_Exports]            : 'A',
			// commonjs2: 'ElementUI',		// TIP 【试验】得出，import模式主要是用这个！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			// commonjs2: 'ELEMENTUI',		// TIP 【试验】得出，import模式主要是用这个！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			[Externals_TypeE.Module_Exports_Default]    : 'element-ui',		// TIP 【试验】得出，import模式主要是用这个！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
			[Externals_TypeE.Module_Exports_Default_AMD]: 'C',
		},

		'vue-property-decorator': 'vue-property-decorator',
		'vuex-class'            : 'vuex-class',
		'vue-class-component'   : 'vue-class-component',
		'vuex'                  : 'vuex',

		// 'vue-router': 'VueRouter',
		// 'highlight.js': 'hljs',

		// 'vue-fragment': 'vue-fragment',	// WARN 此处，暂时交由内部打包
		// 'v-viewer': 'v-viewer',					// WARN 此处，暂时交由内部打包

		// 'vue-ueditor-wrap': 'vue-ueditor-wrap',	// TIP 如果放在内部打包，会报错。（因为机制比较特殊）


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

		config.plugin('circle-plugin').use(circlePlugin);

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


		config.plugin('circle-plugin').use(circlePlugin);

	},
	outputDir          : 'lib-cp',		// 略微改名
	productionSourceMap: false,
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;
