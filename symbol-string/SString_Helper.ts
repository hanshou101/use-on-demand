export class SString_Helper {

  /**
   * 创建一个【独一无二】的【随机字符串】
   */
  static create_RandUnique_Str() {
    const timestamp = '' + new Date().valueOf();
    const randomNum = '' + parseInt(((1 + Math.random()) * 65536));
    return randomNum.concat(timestamp).toString(32);
  }

}
