const fs   = require('fs');
const path = require('path');

const absPath = process.cwd();
const relPath = __dirname;
console.log('路径', '相对路径', relPath, '绝对路径', absPath);


const xX_NodeEnvE = {
	production : 'production',
	development: 'development',
};

/**
 * 解析路径相关。
 */
function xX_resolve(dir) {
	// return path.resolve(relPath, dir);							// 不用【相对路径】
	// 采用【绝对路径】
	return path.resolve(absPath, dir);
}

const join = path.join;

/**
 * 获取【多组件多入口】。
 */
function xX_getEntries(path) {
	const files = fs.readdirSync(xX_resolve(path));
	console.log('files', files);
	const entries = files.reduce((ret, item) => {
		console.log('file', item);
		const itemPath = join(path, item);
		const isDir    = fs.statSync(itemPath).isDirectory();

		if (isDir) {													// TIP 如果是文件夹，追加【index.ts】字符串
			ret[item] = xX_resolve(join(itemPath, 'index.ts'));	// 源文件，是TS格式
		} else {															// TIP 如果是文件，直接加入
			const [name] = item.split('.');
			ret[name]    = xX_resolve(`${itemPath}`);
		}
		return ret;
	}, {});
	console.log('entries', entries);
	return entries;
}


const Externals_TypeE = {
	Window_Root               : 'root',				// Window上的全局
	Module_Exports            : 'commonjs',		// module.exports = Xxx
	Module_Exports_Default    : 'commonjs2', 	// module.exports.default = Xxx
	Module_Exports_Default_AMD: 'amd',				// 是【module.exports.default = Xxx】的AMD写法
};


const mapToFolder = (dependencies, folder = './node_modules') =>
	dependencies.reduce((preObj, dependency) => {
		return {
			[dependency]: path.resolve(`${folder}/${dependency}`),
			...preObj,
		};
	}, {});

/**
 * 从根源上，修复一个曾经很棘手的问题。
 * 				1.【npm link】+【业务库 & 组件库】时，同一个【vue】、【element-ui】会同时存在两个，导致【逻辑出错】。
 * @param	{WebpackOptions_Type} config
 * @param {Array<string>} packageArray
 */
function xX_fix_NpmLink_TwoProject_DuplicatePackage_Error(
	config,
	packageArray,
) {
	const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

	config.plugins.push(new DuplicatePackageCheckerPlugin({
		emitError: false,  // 【默认-false】
		showHelp : true,  // 【默认-true】
		strict   : true,  // 【默认-true】
	}));

	config.resolve.alias = {
		...config.resolve.alias,
		...mapToFolder(packageArray),
	};

}

/**
 *
 * @param {ChainableWebpackConfig_Type} config
 */
function xX_add_CircularDependencyPlugin(config) {
	const CircularDependencyPlugin = require('circular-dependency-plugin');
	const circlePlugin             = new CircularDependencyPlugin({
		exclude         : /a\.js|node_modules/,       // exclude detection of files based on a RegExp
		failOnError     : 'error',                    // add errors to webpack instead of warnings TODO 此处，临时修改为只warning，而不error
		allowAsyncCycles: false,                      // // allow import cycles that include an asyncronous import,    e.g. via import(/* webpackMode: "weak" */ './file.js')
		cwd             : process.cwd(),              // set the current working directory for displaying module paths
	});

	config.plugin('circle-plugin').use(circlePlugin);

}

/**
 *
 * @param {xX_NodeEnvE_KeyType} env
 */
function xX_isNodeEnv(env) {
	return process.env.NODE_ENV === env;
}

module.exports = {
	xX_resolve,
	xX_getEntries,
	Externals_TypeE,
	xX_fix_NpmLink_TwoProject_DuplicatePackage_Error,
	xX_add_CircularDependencyPlugin,
	xX_NodeEnvE,
	xX_isNodeEnv,
};
