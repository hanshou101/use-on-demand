console.log('调用了【babel-util.js】');


/**
 * FIXME 临时，先这样处理。！！！但是是有问题的。
 * 				1.在【打包】之后，层级发生了变化。
 */
const pJson = require('../../../package.json');		// WARN 这种方式更好一点，因为如果走【process.env.npm_package_name】，可能读到【业务项目】的【环境变量】。

const { name: pName, version: pVersion } = pJson;
console.log('package.json', 'name', pName, 'version', pVersion);

function __customName(name, file) {
	const filename = file.opts.filename;
	if (name === 'TimePicker') {
		return 'antd/lib/custom-time-picker';
	}
	if (filename.indexOf('/path/to/my/different.js') >= 0) {
		return 'antd/lib/custom-name';
	}
	return `antd/lib/${name}`;
}

const Cp_UseOnDemand_BabelCfg = {
	__presets: ['@vue/app'], 								// TIP 很多时候，【业务项目】自带了这个。
	__plugins: [
		[
			'import',		// 对应【babel-plugin-import】插件。
			{
				/**
				 * 以下3句，是【组件按需导入】
				 */
				'libraryName'                 : pName,	// 组件库名称
				'camel2DashComponentName'     : false,	// 关闭驼峰自动转链式
				'camel2UnderlineComponentName': false,	// 关闭蛇形自动转链式
				/**
				 * 以下1句，是【让样式，随组件，自动导入】。
				 */
				'style'                       : (name) => {
					const cssName = name.split('/')[2];
					const cssPath = `${pName}/lib-cp/style/${cssName}.css`;
					console.log('CSS名称', cssName, 'CSS路径', cssPath);
					return cssPath;
				},

				/**
				 * FIXME 对于原【教程文档】的修正。
				 */
				'libraryDirectory': 'lib-cp',							// 【Cp组件】——————将【import {}】转路径的过程中，拼接的【目录前缀】。
				// 'styleLibraryDirectory': 'lib/theme-chalk',			// 【Style样式】——————将【import {}】转路径的过程中，拼接的【目录前缀】。
				// customName      : __customName,					// 自定义【import {} 命名跳转】规则。
			},
		],
	],
};

module.exports = {
	Cp_UseOnDemand_BabelCfg,
};
