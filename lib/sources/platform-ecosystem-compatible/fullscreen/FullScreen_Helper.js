var xX_FullScreen_Helper = /** @class */ (function () {
    function xX_FullScreen_Helper() {
    }
    /**
     * 进入全屏
     */
    xX_FullScreen_Helper.prototype.fullScreen = function (el) {
        if (el === void 0) { el = document.documentElement; }
        // 进入全屏
        var rfs = el.requestFullscreen || el.webkitRequestFullScreen
            || el.mozRequestFullScreen || el.msRequestFullscreen;
        // typeof rfs != "undefined" && rfs
        if (rfs) {
            rfs.call(el);
        }
        else if (typeof window.ActiveXObject !== 'undefined') {
            // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
            var wscript = new ActiveXObject('WScript.Shell');
            if (wscript != null) {
                wscript.SendKeys('{F11}');
            }
        }
    };
    /**
     * 退出全屏
     */
    xX_FullScreen_Helper.prototype.exitScreen = function () {
        var doc = document; // WARN 该参数，必须是 Document 。
        // 取消全屏
        var cfs = doc.exitFullscreen || doc.msExitFullscreen
            || doc.mozCancelFullScreen
            || doc.webkitExitFullscreen || doc.webkitCancelFullScreen
            || doc.cancelFullScreen;
        // typeof cfs != "undefined" && cfs
        if (cfs) {
            cfs.call(doc);
        }
        else if (typeof window.ActiveXObject !== 'undefined') {
            // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
            var wscript = new ActiveXObject('WScript.Shell');
            if (wscript != null) {
                wscript.SendKeys('{F11}');
            }
        }
    };
    /**
     * 获取【全屏事件】监听的【更强工具类】。
     */
    xX_FullScreen_Helper.prototype.get_ChangeEvtListen_Util = function () {
        return new WatchFullScreenUtil();
    };
    return xX_FullScreen_Helper;
}());
export { xX_FullScreen_Helper };
var WatchFullScreenUtil = /** @class */ (function () {
    function WatchFullScreenUtil() {
        /**
         * 兼容更多事件类型。
         *        1.参考资料：MDN。
         */
        this.evtNames = [
            'fullscreenchange',
            'fullscreenerror',
        ];
    }
    WatchFullScreenUtil.prototype.bindEvent = function (_fn) {
        // if (isClient) {
        this.cb = _fn;
        this.evtNames.forEach(function (evtName) {
            window.addEventListener(evtName, _fn);
        });
        // }
    };
    WatchFullScreenUtil.prototype.removeEvent = function () {
        // if (isClient) {
        var _fn = this.cb;
        if (_fn) {
            this.evtNames.forEach(function (evtName) {
                window.removeEventListener(evtName, _fn);
            });
        }
        else {
            console.error('removeEvent', 'this.cb并不存在！！！');
        }
        // }
    };
    return WatchFullScreenUtil;
}());
//# sourceMappingURL=FullScreen_Helper.js.map