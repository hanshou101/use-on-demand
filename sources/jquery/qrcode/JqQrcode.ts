export class JqQrcode_Helper {
  public static drawQrcode(
    $: JQueryStatic,
    qrTxt: string,
    wH: number,
    jDom:JQuery<HTMLElement>,
  ) {
    if (!window.jQuery) {
      window.jQuery = $;
    }
    require('../lib/jquery.qrcode.min.js');          // 手动导库
    //
    // 绘制二维码
    jDom.qrcode?.({width: wH, height: wH, text: qrTxt});
  }
}
