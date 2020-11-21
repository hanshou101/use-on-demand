module.exports = {
	/**
	 * 将传入【new Regexp() 构造函数】的字符串，进行转义
	 * 				0.参考资料：https://stackoverflow.com/a/3561711/6264260
	 *
	 * @param {string} string
	 * @return {string}
	 */
	__escapeRegex(string) {
		return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	},
};
