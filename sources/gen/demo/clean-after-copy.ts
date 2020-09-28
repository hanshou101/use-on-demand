const fs = require('fs');
console.log('当前工作目录', process.cwd());

class DelConfig {
	public static targetDir  = process.cwd() + '/lib';
	public static remainDirs = ['sources'];
}

function getRawFiles(): Array<string> {
	return fs.readdirSync(DelConfig.targetDir);
}

const rawFiles: Array<string> = getRawFiles();
console.log('找到文件', rawFiles);


const toDelDirs = rawFiles.filter((d: string) => {
	return !DelConfig.remainDirs.includes(d);
});
console.log('保留文件', DelConfig.remainDirs);
console.log(`待删除文件（在${DelConfig.targetDir}目录下）`, toDelDirs);

toDelDirs.forEach(d => {
	const target = `${DelConfig.targetDir}/${d}`;
	console.log('删除文件', target);
	fs.rmdirSync( target, { recursive: true });			// 递归删除
});
console.log('删除完毕');
console.log('现在能找到的文件', getRawFiles());
