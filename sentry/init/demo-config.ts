export const Sentry_Cfg = {
  crossOrigin      : 'anonymous',
  dns              : 'https://cc5039e47b3945e7bdfd1bce6a502db5@sentry.bgex.info/3',
  pureJsUrl        : 'https://browser.sentry-cdn.com/5.5.0/bundle.min.js',
  vueIntegrationUrl: 'https://browser.sentry-cdn.com/5.5.0/vue.min.js',
  envName          : 'gpay-mobile-regist',
};


declare global {
  // interface Window {
  //   Sentry_Cfg: typeof Sentry_Cfg;
  // }
  type Sentry_Cfg_Type = typeof Sentry_Cfg;
}

// window.Sentry_Cfg = Sentry_Cfg;
