import fs                                          from 'fs';
import path                                        from 'path';
import { __escapeRegex }                           from '../../symbol-regexp/SRegexp_Helper.compatible';
import { xX_SObject_Helper, xX_Zepto_TypeDetectE } from '../../symbol-object/SObject_Helper';
import { xX_ExceptionError_Helper }                from '../../exception-error/ExceptionError_Helper';
import { xX_SRegexp_Helper }                       from '../../symbol-regexp/SRegexp_Helper';

interface MatchItem {
	filePath: string;
	occurLines: Array<number>;
}

interface SearchCfg {
	pattern?: string | RegExp;				// 文件格式
	needBoundary?: boolean;          // 需要【空白边界】
	ext?: string;             				// 后缀名
}


/**
 * 格式化，目录分隔符。
 *
 * 转化【Windows的反斜杠分隔符】为通用格式
 *        0.参考资料：https://stackoverflow.com/a/63251716/6264260
 */
function formatDirSep(filePath: string) {
	// filePath: path.normalize(path.resolve(file)),   // 转化【Windows的反斜杠分隔符】为通用格式     // WARN 似乎不起作用
	return filePath.split(path.sep).join(path.posix.sep);
}


/**
 * 从数组中，根据Value值，移除（遇到的）第一个元素。
 * 				1.只移除一个。
 * 				2.如果有多个的情况下，只会移除第一个。
 */
function removeOneElement_fisrtOccur_inArray(target: any, arr: Array<any>) {
	const index = arr.indexOf(target);
	if (index !== -1) {
		arr.splice(index, 1);
	}
}

/**
 * 查找文件：
 *        1.参考资料：https://stackoverflow.com/a/48665880/6264260
 *
 */
namespace xX_VueI18N_Cli {

	/**
	 * 文件路径查找器
	 */
	export class FilePathSearcher {
		// TIP——————————————————————————————————————————————————————公有方法——————————————————————————————————————————————————————————————

		/**
		 * 写出【文件路径】的JSON文件。
		 */
		public static writeOut_filePaths(matches: Array<MatchItem>, fileName: string) {
			// console.log('输出结果', matches);
			fs.writeFileSync(GlobalCfg.outDir + fileName, JSON.stringify(matches, null, 2));
			console.log('生成了文件');
		}

		/**
		 * 处理单个文件的逻辑
		 */
		public static handleSingleFile_logic(
			filePath: string,
			regex: RegExp,
		): NullableType<MatchItem> {
			const fileContent = fs.readFileSync(filePath, {
				encoding: 'utf8',                    // 指定一个【encoding】，才能返回【string】
			});

			if (regex.test(fileContent)) {																				// 如果匹配到了文件。
				try {
					return {
						filePath  : formatDirSep(filePath),
						occurLines: LineHelper.regex_lineNums(fileContent, regex),
					};
				} catch (e) {
					console.log('filePath', filePath);
					console.log('fileContent', fileContent);
					throw new Error(e);
				}
			} else {
				return null;
			}
		}

		/**
		 * 获取所有的【文件】路径，的列表。
		 */
		public static allFilesInDirectory(
			dir: string,
			__cfg: SearchCfg = {},
		): Array<string> {
			const cfg = {
				// 默认项
				pattern     : 'HelloWorld',   // 默认
				needBoundary: false,          // 默认
				ext         : '',             // 默认
				// 用户传入项
				...__cfg,
			} as NoUndefinedField<SearchCfg>;

			if (cfg.pattern instanceof RegExp) {		// 如果是正则，则强行做一个global判断
				if (!cfg.pattern.global) {
					throw  new Error(xX_ExceptionError_Helper.throwError_andLog('如果是RegExp类型，则必须加【g】关键字！'));
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

			let regex: RegExp;

			if (xX_SObject_Helper.typeDetect_judgeType_inZeptoLib(cfg.pattern) === xX_Zepto_TypeDetectE.regexp) {
				regex = cfg.pattern as RegExp;
			} else {
				// WARN 此处，必须要考虑Regexp转义
				const escapedStr = __escapeRegex(cfg.pattern as string);
				console.log('转换后文本', escapedStr);
				// We want full words, so we use full word boundary in regex.
				regex = cfg.needBoundary
					? new RegExp('\\b' + escapedStr + '\\b', 'g')            // 两侧带有边界？
					: new RegExp(escapedStr, 'g');                           // 两侧没必要带边界
			}
			console.log('正则', regex);


			// 迭代，获取所有的子文件路径。
			const files = this.__getFilesInDirectory(dir, cfg.ext);
			console.log(`从 ${files.length} 个文件中，进行筛选`);

			return files;
		}


		// TIP——————————————————————————————————————————————————————私有方法——————————————————————————————————————————————————————————————

		/**
		 * 递归，找到所有的【子文件】。
		 * 				1.包括子文件夹的。
		 */
		private static __getFilesInDirectory(dir: string, ext = '') {

			// 判断目录是否存在
			if (!fs.existsSync(dir)) {
				throw new Error(xX_ExceptionError_Helper.throwError_andLog(`指定目录: ${dir} 不存在！`));
			}

			let allFilePaths: Array<string> = [];

			// 读取子文件夹、子文件
			fs.readdirSync(dir).forEach(file => {
				const filePath = path.join(dir, file);
				const stat     = fs.lstatSync(filePath);

				if (stat.isDirectory()) {																										// 如果是子文件夹
					const nestedFiles = this.__getFilesInDirectory(filePath, ext);
					allFilePaths      = allFilePaths.concat(nestedFiles);
				} else {																																		// 如果是子文件
					// 后缀匹配，或者，没有后缀限制
					const matched = !ext || (path.extname(file) === ext);
					if (matched) {
						allFilePaths.push(filePath);
					}
				}
			});

			return allFilePaths;
		}

	}

	/**
	 * 【行数】处理工具。
	 */
	class LineHelper {

		// TIP——————————————————————————————————————————————————————公有方法——————————————————————————————————————————————————————————————


		public static regex_lineNums(
			rawContent: string,
			regex: RegExp,
		) {
			// var string = "This\nstring\nhas\nmultiple\nlines.",
			const astring              = rawContent.split('\n');       // WARN 此处，对于【\r\n】应该也是匹配的？
			let foundon: number;
			const lines: Array<number> = [];
			astring.forEach((line, number) => {
				// const results = regex.exec(line);        // FIXME 此处，不适宜用【exec】！
				/**
				 * 使用matchAll，才能达到目标
				 *        1.FIXME 是否Node.js的【matchAll】，实现方式和ES不一样？？？？？？同样的输入，结果却不同。
				 */
					// console.log('行', line);
				const testRegexp = /\$t\(/g;
				/**
				 * FIXME 此处，有个非常蛋疼的Bug。两个正则完全相等，但最后匹配出的结果，却不一样。
				 *        ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
				 *        ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
				 */
							// console.log('两个正则，是否相等', __regexSame(testRegexp, regex));
				const results    = new Array(...(line.matchAll(regex)));
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
					results.forEach(r => {
						lines.push(foundon);
					});
				}
			});
			return lines;
		}

		/**
		 *
		 * @param targetStr 需要查找的字符串
		 * @param rawContent 大段文本
		 * @return {[]}
		 */
		public static str_lineNumbers(
			targetStr: string,
			rawContent: string,
		) {
			if (targetStr !== '') {
				const i   = 0, a = [];
				let index = -1;
				while (
					(index = rawContent.indexOf(targetStr, index + 1)) !== -1
					) {
					a.push(this.__str_lineNumberByIndex(index, rawContent));
				}
				return a;
			} else {
				throw  new Error(xX_ExceptionError_Helper.throwError_andLog('没有找到任何匹配内容！'));
			}
		}

		// TIP——————————————————————————————————————————————————————私有方法——————————————————————————————————————————————————————————————

		private static __str_lineNumberByIndex(
			index: number,
			string: string,
		) {
			let line = 0;
			let match;
			const re = /(^)[\S\s]/gm;
			while (match = re.exec(string)) {
				if (match.index > index)
					break;
				line++;
			}
			return line;
		}

	}

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

const GlobalCfg = {
	targetDir: '../../../../fgex_admin/src',
	outDir   : './build/',
};

function searchOnce(
	pattern: RegExp,
	outName: UndefinedAbleType<string> = undefined,
) {
	const allFiles = xX_VueI18N_Cli.FilePathSearcher.allFilesInDirectory(GlobalCfg.targetDir, {
		pattern: pattern,
	});

	const matches: Array<MatchItem> = [];

	allFiles.forEach(f => {
		const item = xX_VueI18N_Cli.FilePathSearcher.handleSingleFile_logic(f, pattern);
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


class Step1 {
	public static run() {
		searchOnce(/\$t\(/g, 'xX_$t.json');
	}
}

class Step2 {
	public static run() {
		const middleStr = `(${Object.keys(require('./build/xX_map.json')).map(k => {
			return xX_SRegexp_Helper.escapeRegex(k);
		}).join('|')})`;
		const regExp    = new RegExp(
			'\\$t\\([\'\"\`]' + middleStr + '[\'\"\`]\\)',
			'g',
		);
		console.log('正则', regExp);
		searchOnce(
			// /\$t\(['"`]form.Enable['"`]\)/,
			regExp,
			'xX_$t_map.json',
		);
	}
}

class Step3 {
	public static run() {
		console.log('执行第一步');
		Step1.run();
		console.log('执行第二步');
		Step2.run();

		const all: Array<MatchItem>   = require('./build/xX_$t.json');
		const exact: Array<MatchItem> = require('./build/xX_$t_map.json');

		const reduce = (all
			.map(preItem => {
				const preKey    = preItem.filePath;
				const exactItem = exact.find(e => {
					return e.filePath === preKey;
				});
				if (!exactItem) {
					console.log('key不存在', 'preKey', preKey);
					console.error('exactItem 元素不存在');
					return undefined;
				}

				return {
					filePath  : preKey,
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
					occurLines: function() {
						// TIP 此处，Exact行号数字的集合，必然是【ALL的行号数字的集合】的子集。
						exactItem.occurLines.forEach(line => {
							// 开始移除
							removeOneElement_fisrtOccur_inArray(line, preItem.occurLines);
						});
						return preItem.occurLines;
					}(),
				};
			})
			.filter(e => !!e) as Array<MatchItem>)
			.filter(e => e.occurLines.length > 0);

		console.log('已经做了，同一行出现多个【$t】，的判断处理。    （测试通过）');
		xX_VueI18N_Cli.FilePathSearcher.writeOut_filePaths(reduce, 'xX_$t_reduce.json');
		console.log('【组件用到 $t】比【国际化定义 $t】多的部分，已经处理完毕。');
	}
}

Step3.run();
