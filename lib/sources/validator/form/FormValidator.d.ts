export declare class xX_FormValidator {
    static chinaCode: string;
    static isPureNumber(str: string): boolean;
    /**
     * 是否中国手机
     */
    static isChinaPhone(phone: string): boolean;
    /**
     * 是否外国手机
     */
    static isForeignPhone(phone: string): boolean;
    /**
     * 是否邮箱
     */
    static isEmail(email: string): boolean;
    /**
     * 是否登录密码
     */
    static isLoginPassword(pwd: string): boolean;
    /**
     * 是否【手机邮箱验证码】
     */
    static isPhoneEmailValidateCode(code: string): boolean;
    /**
     * 是否【邀请码】
     */
    static isInviteCode(code: string): boolean;
}
//# sourceMappingURL=FormValidator.d.ts.map