var xX_FormValidator = /** @class */ (function () {
    function xX_FormValidator() {
    }
    xX_FormValidator.isPureNumber = function (str) {
        return /^\d+$/.test(str);
    };
    /**
     * 是否中国手机
     */
    xX_FormValidator.isChinaPhone = function (phone) {
        return /^1([3456789])\d{9}$/.test(phone);
    };
    /**
     * 是否外国手机
     */
    xX_FormValidator.isForeignPhone = function (phone) {
        return this.isPureNumber(phone);
    };
    /**
     * 是否邮箱
     */
    xX_FormValidator.isEmail = function (email) {
        var reg = /^([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
        return reg.test(email);
    };
    /**
     * 是否登录密码
     */
    xX_FormValidator.isLoginPassword = function (pwd) {
        return /^.{6,20}$/.test(pwd);
    };
    /**
     * 是否【手机邮箱验证码】
     */
    xX_FormValidator.isPhoneEmailValidateCode = function (code) {
        return /^.{6}$/.test(code);
    };
    /**
     * 是否【邀请码】
     */
    xX_FormValidator.isInviteCode = function (code) {
        return /^[0-9A-Za-z]+$/.test(code);
    };
    xX_FormValidator.chinaCode = '+86';
    return xX_FormValidator;
}());
export { xX_FormValidator };
//# sourceMappingURL=FormValidator.js.map