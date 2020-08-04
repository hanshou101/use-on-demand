export class SMath_Helper {
  /**
   * 科学计数法转化的工具。
   */
  static scienceNumber_transToPlainText(num: any) {
    // 如果【非数字格式】，则返回
    if (isNaN(num)) {
      return num;
    }
    // 处理不需要转换的数字
    const str = '' + num;
    if (!/e/i.test(str)) {
      return num;
    }
    return (num).toFixed(18).replace(/\.?0+$/, '');    // 最后的分支，返回替换的结果。
  }
}


