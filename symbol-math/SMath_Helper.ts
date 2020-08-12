export class SMath_Helper {
  /**
   * 科学计数法转化的工具。
   */
  public static scienceNumber_transToPlainText(num: any) {
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

  /**
   * 数字添加千分位符
   */
  public static parseToThousandth = (num: number, point = 0) => {
    let [sInt, sFloat] = (Number.isInteger(num) ? `${num}` : num.toFixed(point)).split('.');
    sInt               = sInt.replace(/\d(?=(\d{3})+$)/g, '$&,');
    return sFloat ? `${sInt}.${sFloat}` : `${sInt}`;
  }
}


