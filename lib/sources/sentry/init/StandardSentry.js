import { __extends } from "tslib";
import Vue from 'vue';
import { DomScript_Helper } from '../../dom/dom-script';
import { DebugU, LogE } from '../../debug-util/debug-util';
var BaseSentryUtil = /** @class */ (function () {
    function BaseSentryUtil(cfg) {
        this.cfg = cfg;
        // 仅子类可见
        this.crossOrigin = this.cfg.crossOrigin;
        // 仅子类可见
        this.dns = this.cfg.dns;
    }
    return BaseSentryUtil;
}());
var PureJs_SentryUtil = /** @class */ (function (_super) {
    __extends(PureJs_SentryUtil, _super);
    function PureJs_SentryUtil() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pureJsUrl = _this.cfg.pureJsUrl;
        return _this;
    }
    PureJs_SentryUtil.prototype.init = function () {
        var _this = this;
        return DomScript_Helper.loadJsScript_Async(this.pureJsUrl, {
            crossOrigin: this.crossOrigin,
        }).then(function (e) {
            window.Sentry.init({
                dsn: _this.dns,
                environment: _this.cfg.envName,
            });
            return e;
        });
    };
    return PureJs_SentryUtil;
}(BaseSentryUtil));
var Vue_SentryUtil = /** @class */ (function (_super) {
    __extends(Vue_SentryUtil, _super);
    function Vue_SentryUtil() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vueIntegrationUrl = _this.cfg.vueIntegrationUrl;
        return _this;
    }
    Vue_SentryUtil.prototype.init = function () {
        var _this = this;
        return DomScript_Helper.loadJsScript_Async(this.vueIntegrationUrl, {
            crossOrigin: this.crossOrigin,
        }).then(function (e) {
            window.Sentry.init({
                dsn: _this.dns,
                environment: _this.cfg.envName,
                integrations: [
                    new window.Sentry.Integrations.Vue({
                        Vue: Vue,
                        attachProps: true,
                        logErrors: true,
                    }),
                ],
            });
            return e;
        });
    };
    return Vue_SentryUtil;
}(BaseSentryUtil));
export function standardInit(cfg) {
    var PureJsSentry = new PureJs_SentryUtil(cfg);
    var VueSentry = new Vue_SentryUtil(cfg);
    PureJsSentry.init().then(function (pureJsSResult) {
        DebugU.l(LogE.loadScript, 'PureJsSentry', '初始化成功');
        VueSentry.init().then(function (vueSResult) {
            DebugU.l(LogE.loadScript, 'VueSentry', '初始化成功');
        });
    });
}
//# sourceMappingURL=StandardSentry.js.map