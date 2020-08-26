declare interface Window {
  jQuery?: JQueryStatic;
}

// 经过插件增强的Jquery
declare interface JQuery {
  // 【i18next】插件
  localize?(): void;

  // 【qrcode】插件
  qrcode?(text: string): void;        //
  qrcode?(cfg: {
    width: number;
    height: number;
    text: string;
  }): void;                           //
}
