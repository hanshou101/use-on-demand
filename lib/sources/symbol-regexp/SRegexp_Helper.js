var xX_SRegexp_Helper = /** @class */ (function () {
    function xX_SRegexp_Helper() {
    }
    /**
     * 将传入【new Regexp() 构造函数】的字符串，进行转义
     * 				0.参考资料：https://stackoverflow.com/a/3561711/6264260
     *
     */
    xX_SRegexp_Helper.escapeRegex = function (string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    ;
    /**
     * 判断【正则表达式】相等，的方法
     * 				0.参考资料：https://stackoverflow.com/a/10776682/6264260
     */
    xX_SRegexp_Helper.regexSame = function (r1, r2) {
        if (r1 instanceof RegExp && r2 instanceof RegExp) {
            var props = ['global', 'multiline', 'ignoreCase', 'source', 'dotAll', 'sticky', 'unicode'];
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (r1[prop] !== r2[prop]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    ;
    return xX_SRegexp_Helper;
}());
export { xX_SRegexp_Helper };
//# sourceMappingURL=SRegexp_Helper.js.map