import { __assign } from "tslib";
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
export var xX_Zepto_TypeDetectE;
(function (xX_Zepto_TypeDetectE) {
    xX_Zepto_TypeDetectE["boolean"] = "boolean";
    xX_Zepto_TypeDetectE["number"] = "number";
    xX_Zepto_TypeDetectE["string"] = "string";
    xX_Zepto_TypeDetectE["function"] = "function";
    xX_Zepto_TypeDetectE["array"] = "array";
    xX_Zepto_TypeDetectE["date"] = "date";
    xX_Zepto_TypeDetectE["regexp"] = "regexp";
    xX_Zepto_TypeDetectE["object"] = "object";
    xX_Zepto_TypeDetectE["error"] = "error";
})(xX_Zepto_TypeDetectE || (xX_Zepto_TypeDetectE = {}));
var class2type = {};
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (name, i) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
});
var toString = class2type.toString;
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
     * 从【Zepto】库中，抽取出来的【类型判断】
     * 				0.参考资料：
     * 									源码讲解：https://juejin.cn/post/6844903494852296711
     * 									源码查看：https://sourcegraph.com/github.com/madrobby/zepto@master/-/blob/src/zepto.js#L67:1
     */
    xX_SObject_Helper.typeDetect_judgeType_inZeptoLib = function (obj) {
        return obj == null
            ? String(obj)
            : (class2type[toString.call(obj)] || 'object');
    };
    /**
     * 将一个【JSON对象】的所有key，展开为 全部由【a.b.c】组成的数组形式。
     * @return 返回一个Map，key为多节，value为【叶子末梢】值。
     */
    xX_SObject_Helper.flatJson_toKeyChain = function (json, __cfg, __data) {
        var _this = this;
        if (__cfg === void 0) { __cfg = {}; }
        if (__data === void 0) { __data = {}; }
        var cfg = __assign({ 
            // 默认项
            superDeep: true, needRemainValue: true }, __cfg);
        var data = __assign({ 
            // 默认项
            prevKey: '', resultMap: {} }, __data);
        Object.keys(json).forEach(function (newKey) {
            // 拼接成【a.b】。（a可能已是多节。）
            var thisKey = "" + (data.prevKey ? data.prevKey + "." : '') + newKey;
            var v = json[newKey];
            // 如果仍是【对象】或【数组】。
            [
                xX_Zepto_TypeDetectE.object,
                cfg.superDeep ? xX_Zepto_TypeDetectE.array : null,
            ].filter(function (v) { return !!v; })
                .includes(_this.typeDetect_judgeType_inZeptoLib(v))
                ? _this.flatJson_toKeyChain(v, cfg, {
                    prevKey: thisKey,
                    resultMap: data.resultMap,
                })
                : (data.resultMap[thisKey] = cfg.needRemainValue ? v : undefined);
        });
        return data.resultMap;
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