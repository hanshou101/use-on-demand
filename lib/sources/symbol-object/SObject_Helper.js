export var BaseVarType;
(function (BaseVarType) {
    BaseVarType["Array"] = "[object Array]";
    BaseVarType["String"] = "[object String]";
    BaseVarType["Number"] = "[object Number]";
    BaseVarType["Boolean"] = "[object Boolean]";
    BaseVarType["Null"] = "[object Null]";
    BaseVarType["RegExp"] = "[object RegExp]";
    BaseVarType["Undefined"] = "[object Undefined]";
})(BaseVarType || (BaseVarType = {}));
var SObject_Helper = /** @class */ (function () {
    function SObject_Helper() {
    }
    /**
     * 获取【普通变量】的【具体类型】。
     *        Array、String、Number、Boolean、Null、RegExp、Undefined
     */
    SObject_Helper.getVar_BaseType = function (varAny) {
        var toString = Object.prototype.toString;
        return toString.call(varAny);
    };
    /**
     * 根据【已知value】，搜索【对应的key】
     *        1.可能有多个，所以是数组
     */
    SObject_Helper.prototype.findKey_byValue_inObj = function (byValue, inObj) {
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
    return SObject_Helper;
}());
export { SObject_Helper };
//# sourceMappingURL=SObject_Helper.js.map