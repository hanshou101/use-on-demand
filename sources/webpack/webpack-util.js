const fs   = require('fs');
const path = require('path');

const absPath = process.cwd();
const relPath = __dirname;
console.log('路径', '相对路径', relPath, '绝对路径', absPath);

function xX_resolve(dir) {
	// return path.resolve(relPath, dir);							// 不用【相对路径】
	// 采用【绝对路径】
	return path.resolve(absPath, dir);
}

const join = path.join;

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

module.exports = {
	xX_resolve,
	xX_getEntries,
	Externals_TypeE,
};
