console.log('use-on-demand项目的 babel.config.js ');

const { Cp_UseOnDemand_BabelCfg } = require('./lib/sources/babel/babel-util');				// WARN 此处，从【打出的包】中，读取文件；以保持【路径】一致。

module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset',
	],
	plugins: [
		/**
		 * WARN 此处，哪怕是【从 use-on-demand/lib-cp/A 】导入，也要加上这句
		 * 				1.这样，才能正确的导入【CSS】。
		 */
		...Cp_UseOnDemand_BabelCfg.__plugins,   // 引入【按需导入】
	],
};
