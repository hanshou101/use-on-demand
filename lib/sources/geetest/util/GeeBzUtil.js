import { __awaiter, __generator } from "tslib";
import { xX_GeeStableE, xX_GeeStableUtil } from './GeeStableUtil';
var gtInit = require('./_util/geetest/geetest.gt.js').gtInit; // 在使用工具时，引用该【lib文件】。
var LangMapE;
(function (LangMapE) {
    LangMapE["zh-CN"] = "zh";
    LangMapE["zh-HK"] = "zh-tw";
    LangMapE["en-US"] = "en";
})(LangMapE || (LangMapE = {})); //
var lang = LangMapE['zh-HK'];
var xX_GeeBzUtil = /** @class */ (function () {
    function xX_GeeBzUtil() {
    }
    /**
     * 内部SDK调用，唤起一次极验。
     */
    xX_GeeBzUtil.__innerSdkInit = function (data, toListen_GeeCtrlCbs) {
        return new Promise(function (resolve, reject) {
            window.initGeetest({
                gt: data.gt,
                challenge: data.challenge || '',
                offline: !data.success,
                new_captcha: true,
                //
                product: 'bind',
                width: '100%',
                lang: lang,
            }, function (geeCtrl) {
                geeCtrl.onReady(function () {
                    toListen_GeeCtrlCbs.onReadySuc(geeCtrl);
                });
                geeCtrl.onSuccess(function () {
                    toListen_GeeCtrlCbs.onFingerSuc(geeCtrl);
                });
                geeCtrl.onError(function () {
                    toListen_GeeCtrlCbs.onReadyFailure(geeCtrl);
                });
                resolve(geeCtrl);
            });
        });
    };
    xX_GeeBzUtil.beginGee = function (preInfoApi, onFingerSuc, // WARN 此处，不采用Promise的原因，是Promise天然适合【立即执行Verify】的逻辑；可能造成误解。
    immediateVerify) {
        var _this = this;
        if (immediateVerify === void 0) { immediateVerify = true; }
        return new Promise(function (resolve, reject /*WARN 用不到*/) { return __awaiter(_this, void 0, void 0, function () {
            var data, enable, success, sign, stableE, _a, geeCtrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, preInfoApi()];
                    case 1:
                        data = (_b.sent()).data;
                        enable = data.enable, success = data.success, sign = data.sign;
                        stableE = xX_GeeStableUtil.calcCurrent_GeeStable(enable, success);
                        _a = stableE;
                        switch (_a) {
                            case xX_GeeStableE.NoGeetest_false_0: return [3 /*break*/, 2];
                            case xX_GeeStableE.NoGeetest_false_1: return [3 /*break*/, 2];
                            case xX_GeeStableE.ErrorGeetest__true_0: return [3 /*break*/, 3];
                            case xX_GeeStableE.SuccessGeetest_true_1: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        {
                            console.error('并非 后台开启且第三方正常 的情况，所以不初始化极验；仅仅返回【模拟数据】');
                            onFingerSuc({}, {});
                            resolve(null); // 没有控制器可返回。
                            return [3 /*break*/, 6];
                        }
                        _b.label = 3;
                    case 3:
                        {
                            onFingerSuc({
                                sign: sign,
                            }, {
                                'gt-sign': sign,
                            });
                            resolve(null); // 没有控制器可返回。
                            return [3 /*break*/, 6];
                        }
                        _b.label = 4;
                    case 4:
                        console.log('后台开启且第三方政策，所以，初始化极验');
                        return [4 /*yield*/, xX_GeeBzUtil.__innerSdkInit(data, {
                                onReadySuc: function (_geeCtrl) {
                                    console.log('极验SDK内部初始化', '已准备好', _geeCtrl);
                                    //
                                    if (immediateVerify) {
                                        console.log('立即执行Verify');
                                        _geeCtrl.verify();
                                    }
                                    else {
                                        console.log('等待手动调用Verify');
                                    }
                                },
                                onFingerSuc: function (_geeCtrl) {
                                    var _a = _geeCtrl.getValidate(), geetest_challenge = _a.geetest_challenge, geetest_validate = _a.geetest_validate, geetest_seccode = _a.geetest_seccode;
                                    onFingerSuc({
                                        geetest_challenge: geetest_challenge,
                                        geetest_validate: geetest_validate,
                                        geetest_seccode: geetest_seccode,
                                    }, {
                                        'gt-challenge': geetest_challenge,
                                        'gt-validate': geetest_validate,
                                        'gt-seccode': geetest_seccode,
                                    });
                                },
                                onReadyFailure: function (_geeCtrl) {
                                    console.error('极验SDK内部初始化，出错了');
                                },
                            })];
                    case 5:
                        geeCtrl = _b.sent();
                        console.log('这一步，还需要Verify方法，才会弹出【用户界面】');
                        resolve(geeCtrl);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    return xX_GeeBzUtil;
}());
export { xX_GeeBzUtil };
//# sourceMappingURL=GeeBzUtil.js.map