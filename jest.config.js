const __customCfg = {
	testFileDir : 'tests',
	coverageDirs: [
		'sources',
		'packages',
	],
};

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
	'testMatch': [
		`**/${__customCfg.testFileDir}/?(*.)+(spec|test).[jt]s?(x)`,
	],

	//
	'moduleFileExtensions': [
		'js',
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
		// 此处，竟然不能用【斜杠 /】？？？又是什么【glob】的怪癖么？？？
		// 'src/**/*.{js,vue}',
		...__customCfg.coverageDirs.map(d => {
			return `${d}/**/*.{js,vue}`;
		}),
		'!**/node_modules/**',
	],
};


module.exports = {
	// 测试范围
	...targetCfg,
	// 编译过程，中的选项
	...compileCfg,
	// 测试覆盖率
	...coverageCfg,
};
