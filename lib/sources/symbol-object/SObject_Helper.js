export var xX_BaseVarType;
(function (xX_BaseVarType) {
    xX_BaseVarType["Array"] = "[object Array]";
    xX_BaseVarType["String"] = "[object String]";
    xX_BaseVarType["Number"] = "[object Number]";
    xX_BaseVarType["Boolean"] = "[object Boolean]";
    xX_BaseVarType["Null"] = "[object Null]";
    xX_BaseVarType["RegExp"] = "[object RegExp]";
    xX_BaseVarType["Undefined"] = "[object Undefined]";
})(xX_BaseVarType || (xX_BaseVarType = {}));
var xX_SObject_Helper = /** @class */ (function () {
    function xX_SObject_Helper() {
    }
    /**
     * 获取【普通变量】的【具体类型】。
     *        Array、String、Number、Boolean、Null、RegExp、Undefined
     */
    xX_SObject_Helper.getVar_BaseType = function (varAny) {
        var toString = Object.prototype.toString;
        return toString.call(varAny);
    };
    /**
     * 根据【已知value】，搜索【对应的key】
     *        1.可能有多个，所以是数组
     */
    xX_SObject_Helper.prototype.findKey_byValue_inObj = function (byValue, inObj) {
        var keyArray = [];
        for (var key in inObj) {
            if (inObj.hasOwnProperty(key)) { // 日常判断
                if (inObj[key] == byValue) { // 如果相等
                    keyArray.push(key); // 存入
                }
            }
        }
        return keyArray;
    };
    return xX_SObject_Helper;
}());
export { xX_SObject_Helper };
//# sourceMappingURL=SObject_Helper.js.map