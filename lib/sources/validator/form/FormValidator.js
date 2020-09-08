var FormValidator = /** @class */ (function () {
    function FormValidator() {
    }
    FormValidator.isPureNumber = function (str) {
        return /^\d+$/.test(str);
    };
    /**
     * 是否中国手机
     */
    FormValidator.isChinaPhone = function (phone) {
        return /^1([3456789])\d{9}$/.test(phone);
    };
    /**
     * 是否外国手机
     */
    FormValidator.isForeignPhone = function (phone) {
        return this.isPureNumber(phone);
    };
    /**
     * 是否邮箱
     */
    FormValidator.isEmail = function (email) {
        var reg = /^([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
        return reg.test(email);
    };
    /**
     * 是否登录密码
     */
    FormValidator.isLoginPassword = function (pwd) {
        return /^.{6,20}$/.test(pwd);
    };
    /**
     * 是否【手机邮箱验证码】
     */
    FormValidator.isPhoneEmailValidateCode = function (code) {
        return /^.{6}$/.test(code);
    };
    /**
     * 是否【邀请码】
     */
    FormValidator.isInviteCode = function (code) {
        return /^[0-9A-Za-z]+$/.test(code);
    };
    FormValidator.chinaCode = '+86';
    return FormValidator;
}());
export { FormValidator };
//# sourceMappingURL=FormValidator.js.map