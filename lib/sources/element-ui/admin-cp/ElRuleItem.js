/**
 * 表单校验的Item
 */
var xX_MyEl_RuleItem = /** @class */ (function () {
    function xX_MyEl_RuleItem(/*propName: string,*/ message, required, trigger, __validator) {
        if (required === void 0) { required = true; }
        if (trigger === void 0) { trigger = 'blur'; }
        // 必填
        // this.propName = propName;
        this.message = message;
        // 可选
        this.required = required;
        this.trigger = trigger;
        // 没有默认值的可选
        if (__validator) {
            this.validator = __validator;
        }
    }
    return xX_MyEl_RuleItem;
}());
export { xX_MyEl_RuleItem };
//# sourceMappingURL=ElRuleItem.js.map