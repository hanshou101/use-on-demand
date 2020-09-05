console.log('加载了postcss.config.js');

const autoprefixer = require('autoprefixer');

/**
 * CSS，常用前缀 配置。
 */
const autoprefixerPlugin = autoprefixer({
	// TIP 采用这种方式，能够【自动根据浏览器版本】，来进行  自动判断、抉择 。
	'overrideBrowserslist': [
		'> 1%',
		'last 4 versions',
		'ie >= 9',
	],
});

module.exports = {
	plugins: [
		autoprefixerPlugin,
	],
};
