const cfg = {
	printWidth                : 80, 					// 超过这个长度，将自动换行
	tabWidth                  : 2, 						// Tab宽度
	useTabs                   : true,        	// 使用Tab，而不是空格
	semi                      : true, 				// 分号
	singleQuote               : true, 				// 使用单引号
	quoteProps                : 'as-needed', 	// 引号时机（仅在需要时，在周围添加引号）
	//
	trailingComma             : 'all',				// 行尾是否保留逗号
	bracketSpacing            : true,					// 在对象内，文字和括号间，是否保留空格
	arrowParens               : 'always',			// 箭头函数，参数周围，包裹括号
	rangeStart                : 0,						// 格式化的开头位置
	rangeEnd                  : Infinity,			// 格式化的结尾位置
	requirePragma             : true,				// 是否仅格式化包含【@prettier、@format】注释的文件，进行格式化
	insertPragma              : true,				// 是否自动在【已格式化】文件，头部自动插入【@prettier、@format】注释？
	proseWrap                 : 'preserve',		// 是否对 markdown文件，执行换行
	htmlWhitespaceSensitivity : 'strict',			// 在HTML文件中，对空格的敏感度，是否非常高
	vueIndentScriptAndStyle   : true,					// 是否缩进 Vue文件<script>和<style>中的代码？		WARN 使用less的话，建议打开
	endOfLine                 : 'auto',				// 行尾结束符的选用。  auto-维持现有文件的行尾
	embeddedLanguageFormatting: 'auto',				// 对于 文件中嵌入形式的代码，是否格式化  auto-自动识别格式化 off-关闭 。
	//
	// parser        : 'typescript', // 解析器。WARN Prettier会自动从输入文件路径推断出解析器。
	// filepath: '',								 // 仅在【CLI】和【API】中有用。在配置文件中无用。

};

module.exports = cfg;
