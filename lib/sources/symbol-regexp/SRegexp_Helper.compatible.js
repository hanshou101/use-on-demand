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
	/**
	 * 判断【正则表达式】相等，的方法
	 * 				0.参考资料：https://stackoverflow.com/a/10776682/6264260
	 */
	__regexSame(r1, r2) {
		if (r1 instanceof RegExp && r2 instanceof RegExp) {
			const props = ['global', 'multiline', 'ignoreCase', 'source', 'dotAll', 'sticky', 'unicode'];
			for (let i = 0; i < props.length; i++) {
				const prop = props[i];
				if (r1[prop] !== r2[prop]) {
					return false;
				}
			}
			return true;
		}
		return false;
	},
};
