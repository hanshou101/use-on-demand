/**
 * 判断是否微信登陆
 *            参考资料：http://caibaojian.com/browser-ios-or-android.html
 */

// var browser = {
export class xX_MyBrowser {
  public static versions = function () {
    const u   = navigator.userAgent;
    const app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1,                          // IE内核
      presto : u.indexOf('Presto') > -1,                            // opera内核
      webKit : u.indexOf('AppleWebKit') > -1,                       // 苹果、谷歌内核
      gecko  : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  // 火狐内核
      mobile : !!u.match(/AppleWebKit.*Mobile.*/),                  // 是否为移动终端
      ios    : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),             // 是否ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // 是否android终端
      iPhone : u.indexOf('iPhone') > -1,                           // 是否为iPhone或者QQHD浏览器
      iPad   : u.indexOf('iPad') > -1,                                // 是否iPad
      safari : u.indexOf('Safari') == -1,                           // 是否web应该程序，没有头部与底部
      weixin : u.indexOf('MicroMessenger') > -1,                    // 是否微信
      qq     : String(u.match(/\sqq/i)) == ' qq', // 是否QQ（QQ内置浏览器，空格加qq）
    };
  }();

  public static language = function () {
    return (navigator.browserLanguage || navigator.language).toLowerCase();
  }();

  // TIP 处理，市面上最广泛的iOS设备（满足ios、iPhone或iPad 的设备）
  public static superIOSCheck = function () {
    /**
     * 此处，不要添加【Safari】的UA。
     * 原因是：
     *        1.MacOS电脑上，安装【苹果APP】无用，给出一个【安卓APP】的下载地址，更好。
     */
    return xX_MyBrowser.versions.ios || xX_MyBrowser.versions.iPhone || xX_MyBrowser.versions.iPad;
  }();

  // // TIP 处理，市面上最广泛的Android设备（满足android；以及各种杂乱无章安卓UA————非superIOS的都视为安卓设备）
  // public static superAndroidCheck = function () {
  //
  // }();

}
