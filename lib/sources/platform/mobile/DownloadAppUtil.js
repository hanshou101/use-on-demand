import { __awaiter, __generator } from "tslib";
import { xX_MyBrowser } from '../ua/MobileUA';
var xX_CheckAddressNew_Util = /** @class */ (function () {
    function xX_CheckAddressNew_Util(updateTime) {
        if (updateTime === void 0) { updateTime = new Date().valueOf(); }
        this.updateTime = updateTime;
        this.aliveDuration = 1 * 1000; // 一分钟
    }
    xX_CheckAddressNew_Util.prototype.checkOrRefresh = function (refreshFn) {
        return __awaiter(this, void 0, void 0, function () {
            var goTime, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('进行检验');
                        goTime = new Date().valueOf() - this.updateTime;
                        if (!(goTime > this.aliveDuration)) return [3 /*break*/, 2];
                        return [4 /*yield*/, refreshFn];
                    case 1:
                        res = _a.sent();
                        this.updateTime = new Date().valueOf();
                        return [2 /*return*/, res];
                    case 2: // 如果未超时
                    return [2 /*return*/, Promise.resolve('ok')];
                }
            });
        });
    };
    return xX_CheckAddressNew_Util;
}());
export { xX_CheckAddressNew_Util };
var xX_DownloadAppUtil = /** @class */ (function () {
    function xX_DownloadAppUtil() {
    }
    //
    //
    //
    /**
     *
     */
    xX_DownloadAppUtil.autoDownload = function (option) {
        console.log('手机用户代理', xX_MyBrowser.versions);
        // var text = "";
        if (xX_MyBrowser.superIOSCheck) {
            // alert('您的手机被识别为iphone')
            // text                 = text + "iOS";
            this.downloadIOS(option.iosUrl);
        }
        else if (xX_MyBrowser.versions.android) {
            // alert('您的手机被识别为Android')
            // text = text + "android";
            this.downloadAndroid(option.androidUrl);
            // if (xX_MyBrowser.versions.weixin) {
            //   $('.tips').css('display', 'block');
            // } else {
            //   window.location.href = androidUrl;
            // }
        }
        else {
            // alert('您的设备被识别为pc')
            // if (confirm('确定要在PC端进行下载吗？')) {
            // }
            // text = text + "PC";
            // TODO 无法正确识别的特殊机型，都下载  安卓端的APK
            this.downloadAndroid(option.androidUrl);
        }
        // if (browser.versions.weixin) {
        //     text = text + "微信打开";
        // } else {
        //     text = text + "浏览器打开";
        // }
        // alert(text);
    };
    /**
     *
     */
    xX_DownloadAppUtil.downloadAndroid = function (androidUrl) {
        // TIP 安卓配置
        if (androidUrl) {
            // const androidUrl = 'http://017.im/data/User/wq/home/desktop/install/wp.apk';
            var androidPath = androidUrl;
            window.location.href = androidPath;
        }
        else {
            alert('未获取到Android下载地址！');
        }
    };
    /**
     *
     */
    xX_DownloadAppUtil.downloadIOS = function (iosUrl, autoJoinProtocol, // 是否自动拼接，【itms-services】协议头。默认为是。
    callback) {
        if (autoJoinProtocol === void 0) { autoJoinProtocol = true; }
        // TIP iOS配置
        if (iosUrl) {
            var jumpPath = void 0;
            if (iosUrl.includes('testflight')) { // testflight模式
                jumpPath = iosUrl; // 直接跳转
            }
            else { // itms协议模式
                var ios_conf = {
                    schema: 'itms-services',
                    action: 'download-manifest',
                    // url: 'https://017.im/data/User/wq/home/desktop/install/ipa.plist',
                    url: iosUrl,
                };
                jumpPath = iosUrl;
                // 如果，需要自动拼接协议头。
                if (autoJoinProtocol) {
                    if (!(/^(itms-services)/.test(iosUrl))) {
                        jumpPath = ios_conf.schema + "://?action=" + ios_conf.action + "&url=" + ios_conf.url;
                    }
                }
            }
            window.location.href = jumpPath;
            if (typeof callback === 'function') {
                callback();
            }
        }
        else {
            alert('未获取到iOS下载地址！');
        }
    };
    return xX_DownloadAppUtil;
}());
export { xX_DownloadAppUtil };
//# sourceMappingURL=DownloadAppUtil.js.map