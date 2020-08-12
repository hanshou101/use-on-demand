export enum GeeStableE {
  // 以下两个，header是{}
  NoGeetest_false_0     = 'NoGeetest_false_0',
  NoGeetest_false_1     = 'NoGeetest_false_1',
  // 以下，header是{sign}
  ErrorGeetest__true_0  = 'ErrorGeetest__true_0',
  // 以下，header是{3个值}
  SuccessGeetest_true_1 = 'SuccessGeetest_true_1',
}

export class GeeStableUtil {
  /**
   * 根据服务器的两个字段，判断当前【极验稳定性级别】。
   *        1.可用。
   *        2.需降级。
   *        3.不可用。
   */
  public static calcCurrent_GeeStable(
    enable: EnableType | unknown,             // WARN 这个值，有可能是undefined
    success: SuccessType,            // WARN 这个值，必定是 1 或 0 。
  ) {
    const errorStr = `calcGeetestStatusEnum，传参错误，enable ${enable},success ${success}`;

    if (enable !== undefined && enable === false) {
      if (success === 1) {
        return GeeStableE.NoGeetest_false_1;       // false 1
      } else if (success === 0) {
        return GeeStableE.NoGeetest_false_0;       // false 0
      } else {
        alert(errorStr);
        throw new Error(errorStr);
      }
    } else {      // WARN enable为true或undefined的情况
      if (success === 1) {
        return GeeStableE.SuccessGeetest_true_1;   // true  1
      } else if (success === 0) {
        return GeeStableE.ErrorGeetest__true_0;    // true  0
      } else {
        alert(errorStr);
        throw new Error(errorStr);
      }
    }
  }


  /**
   * 获取【网络请求】的【极验Header】。
   */
  public static getRequest_GeeHeader(
    {geetest_challenge, geetest_validate, geetest_seccode}: SdkVerifyFingerResNS._RawData_SucType,
    sign: string,
    geeStatus: GeeStableE,
  ) {
    switch (geeStatus) {
      case GeeStableE.NoGeetest_false_1:
      case GeeStableE.NoGeetest_false_0: {
        return {};                                      // 不用传任何header
      }
      case GeeStableE.SuccessGeetest_true_1: {
        return {
          'gt-challenge': geetest_challenge,
          'gt-validate' : geetest_validate,
          'gt-seccode'  : geetest_seccode,
        };                                              // 极验成功
      }
      case GeeStableE.ErrorGeetest__true_0: {
        return {
          'gt-sign': sign,
        };
      }
      default: {
        const str = 'getHeader传参错误！';
        alert(str);
        throw new Error(str);
      }
    }
  }
}
