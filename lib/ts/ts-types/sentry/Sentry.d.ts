import {VueConstructor} from 'vue';

interface SentryVue {
  new(option: {
        Vue: VueConstructor;
        attachProps: boolean;             // 意思是？？？？？？？？？？？？？
        logErrors: true;               // TIP 这个标记需要打开，不然开发控制台无法看到  Vue的报错。
      }
  ): SentryVue;
}                           //
type SentryAngular = any;   //
//
interface SentrySeverity_Type {
  Critical: 'critical';
  Debug: 'debug';
  Error: 'error';
  Fatal: 'fatal';
  Info: 'info';
  Log: 'log';
  Warning: 'warning';
}

declare global {

  interface Window {
    Sentry: {
      init(option: {
        dsn: string;
        integrations?: Array<SentryVue | SentryAngular>;
        environment?: string;                                                             // 对记录，区分不同环境
      }): void;                                           //
      addBreadcrumb(option: {
        category: string;
        message: string;
        level: SentrySeverity_Type_Values;
      }): void;                                           //
      captureException(err: Error): void;                     //
      //
      Integrations: {
        Vue: SentryVue;
      };
      //
      Severity: SentrySeverity_Type;
    }
  }                                                                                       //

  type SentrySeverity_Type_Values = SentrySeverity_Type[keyof SentrySeverity_Type];

}
