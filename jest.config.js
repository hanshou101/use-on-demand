const __customCfg = {
	testFileDir : 'tests',
	coverageDirs: [
		'sources',
		'packages',
	],
};

console.log('jest', '当前工作目录', process.cwd());

/**
 * 设置【测试范围】
 */
const targetCfg = {
	/**
	 * 设置，测试的目录范围
	 *        1.此处，必须加【双**号】在前面？？？
	 *                1.为什么不能直接以【test/】起头？
	 *
	 *        2.【?(a|b)】，0次或1次
	 *        3.【*(a|b)】，0次或更多次
	 *        4.【+(a|b)】，1次或更多次
	 *        5.【@(a|b)】，1次
	 */
	'testMatch'           : [
		`**/${__customCfg.testFileDir}/?(*.)+(spec|test).[jt]s?(x)`,
	],
	/**
	 * ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
	 *
	 * 场景：测试时，报有些【package.json】解析错误。
	 *
	 * 解决：
	 * 				1.最开始，以为是【解析目录】出现了问题。
	 * 				2.后来发现，只是另外两个【package.json】文件为空，没有按照【标准规范】来。
	 */
	/*
	rootDir               : process.cwd(),																			  //
	*/
	//
	'moduleFileExtensions': [
		'js',
		'ts',																// 新加
		// 'tsx',
		'json',
		// tell Jest to handle `*.vue` files
		'vue',
	],
};

/**
 * 设置【编译过程】中的选项。
 */
const compileCfg = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',				// 是否对应着 TypeScript ？

	'transform'       : {
		// process `*.vue` files with `vue-jest`
		'.*\\.(vue)$': 'vue-jest',
		// 使用babel
		'.*\\.(js)$' : 'babel-jest',
	},
	// support the same @ -> src alias mapping in source code
	'moduleNameMapper': {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
};

/**
 * 测试覆盖率
 */
const coverageCfg = {
	// 测试覆盖率
	'collectCoverage'    : true,
	'collectCoverageFrom': [
		// TIP——————————————————————————————包含路径——————————————————————————————————
		// 此处，竟然不能用【斜杠 /】？？？又是什么【glob】的怪癖么？？？
		// 'src/**/*.{js,vue}',
		...__customCfg.coverageDirs.map(d => {
			return `${d}/**/*.{ts,js,vue}`;
		}),
		// TIP——————————————————————————————排除路径——————————————————————————————————
		'!**/node_modules/**',
		// WARN 此处，可以指定相对路径？（这就很棒）
		'!sources/tradingview/charting_library/**',				// 忽略【TradingView】的打包后文件。
		// WARN 此处，可以指定相对路径？（这就很棒）
		'!sources/swap/CalcReturnTest/data/bitmex.ts',					// 排除过大的测试数据。
	],
	'coverageDirectory'  : 'tests/coverage',												// 输出【覆盖率分析结果】文件的路径。
};


module.exports = {
	// 测试范围
	...targetCfg,
	// 编译过程，中的选项
	...compileCfg,
	// 测试覆盖率
	...coverageCfg,
};
