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

  /**
   * 随机整数。
   */
  public static randomInt(min: number, max: number) {
    const zero_to_0999 = Math.random();    // 0 到 0.9999。
    const range        = max - min;
    const change       = zero_to_0999 * (range + 1);        // WHY 这句话看上去有问题。但实际好像是正确的？

    return parseInt(change + min, 10);
  }

  /**
   * TODO 随机小数[ 0.0 , 4.0 ]，这种方式？？？  似乎很难实现？？？
   */

}


