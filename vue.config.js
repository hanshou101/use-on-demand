const { xX_add_CircularDependencyPlugin } = require('./sources/webpack/webpack-util');
const { Externals_TypeE }                 = require('./sources/webpack/webpack-util');
const { xX_getEntries, xX_resolve }       = require('./sources/webpack/webpack-util');
const fs                                  = require('fs');

console.log('当前Node环境', process.env.NODE_ENV);

const cpEntryRoots = [
	'packages/components',
	'packages/cp-element-ui',
];

const pJson                              = require('./package.json');
const { name: pName, version: pVersion } = pJson;
console.log('package.json', 'name', pName, 'version', pVersion);

class Alias_Helper {

	/**
	 * Alias别名映射
	 */
	static #aliasMap = {
		'@lib-ts': xX_resolve('lib/sources'),
		'@lib-cp': xX_resolve('lib-cp'),
	};

	/**
	 * @type {Array<any>}
	 */
	static #defaultAll_libCp_Dirs = cpEntryRoots.map(name => {
		return fs.readdirSync(xX_resolve(name));	// 解开目录
	}).flat(1);

	static getAlias() {
		return this.#aliasMap;
	}

	/**
	 *
	 * @param {Array<any>} cpDirNameArray
	 */
	static getCpExternals(cpDirNameArray = this.#defaultAll_libCp_Dirs) {
		console.log('对应目录列表 cpDirNameArray', cpDirNameArray);
		const cpExternals = cpDirNameArray.reduce((preObj, name) => {
			/**
			 * 原本的带Alias的目录。
			 * 				1.也就是，源码中，所使用的【@xxx】目录。
			 */
			const aliasDirName         = `@lib-cp/${name}`;
			/**
			 * 终极目录
			 * 				1.形如【 use-on-demand/lib-cp/MyFormEasy 】。
			 */
			const finalExternalDirName = `${pName}/lib-cp/${name}`;
			preObj[aliasDirName]       = finalExternalDirName;
			return preObj;
		}, {});
		console.log('组件由外部提供 cpExternals', cpExternals);
		return cpExternals;
	}

}

class InteractOuterProject_Helper {
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
	static  __externals = {


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

		'use-on-demand': 'use-on-demand',				// WARN 自身【组件A】调用【组件B】，也用【use-on-demand】库名 来调用。
		// 子目录，webpack需要完整的路径
		// 'use-on-demand/lib-cp/MyFormEasy' : 'use-on-demand/lib-cp/MyFormEasy',
		// 'use-on-demand/lib-cp/MyTableEasy': 'use-on-demand/lib-cp/MyTableEasy',
		...Alias_Helper.getCpExternals(),

		'vue-fragment': 'vue-fragment',	// WARN 此处，暂时交由内部打包

		// 'vue-property-decorator': 'vue-property-decorator',
		// 'vuex-class'            : 'vuex-class',
		// 'vue-class-component'   : 'vue-class-component',
		// 'vuex'                  : 'vuex',

		// 'vue-router': 'VueRouter',
		// 'highlight.js': 'hljs',

		// 'v-viewer': 'v-viewer',					// WARN 此处，暂时交由内部打包

		// 'vue-ueditor-wrap': 'vue-ueditor-wrap',	// TIP 如果放在内部打包，会报错。（因为机制比较特殊）


	};
	// externalsType: 'var',		// 另外一项功能
}


class WorkerLoaderCfg {
	static _rule = {
		// 匹配 *.worker.js
		test: /\.worker\.[jt]s$/,										// WARN 此处，增加对【ts、js】文件的双重支持。
		use : {
			loader : 'worker-loader',
			options: {																// WARN 此处，【3.x】和【2.x】的配置，大大不一样！！！！！！
				// name  : '[name]:[hash:8].js',
				chunkFilename: '[id].[contenthash].worker.js',
				/**
				 * 将【worker】作为【blob】进行内联
				 * 				1.要注意，内联模式将额外为浏览器创建 chunk，即使对于不支持内联 worker 的浏览器也是如此
				 * 				2.若这种浏览器想要禁用这种行为，只需要将 fallback 参数设置为 false 即可。
				 */
				// inline  : true,
				inline       : 'fallback',  // 3.x用这个
				// fallback: false,														// 配合 inline 使用。
				// publicPath: '/scripts/workers/',					// 【publicPath】用于 重写 【worker脚本】的 下载url。
			},
		},
	};
	/*
					static _output = {
						globalObject: 'this',														// 用于修复 【Uncaught ReferenceError: window is not defined】 的问题。
					};
	*/
}

//
//
//
//
//
//
//
//
//

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
	/**
	 * 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
	 * 				0.参考资料：https://cli.vuejs.org/zh/guide/webpack.html
	 */
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
				// 测试环境
				...Alias_Helper.getAlias(),										// WARN 更多别名
			},
		},
		module : {
			rules: [
				WorkerLoaderCfg._rule,			// TIP 添加【Worker-Loader】的 Rule 。用于【Web-Worker】。
			],
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
		xX_add_CircularDependencyPlugin(config);
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
	css: {
		sourceMap: true,
		// 打包时，样式抽取出来
		extract  : {
			filename: 'style/[name].css',	// 在lib文件夹中建立style文件夹中，生成对应的css文件。
		},
	},

	/**
	 * 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
	 * 				0.参考资料：https://cli.vuejs.org/zh/guide/webpack.html
	 */
	configureWebpack   : {
		// 多入口
		entry  : {
			// TIP 从多个目录，进行解析入口
			...cpEntryRoots.reduce((preObj, name) => {
				return {
					...preObj,
					...xX_getEntries(name),
				};
			}, {}),
		},
		// 打包后的文件输出
		output : {
			filename     : '[name]/index.js',
			libraryTarget: 'commonjs2',
		},
		// 建立一个【alias别名】的解析
		resolve: {
			alias: {
				// 打包环境
				...Alias_Helper.getAlias(),										// WARN 更多别名
			},
		},
		module : {
			rules: [
				WorkerLoaderCfg._rule,			// TIP 添加【Worker-Loader】的 Rule 。用于【Web-Worker】。
			],
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
		xX_add_CircularDependencyPlugin(config);
	},
	outputDir          : 'lib-cp',		// 略微改名
	productionSourceMap: false,
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;
