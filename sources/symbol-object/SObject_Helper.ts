export enum BaseVarType {
  Array     = '[object Array]',
  String    = '[object String]',
  Number    = '[object Number]',
  Boolean   = '[object Boolean]',
  Null      = '[object Null]',
  RegExp    = '[object RegExp]',
  Undefined = '[object Undefined]',
}

export class SObject_Helper {
  /**
   * 获取【普通变量】的【具体类型】。
   *        Array、String、Number、Boolean、Null、RegExp、Undefined
   */
  public static getVar_BaseType(varAny: any): BaseVarType {
    const toString = Object.prototype.toString;
    return toString.call(varAny) as BaseVarType;
  }

  /**
   * 根据【已知value】，搜索【对应的key】
   *        1.可能有多个，所以是数组
   */
  public findKey_byValue_inObj(
    byValue: any,
    inObj: IndexedObj,
  ): Array<string> {
    const keyArray = [];
    for (const key in inObj) {
      if (inObj.hasOwnProperty(key)) {    // 日常判断
        if (inObj[key] == byValue) {        // 如果相等
          keyArray.push(key);               // 存入
        }
      }
    }
    return keyArray;
  }

}
