/**
 * 判断是否微信登陆
 *            参考资料：http://caibaojian.com/browser-ios-or-android.html
 */
// var browser = {
export class MyBrowser {
}
MyBrowser.versions = function () {
    const u = navigator.userAgent;
    const app = navigator.appVersion;
    return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        safari: u.indexOf('Safari') == -1,
        weixin: u.indexOf('MicroMessenger') > -1,
        qq: String(u.match(/\sqq/i)) == ' qq',
    };
}();
MyBrowser.language = function () {
    return (navigator.browserLanguage || navigator.language).toLowerCase();
}();
// TIP 处理，市面上最广泛的iOS设备（满足ios、iPhone或iPad 的设备）
MyBrowser.superIOSCheck = function () {
    /**
     * 此处，不要添加【Safari】的UA。
     * 原因是：
     *        1.MacOS电脑上，安装【苹果APP】无用，给出一个【安卓APP】的下载地址，更好。
     */
    return MyBrowser.versions.ios || MyBrowser.versions.iPhone || MyBrowser.versions.iPad;
}();
//# sourceMappingURL=MobileUA.js.map