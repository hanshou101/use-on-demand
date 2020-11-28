import { __assign, __read, __spread } from "tslib";
import fs from 'fs';
import path from 'path';
import { xX_SObject_Helper, xX_Zepto_TypeDetectE } from '../../symbol-object/SObject_Helper';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';
import { xX_SRegexp_Helper } from '../../symbol-regexp/SRegexp_Helper';
/**
 * 格式化，目录分隔符。
 *
 * 转化【Windows的反斜杠分隔符】为通用格式
 *        0.参考资料：https://stackoverflow.com/a/63251716/6264260
 */
function formatDirSep(filePath) {
    // filePath: path.normalize(path.resolve(file)),   // 转化【Windows的反斜杠分隔符】为通用格式     // WARN 似乎不起作用
    return filePath.split(path.sep).join(path.posix.sep);
}
/**
 * 从数组中，根据Value值，移除（遇到的）第一个元素。
 * 				0.参考资料：
 * 								[javascript-如何通过值从数组中删除项目？ - 堆栈溢出](https://stackoverflow.com/a/3954451/6264260)
 * 				1.只移除一个。
 * 				2.如果有多个的情况下，只会移除第一个。
 */
function removeOneElement_fisrtOccur_inArray(target, arr) {
    var index = arr.indexOf(target);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}
/**
 * 查找文件：
 *        1.参考资料：https://stackoverflow.com/a/48665880/6264260
 *
 */
var xX_VueI18N_Cli;
(function (xX_VueI18N_Cli) {
    /**
     * 文件路径查找器
     */
    var FilePathSearcher = /** @class */ (function () {
        function FilePathSearcher() {
        }
        // TIP——————————————————————————————————————————————————————公有方法——————————————————————————————————————————————————————————————
        /**
         * 写出【文件路径】的JSON文件。
         */
        FilePathSearcher.writeOut_filePaths = function (matches, fileName) {
            if (!fs.existsSync(Logic.GlobalCfg.outDir)) { // 如果目录不存在
                fs.mkdirSync(Logic.GlobalCfg.outDir); // 生成目录
            }
            // console.log('输出结果', matches);
            fs.writeFileSync(Logic.GlobalCfg.outDir + fileName, JSON.stringify(matches, null, 2));
            console.log('生成了文件');
        };
        /**
         * 处理单个文件的逻辑
         */
        FilePathSearcher.handleSingleFile_logic = function (filePath, regex) {
            var fileContent = fs.readFileSync(filePath, {
                encoding: 'utf8',
            });
            if (regex.test(fileContent)) { // 如果匹配到了文件。
                try {
                    return {
                        filePath: formatDirSep(filePath),
                        occurLines: LineHelper.regex_lineNums(fileContent, regex),
                    };
                }
                catch (e) {
                    console.log('filePath', filePath);
                    console.log('fileContent', fileContent);
                    throw new Error(e);
                }
            }
            else {
                return null;
            }
        };
        /**
         * 获取所有的【文件】路径，的列表。
         */
        FilePathSearcher.allFilesInDirectory = function (dir, __cfg) {
            if (__cfg === void 0) { __cfg = {}; }
            var cfg = __assign({ 
                // 默认项
                pattern: 'HelloWorld', needBoundary: false, ext: '' }, __cfg);
            if (cfg.pattern instanceof RegExp) { // 如果是正则，则强行做一个global判断
                if (!cfg.pattern.global) {
                    throw new Error(xX_ExceptionError_Helper.throwError_andLog('如果是RegExp类型，则必须加【g】关键字！'));
                }
            }
            /*
            if (!(cfg.pattern instanceof RegExp)) {
                console.error('必须要传入正则。因为Node.js的matchAll，似乎有点Bug，两个判断相同的正则，得出的结果不一样');
                return;
            } else {
                console.log('???');
            }
            */
            var regex;
            if (xX_SObject_Helper.typeDetect_judgeType_inZeptoLib(cfg.pattern) === xX_Zepto_TypeDetectE.regexp) {
                regex = cfg.pattern;
            }
            else {
                // WARN 此处，必须要考虑Regexp转义
                var escapedStr = xX_SRegexp_Helper.escapeRegex(cfg.pattern);
                console.log('转换后文本', escapedStr);
                // We want full words, so we use full word boundary in regex.
                regex = cfg.needBoundary
                    ? new RegExp('\\b' + escapedStr + '\\b', 'g') // 两侧带有边界？
                    : new RegExp(escapedStr, 'g'); // 两侧没必要带边界
            }
            console.log('正则', regex);
            // 迭代，获取所有的子文件路径。
            var files = this.__getFilesInDirectory(dir, cfg.ext);
            console.log("\u4ECE " + files.length + " \u4E2A\u6587\u4EF6\u4E2D\uFF0C\u8FDB\u884C\u7B5B\u9009");
            return files;
        };
        // TIP——————————————————————————————————————————————————————私有方法——————————————————————————————————————————————————————————————
        /**
         * 递归，找到所有的【子文件】。
         * 				1.包括子文件夹的。
         */
        FilePathSearcher.__getFilesInDirectory = function (dir, ext) {
            var _this = this;
            if (ext === void 0) { ext = ''; }
            // 判断目录是否存在
            if (!fs.existsSync(dir)) {
                throw new Error(xX_ExceptionError_Helper.throwError_andLog("\u6307\u5B9A\u76EE\u5F55: " + dir + " \u4E0D\u5B58\u5728\uFF01"));
            }
            var allFilePaths = [];
            // 读取子文件夹、子文件
            fs.readdirSync(dir).forEach(function (file) {
                var filePath = path.join(dir, file);
                var stat = fs.lstatSync(filePath);
                if (stat.isDirectory()) { // 如果是子文件夹
                    var nestedFiles = _this.__getFilesInDirectory(filePath, ext);
                    allFilePaths = allFilePaths.concat(nestedFiles);
                }
                else { // 如果是子文件
                    // 后缀匹配，或者，没有后缀限制
                    var matched = !ext || (path.extname(file) === ext);
                    if (matched) {
                        allFilePaths.push(filePath);
                    }
                }
            });
            return allFilePaths;
        };
        return FilePathSearcher;
    }());
    xX_VueI18N_Cli.FilePathSearcher = FilePathSearcher;
    /**
     * 【行数】处理工具。
     */
    var LineHelper = /** @class */ (function () {
        function LineHelper() {
        }
        // TIP——————————————————————————————————————————————————————公有方法——————————————————————————————————————————————————————————————
        LineHelper.regex_lineNums = function (rawContent, regex) {
            // var string = "This\nstring\nhas\nmultiple\nlines.",
            var astring = rawContent.split('\n'); // WARN 此处，对于【\r\n】应该也是匹配的？
            var foundon;
            var lines = [];
            astring.forEach(function (line, number) {
                // const results = regex.exec(line);        // FIXME 此处，不适宜用【exec】！
                /**
                 * 使用matchAll，才能达到目标
                 *        1.FIXME 是否Node.js的【matchAll】，实现方式和ES不一样？？？？？？同样的输入，结果却不同。
                 */
                // console.log('行', line);
                var testRegexp = /\$t\(/g;
                /**
                 * FIXME 此处，有个非常蛋疼的Bug。两个正则完全相等，但最后匹配出的结果，却不一样。
                 *        ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
                 *        ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
                 */
                // console.log('两个正则，是否相等', __regexSame(testRegexp, regex));
                var results = new (Array.bind.apply(Array, __spread([void 0], (line.matchAll(regex)))))();
                /**
                 * FIXME 这个修复Bug的方法，非常诡异？？？？？？？？？？？？？？？？？？？？？？？？？
                 *        [js相同的正则多次调用test()返回的值却不同的问题_现在学习也不晚-CSDN博客](https://blog.csdn.net/qq_30100043/article/details/80092012)
                 *                1.去掉【g】或【重置lastIndex】？？？
                 *                2.
                 *        另外一个解释：https://stackoverflow.com/a/38910413/6264260
                 */
                regex.lastIndex = 0;
                // const results = new Array(...(line.matchAll(testRegexp)));
                if (results && results.length > 0) {
                    foundon = number + 1;
                    // console.log('匹配结果', foundon, results);
                    results.forEach(function (r) {
                        lines.push(foundon);
                    });
                }
            });
            return lines;
        };
        /**
         *
         * @param targetStr 需要查找的字符串
         * @param rawContent 大段文本
         * @return {[]}
         */
        LineHelper.str_lineNumbers = function (targetStr, rawContent) {
            if (targetStr !== '') {
                var i = 0, a = [];
                var index = -1;
                while ((index = rawContent.indexOf(targetStr, index + 1)) !== -1) {
                    a.push(this.__str_lineNumberByIndex(index, rawContent));
                }
                return a;
            }
            else {
                throw new Error(xX_ExceptionError_Helper.throwError_andLog('没有找到任何匹配内容！'));
            }
        };
        // TIP——————————————————————————————————————————————————————私有方法——————————————————————————————————————————————————————————————
        LineHelper.__str_lineNumberByIndex = function (index, string) {
            var line = 0;
            var match;
            var re = /(^)[\S\s]/gm;
            while (match = re.exec(string)) {
                if (match.index > index)
                    break;
                line++;
            }
            return line;
        };
        return LineHelper;
    }());
    var KeyMap_Helper = /** @class */ (function () {
        function KeyMap_Helper() {
        }
        KeyMap_Helper.fromPath = function (fPath) {
            var str = fs.readFileSync(fPath, { encoding: 'utf-8' });
            console.log('str', str);
        };
        KeyMap_Helper.extractMap = function (obj) {
            // console.log('obj', obj);
            var resultMap = xX_SObject_Helper.flatJson_toKeyChain(obj, {
                superDeep: false,
                needRemainValue: false,
            });
            // console.log('resultMap', resultMap);
            fs.writeFileSync(Logic.GlobalCfg.outDir + Logic.GlobalCfg.keyMapJsonFname, JSON.stringify(resultMap, function (k, v) { return (v === undefined ? null : v); }, 2));
        };
        return KeyMap_Helper;
    }());
    xX_VueI18N_Cli.KeyMap_Helper = KeyMap_Helper;
})(xX_VueI18N_Cli || (xX_VueI18N_Cli = {}));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var xX_VueI18N_simplifySlim_Helper;
(function (xX_VueI18N_simplifySlim_Helper) {
    function searchOnce(pattern, outName) {
        if (outName === void 0) { outName = undefined; }
        var allFiles = xX_VueI18N_Cli.FilePathSearcher.allFilesInDirectory(Logic.GlobalCfg.targetDir, {
            pattern: pattern,
        });
        var matches = [];
        allFiles.forEach(function (f) {
            var item = xX_VueI18N_Cli.FilePathSearcher.handleSingleFile_logic(f, pattern);
            if (item) {
                matches.push(item);
            }
        });
        console.log('完成了所有匹配');
        if (outName) {
            xX_VueI18N_Cli.FilePathSearcher.writeOut_filePaths(matches, outName);
        }
        return matches;
    }
    function getSurroundReg(middle) {
        /*
        return '\\$t\\([\'\"\`]' + middle + '[\'\"\`]\\)';
        */
        return '[$.]t\\([\'\"\`]' + middle + '[\'\"\`]\\)';
    }
    function getBaseReg() {
        return /[$.]t\(/g;
    }
    function readJson_fromFileSync(path) {
        /*
        return require(Logic.GlobalCfg.outDir + path);
        */
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    // TIP——————————————————————————————————————————————————————————————————————————————————————————————————————————————
    var Step1_findAll = /** @class */ (function () {
        function Step1_findAll() {
        }
        Step1_findAll.run = function () {
            searchOnce(getBaseReg(), Logic.GlobalCfg.allOccurFname);
        };
        return Step1_findAll;
    }());
    xX_VueI18N_simplifySlim_Helper.Step1_findAll = Step1_findAll;
    var Step2_genKeyMap = /** @class */ (function () {
        function Step2_genKeyMap() {
        }
        Step2_genKeyMap.run = function () {
            xX_VueI18N_Cli.KeyMap_Helper.extractMap(Logic.GlobalCfg.langObj);
        };
        return Step2_genKeyMap;
    }());
    xX_VueI18N_simplifySlim_Helper.Step2_genKeyMap = Step2_genKeyMap;
    var Step3_findMap_Occur = /** @class */ (function () {
        function Step3_findMap_Occur() {
        }
        Step3_findMap_Occur.run = function () {
            // const keyMapJson = require(Logic.GlobalCfg.outDir + Logic.GlobalCfg.keyMapJsonFname);
            var keyMapJson = readJson_fromFileSync(Logic.GlobalCfg.outDir + Logic.GlobalCfg.keyMapJsonFname);
            var middleStr = "(" + Object.keys(keyMapJson).map(function (k) {
                return xX_SRegexp_Helper.escapeRegex(k);
            }).join('|') + ")";
            var regExp = new RegExp(getSurroundReg(middleStr), 'g');
            console.log('正则', regExp);
            searchOnce(
            // /\$t\(['"`]form.Enable['"`]\)/,
            regExp, Logic.GlobalCfg.keyOccurFname);
        };
        return Step3_findMap_Occur;
    }());
    xX_VueI18N_simplifySlim_Helper.Step3_findMap_Occur = Step3_findMap_Occur;
    var Step4_InCp_NotInMap = /** @class */ (function () {
        function Step4_InCp_NotInMap() {
        }
        Step4_InCp_NotInMap.run = function (
        // needRun_Step_1_2 = false,
        ) {
            /*
            if (needRun_Step_1_2) {
                console.log('执行第一步');
                Step1_findAll.run();
                console.log('执行第二步');
                Step2_genKeyMap.run();
            }
            */
            // const all: Array<MatchItem>   = require(Logic.GlobalCfg.outDir + Logic.GlobalCfg.allOccurFname);
            var all = readJson_fromFileSync(Logic.GlobalCfg.outDir + Logic.GlobalCfg.allOccurFname);
            // console.log('all', all);
            // const exact: Array<MatchItem> = require(Logic.GlobalCfg.outDir + Logic.GlobalCfg.keyOccurFname);
            var exact = readJson_fromFileSync(Logic.GlobalCfg.outDir + Logic.GlobalCfg.keyOccurFname);
            // console.log('exact', exact);
            var reduce = all
                .map(function (preItem) {
                var preKey = preItem.filePath;
                var exactItem = exact.find(function (e) {
                    return e.filePath === preKey;
                });
                if (!exactItem) {
                    console.log('key不存在', 'preKey', preKey);
                    console.error('exactItem 元素不存在');
                    return undefined;
                }
                return {
                    filePath: preKey,
                    /**
                     * FIXME 此处，必须考虑一个问题
                     * 				1.一行中，出现了多个【$t】，则不应该都移除掉。
                     * 				2.应该按照【出现次数】，一次一次的移除。
                     */
                    /*
                    occurLines: preItem.occurLines.filter(preLine => {
                        return !exactItem.occurLines.includes(preLine);					// 只有不再包含的，才保留。
                    }),
                    */
                    occurLines: function () {
                        // TIP 此处，Exact行号数字的集合，必然是【ALL的行号数字的集合】的子集。
                        exactItem.occurLines.forEach(function (line) {
                            // 开始移除
                            removeOneElement_fisrtOccur_inArray(line, preItem.occurLines);
                        });
                        return preItem.occurLines;
                    }(),
                };
            })
                .filter(function (e) { return !!e; })
                .filter(function (e) { return e.occurLines.length > 0; });
            console.log('已经做了，同一行出现多个【$t】，的判断处理。    （测试通过）');
            xX_VueI18N_Cli.FilePathSearcher.writeOut_filePaths(reduce, Logic.GlobalCfg.InCp_NoInMap_FName);
            console.log('【组件用到 $t】比【国际化定义 $t】多的部分，已经处理完毕。');
        };
        return Step4_InCp_NotInMap;
    }());
    xX_VueI18N_simplifySlim_Helper.Step4_InCp_NotInMap = Step4_InCp_NotInMap;
    var Step5_NotInCp_InMap = /** @class */ (function () {
        function Step5_NotInCp_InMap() {
        }
        Step5_NotInCp_InMap.run = function () {
            var keys = Object.keys(
            // require(Logic.GlobalCfg.outDir + Logic.GlobalCfg.keyMapJsonFname),
            readJson_fromFileSync(Logic.GlobalCfg.outDir + Logic.GlobalCfg.keyMapJsonFname));
            var noOccurKeys = [];
            keys.forEach(function (k) {
                var regExp = new RegExp(getSurroundReg(k), 'g');
                // console.log('正则', regExp);
                var matches = searchOnce(regExp);
                if (matches.length === 0) {
                    // throw new Error(xX_ExceptionError_Helper.throwError_andLog(`${k} 未匹配到任何项`));
                    // console.error(`${k} 未匹配到任何项`);
                    noOccurKeys.push(k);
                }
            });
            // console.log('未出现的key', noOccurKeys);
            xX_VueI18N_Cli.FilePathSearcher.writeOut_filePaths(noOccurKeys, Logic.GlobalCfg.NotInCp_InMap_FName);
        };
        return Step5_NotInCp_InMap;
    }());
    xX_VueI18N_simplifySlim_Helper.Step5_NotInCp_InMap = Step5_NotInCp_InMap;
    // TIP——————————————————————————————————————————————————————————————————————————————————————————————————————————————
})(xX_VueI18N_simplifySlim_Helper || (xX_VueI18N_simplifySlim_Helper = {}));
var Logic = /** @class */ (function () {
    function Logic() {
    }
    //
    Logic.search = function (cfg) {
        if (cfg) {
            Logic.GlobalCfg = __assign(__assign({}, Logic.GlobalCfg), cfg);
        }
        xX_VueI18N_simplifySlim_Helper.Step1_findAll.run();
        xX_VueI18N_simplifySlim_Helper.Step2_genKeyMap.run();
        xX_VueI18N_simplifySlim_Helper.Step3_findMap_Occur.run();
        xX_VueI18N_simplifySlim_Helper.Step4_InCp_NotInMap.run();
        xX_VueI18N_simplifySlim_Helper.Step5_NotInCp_InMap.run();
    };
    //
    Logic.GlobalCfg = {
        targetDir: '../../../../fgex_admin/src',
        outDir: './build/',
        keyMapJsonFname: 'map-key.json',
        allOccurFname: 'i18n_all_occur.json',
        keyOccurFname: 'i18n_key_occur.json',
        InCp_NoInMap_FName: 'i18n_InCp_NoInMap.json',
        NotInCp_InMap_FName: 'i18n_NotInCp_InMap',
        langObj: {},
    };
    return Logic;
}());
/*
Logic.search(
    require('../../../../fgex_admin/src/project-config/i18n/zh').zhCN,
);
*/
export var xX_VueI18N_simplifySlim_Helper_Logic = Logic;
//# sourceMappingURL=VueI18N_simplifySlim_Helper.js.map