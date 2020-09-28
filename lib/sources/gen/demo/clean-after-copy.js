"use strict";
var fs = require('fs');
console.log('当前工作目录', process.cwd());
var DelConfig = /** @class */ (function () {
    function DelConfig() {
    }
    DelConfig.targetDir = process.cwd() + '/lib';
    DelConfig.remainDirs = ['sources'];
    return DelConfig;
}());
function getRawFiles() {
    return fs.readdirSync(DelConfig.targetDir);
}
var rawFiles = getRawFiles();
console.log('找到文件', rawFiles);
var toDelDirs = rawFiles.filter(function (d) {
    return !DelConfig.remainDirs.includes(d);
});
console.log('保留文件', DelConfig.remainDirs);
console.log("\u5F85\u5220\u9664\u6587\u4EF6\uFF08\u5728" + DelConfig.targetDir + "\u76EE\u5F55\u4E0B\uFF09", toDelDirs);
toDelDirs.forEach(function (d) {
    var target = DelConfig.targetDir + "/" + d;
    console.log('删除文件', target);
    fs.rmdirSync(target, { recursive: true }); // 递归删除
});
console.log('删除完毕');
console.log('现在能找到的文件', getRawFiles());
//# sourceMappingURL=clean-after-copy.js.map