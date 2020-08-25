import Vue from 'vue';
import { DomScript_Helper } from '../../dom/dom-script';
import { DebugU, LogE } from '../../debug-util/debug-util';
class BaseSentryUtil {
    constructor(cfg) {
        this.cfg = cfg;
        // 仅子类可见
        this.crossOrigin = this.cfg.crossOrigin;
        // 仅子类可见
        this.dns = this.cfg.dns;
    }
}
class PureJs_SentryUtil extends BaseSentryUtil {
    constructor() {
        super(...arguments);
        this.pureJsUrl = this.cfg.pureJsUrl;
    }
    init() {
        return DomScript_Helper.loadJsScript_Async(this.pureJsUrl, {
            crossOrigin: this.crossOrigin,
        }).then((e) => {
            window.Sentry.init({
                dsn: this.dns,
                environment: this.cfg.envName,
            });
            return e;
        });
    }
}
class Vue_SentryUtil extends BaseSentryUtil {
    constructor() {
        super(...arguments);
        this.vueIntegrationUrl = this.cfg.vueIntegrationUrl;
    }
    init() {
        return DomScript_Helper.loadJsScript_Async(this.vueIntegrationUrl, {
            crossOrigin: this.crossOrigin,
        }).then((e) => {
            window.Sentry.init({
                dsn: this.dns,
                environment: this.cfg.envName,
                integrations: [
                    new window.Sentry.Integrations.Vue({
                        Vue,
                        attachProps: true,
                        logErrors: true,
                    }),
                ],
            });
            return e;
        });
    }
}
export function standardInit(cfg) {
    const PureJsSentry = new PureJs_SentryUtil(cfg);
    const VueSentry = new Vue_SentryUtil(cfg);
    PureJsSentry.init().then((pureJsSResult) => {
        DebugU.l(LogE.loadScript, 'PureJsSentry', '初始化成功');
        VueSentry.init().then((vueSResult) => {
            DebugU.l(LogE.loadScript, 'VueSentry', '初始化成功');
        });
    });
}
//# sourceMappingURL=StandardSentry.js.map