export declare enum xX_BaseVarType {
    Array = "[object Array]",
    String = "[object String]",
    Number = "[object Number]",
    Boolean = "[object Boolean]",
    Null = "[object Null]",
    RegExp = "[object RegExp]",
    Undefined = "[object Undefined]"
}
export declare enum xX_Zepto_TypeDetectE {
    boolean = "boolean",
    number = "number",
    string = "string",
    function = "function",
    array = "array",
    date = "date",
    regexp = "regexp",
    object = "object",
    error = "error"
}
export declare class xX_SObject_Helper {
    /**
     * 获取【普通变量】的【具体类型】。
     *        Array、String、Number、Boolean、Null、RegExp、Undefined
     */
    static getVar_BaseType(varAny: any): xX_BaseVarType;
    /**
     * 从【Zepto】库中，抽取出来的【类型判断】
     * 				0.参考资料：
     * 									源码讲解：https://juejin.cn/post/6844903494852296711
     * 									源码查看：https://sourcegraph.com/github.com/madrobby/zepto@master/-/blob/src/zepto.js#L67:1
     */
    static typeDetect_judgeType_inZeptoLib(obj: any): xX_Zepto_TypeDetectE;
    /**
     * 将一个【JSON对象】的所有key，展开为 全部由【a.b.c】组成的数组形式。
     * @return 返回一个Map，key为多节，value为【叶子末梢】值。
     */
    static flatJson_toKeyChain(json: IndexedObj, prevKey?: string, resultMap?: IndexedObj): IndexedObj;
    /**
     * 根据【已知value】，搜索【对应的key】
     *        1.可能有多个，所以是数组
     */
    findKey_byValue_inObj(byValue: any, inObj: IndexedObj): Array<string>;
}
//# sourceMappingURL=SObject_Helper.d.ts.map