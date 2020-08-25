export class FormValidator {
    static isPureNumber(str) {
        return /^\d+$/.test(str);
    }
    /**
     * 是否中国手机
     */
    static isChinaPhone(phone) {
        return /^1([3456789])\d{9}$/.test(phone);
    }
    /**
     * 是否外国手机
     */
    static isForeignPhone(phone) {
        return this.isPureNumber(phone);
    }
    /**
     * 是否邮箱
     */
    static isEmail(email) {
        const reg = /^([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
        return reg.test(email);
    }
    /**
     * 是否登录密码
     */
    static isLoginPassword(pwd) {
        return /^.{6,20}$/.test(pwd);
    }
    /**
     * 是否【手机邮箱验证码】
     */
    static isPhoneEmailValidateCode(code) {
        return /^.{6}$/.test(code);
    }
    /**
     * 是否【邀请码】
     */
    static isInviteCode(code) {
        return /^[0-9A-Za-z]+$/.test(code);
    }
}
FormValidator.chinaCode = '+86';
//# sourceMappingURL=FormValidator.js.map