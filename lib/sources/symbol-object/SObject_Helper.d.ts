export declare enum xX_BaseVarType {
    Array = "[object Array]",
    String = "[object String]",
    Number = "[object Number]",
    Boolean = "[object Boolean]",
    Null = "[object Null]",
    RegExp = "[object RegExp]",
    Undefined = "[object Undefined]"
}
export declare class xX_SObject_Helper {
    /**
     * 获取【普通变量】的【具体类型】。
     *        Array、String、Number、Boolean、Null、RegExp、Undefined
     */
    static getVar_BaseType(varAny: any): xX_BaseVarType;
    /**
     * 根据【已知value】，搜索【对应的key】
     *        1.可能有多个，所以是数组
     */
    findKey_byValue_inObj(byValue: any, inObj: IndexedObj): Array<string>;
}
//# sourceMappingURL=SObject_Helper.d.ts.map