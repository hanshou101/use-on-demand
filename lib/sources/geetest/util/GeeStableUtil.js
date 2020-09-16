export var xX_GeeStableE;
(function (xX_GeeStableE) {
    // 以下两个，header是{}
    xX_GeeStableE["NoGeetest_false_0"] = "NoGeetest_false_0";
    xX_GeeStableE["NoGeetest_false_1"] = "NoGeetest_false_1";
    // 以下，header是{sign}
    xX_GeeStableE["ErrorGeetest__true_0"] = "ErrorGeetest__true_0";
    // 以下，header是{3个值}
    xX_GeeStableE["SuccessGeetest_true_1"] = "SuccessGeetest_true_1";
})(xX_GeeStableE || (xX_GeeStableE = {}));
var xX_GeeStableUtil = /** @class */ (function () {
    function xX_GeeStableUtil() {
    }
    /**
     * 根据服务器的两个字段，判断当前【极验稳定性级别】。
     *        1.可用。
     *        2.需降级。
     *        3.不可用。
     */
    xX_GeeStableUtil.calcCurrent_GeeStable = function (enable, // WARN 这个值，有可能是undefined
    success) {
        var errorStr = "calcGeetestStatusEnum\uFF0C\u4F20\u53C2\u9519\u8BEF\uFF0Cenable " + enable + ",success " + success;
        if (enable !== undefined && enable === false) {
            if (success === 1) {
                return xX_GeeStableE.NoGeetest_false_1; // false 1
            }
            else if (success === 0) {
                return xX_GeeStableE.NoGeetest_false_0; // false 0
            }
            else {
                alert(errorStr);
                throw new Error(errorStr);
            }
        }
        else { // WARN enable为true或undefined的情况
            if (success === 1) {
                return xX_GeeStableE.SuccessGeetest_true_1; // true  1
            }
            else if (success === 0) {
                return xX_GeeStableE.ErrorGeetest__true_0; // true  0
            }
            else {
                alert(errorStr);
                throw new Error(errorStr);
            }
        }
    };
    /**
     * 获取【网络请求】的【极验Header】。
     */
    xX_GeeStableUtil.getRequest_GeeHeader = function (_a, sign, geeStatus) {
        var geetest_challenge = _a.geetest_challenge, geetest_validate = _a.geetest_validate, geetest_seccode = _a.geetest_seccode;
        switch (geeStatus) {
            case xX_GeeStableE.NoGeetest_false_1:
            case xX_GeeStableE.NoGeetest_false_0: {
                return {}; // 不用传任何header
            }
            case xX_GeeStableE.SuccessGeetest_true_1: {
                return {
                    'gt-challenge': geetest_challenge,
                    'gt-validate': geetest_validate,
                    'gt-seccode': geetest_seccode,
                }; // 极验成功
            }
            case xX_GeeStableE.ErrorGeetest__true_0: {
                return {
                    'gt-sign': sign,
                };
            }
            default: {
                var str = 'getHeader传参错误！';
                alert(str);
                throw new Error(str);
            }
        }
    };
    return xX_GeeStableUtil;
}());
export { xX_GeeStableUtil };
//# sourceMappingURL=GeeStableUtil.js.map