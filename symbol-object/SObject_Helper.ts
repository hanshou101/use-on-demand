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

}
