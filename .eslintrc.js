module.exports = {
	root          : true,
	env           : {
		node: true,
	},
	extends       : [
		'plugin:vue/essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'@vue/prettier',
		'@vue/prettier/@typescript-eslint',
	],
	parserOptions : {
		ecmaVersion: 2020,
	},
	overrides     : [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env  : {
				jest: true,
			},
		},
	],
	ignorePatterns: ['*.common.js'],
	rules         : {
		'no-console'                      : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger'                     : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		quotes                            : ['error', 'single', { 'allowTemplateLiterals': true }],
		'prettier/prettier'               : 'warn',				// 同时采用【Prettier】的规则
		//
		//
		// TIP 确定下来的新规则
		'@typescript-eslint/no-this-alias': [
			'error',
			{
				'allowDestructuring': true, // Allow `const { props, state } = this`; false by default
				'allowedNames'      : ['self', 'that'], // Allow `const self = this`; `[]` by default
			},
		],

		// WARN 暂行规则
		'@typescript-eslint/camelcase'           : 'off',
		'@typescript-eslint/no-empty-function'   : 'off',
		'@typescript-eslint/no-unused-vars'      : 'off',
		'@typescript-eslint/no-var-requires'     : 'off',
		'@typescript-eslint/ban-ts-ignore'       : 'off',				// FIXME 合适的时候可以开启
		'@typescript-eslint/no-inferrable-types' : 'off',
		'@typescript-eslint/class-name-casing'   : 'off',
		'no-var'                                 : 'warn',
		'@typescript-eslint/no-explicit-any'     : 'off',
		'no-useless-escape'                      : 'off',
		'@typescript-eslint/no-empty-interface'  : 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-namespace'        : 'off',
		'prefer-rest-params'                     : 'off',
		'no-async-promise-executor'              : 'off',
		'no-empty'                               : 'off',
	},
};

