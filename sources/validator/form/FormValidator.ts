export class xX_FormValidator {
  public static chinaCode = '+86';

  public static isPureNumber(str: string) {
    return /^\d+$/.test(str);
  }

  /**
   * 是否中国手机
   */
  public static isChinaPhone(phone: string) {
    return /^1([3456789])\d{9}$/.test(phone);
  }

  /**
   * 是否外国手机
   */
  public static isForeignPhone(phone: string) {
    return this.isPureNumber(phone);
  }

  /**
   * 是否邮箱
   */
  public static isEmail(email: string) {
    const reg = /^([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
    return reg.test(email);
  }

  /**
   * 是否登录密码
   */
  public static isLoginPassword(pwd: string) {
    return /^.{6,20}$/.test(pwd);
  }

  /**
   * 是否【手机邮箱验证码】
   */
  public static isPhoneEmailValidateCode(code: string) {
    return /^.{6}$/.test(code);
  }

  /**
   * 是否【邀请码】
   */
  public static isInviteCode(code: string) {
    return /^[0-9A-Za-z]+$/.test(code);
  }

}
