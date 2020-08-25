export declare enum GeeStableE {
    NoGeetest_false_0 = "NoGeetest_false_0",
    NoGeetest_false_1 = "NoGeetest_false_1",
    ErrorGeetest__true_0 = "ErrorGeetest__true_0",
    SuccessGeetest_true_1 = "SuccessGeetest_true_1"
}
export declare class GeeStableUtil {
    /**
     * 根据服务器的两个字段，判断当前【极验稳定性级别】。
     *        1.可用。
     *        2.需降级。
     *        3.不可用。
     */
    static calcCurrent_GeeStable(enable: EnableType | unknown, // WARN 这个值，有可能是undefined
    success: SuccessType): GeeStableE;
    /**
     * 获取【网络请求】的【极验Header】。
     */
    static getRequest_GeeHeader({ geetest_challenge, geetest_validate, geetest_seccode }: SdkVerifyFingerResNS._RawData_SucType, sign: string, geeStatus: GeeStableE): {
        'gt-challenge'?: undefined;
        'gt-validate'?: undefined;
        'gt-seccode'?: undefined;
        'gt-sign'?: undefined;
    } | {
        'gt-challenge': string;
        'gt-validate': string;
        'gt-seccode': string;
        'gt-sign'?: undefined;
    } | {
        'gt-sign': string;
        'gt-challenge'?: undefined;
        'gt-validate'?: undefined;
        'gt-seccode'?: undefined;
    };
}
//# sourceMappingURL=GeeStableUtil.d.ts.map