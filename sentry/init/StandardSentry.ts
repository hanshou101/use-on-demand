import {ChatRoomList_Util} from '~/assets/js/ChatRoomList_Util';
import Vue                 from 'vue';
import {DebugU, LogE}      from '~/assets/js/debug-util';

abstract class BaseSentryUtil {
  constructor(public cfg: Sentry_Cfg_Type) {
  }

  // 仅子类可见
  protected readonly crossOrigin = this.cfg.crossOrigin;
  // 仅子类可见
  protected readonly dns         = this.cfg.dns;

  abstract init(): Promise<Event>;
}

class PureJs_SentryUtil extends BaseSentryUtil {
  private readonly pureJsUrl = this.cfg.pureJsUrl;

  init(): Promise<Event> {
    return ChatRoomList_Util.loadJsScript_Async(
      this.pureJsUrl, {
        crossOrigin: this.crossOrigin,
      }
    ).then(e => {
      window.Sentry.init({
        dsn        : this.dns,
        environment: this.cfg.envName,
      });
      return e;
    });
  }
}

class Vue_SentryUtil extends BaseSentryUtil {
  private readonly vueIntegrationUrl = this.cfg.vueIntegrationUrl;

  init(): Promise<Event> {
    return ChatRoomList_Util.loadJsScript_Async(
      this.vueIntegrationUrl, {
        crossOrigin: this.crossOrigin,
      }
    ).then(e => {
      window.Sentry.init({
        dsn         : this.dns,
        environment : this.cfg.envName,
        integrations: [
          new window.Sentry.Integrations.Vue({
            Vue,
            attachProps: true,
            logErrors  : true,
          })
        ],
      });
      return e;
    });
  }
}

export function standardInit(cfg: Sentry_Cfg_Type) {
  const PureJsSentry = new PureJs_SentryUtil(cfg);
  const VueSentry    = new Vue_SentryUtil(cfg);
  PureJsSentry.init().then(pureJsSResult => {
    DebugU.l(LogE.loadScript, 'PureJsSentry', '初始化成功');
    VueSentry.init().then(vueSResult => {
      DebugU.l(LogE.loadScript, 'VueSentry', '初始化成功');
    });
  });
}
