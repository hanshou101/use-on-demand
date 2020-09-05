export class FullScreen_Helper {
    /**
     * 进入全屏
     */
    fullScreen(el = document.documentElement) {
        // 进入全屏
        const rfs = el.requestFullscreen || el.webkitRequestFullScreen
            || el.mozRequestFullScreen || el.msRequestFullscreen;
        // typeof rfs != "undefined" && rfs
        if (rfs) {
            rfs.call(el);
        }
        else if (typeof window.ActiveXObject !== 'undefined') {
            // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
            const wscript = new ActiveXObject('WScript.Shell');
            if (wscript != null) {
                wscript.SendKeys('{F11}');
            }
        }
    }
    /**
     * 退出全屏
     */
    exitScreen() {
        const doc = document; // WARN 该参数，必须是 Document 。
        // 取消全屏
        const cfs = doc.exitFullscreen || doc.msExitFullscreen
            || doc.mozCancelFullScreen
            || doc.webkitExitFullscreen || doc.webkitCancelFullScreen
            || doc.cancelFullScreen;
        // typeof cfs != "undefined" && cfs
        if (cfs) {
            cfs.call(doc);
        }
        else if (typeof window.ActiveXObject !== 'undefined') {
            // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
            const wscript = new ActiveXObject('WScript.Shell');
            if (wscript != null) {
                wscript.SendKeys('{F11}');
            }
        }
    }
    /**
     * 获取【全屏事件】监听的【更强工具类】。
     */
    get_ChangeEvtListen_Util() {
        return new WatchFullScreenUtil();
    }
}
class WatchFullScreenUtil {
    constructor() {
        /**
         * 兼容更多事件类型。
         *        1.参考资料：MDN。
         */
        this.evtNames = [
            'fullscreenchange',
            'fullscreenerror',
        ];
    }
    bindEvent(_fn) {
        // if (isClient) {
        this.cb = _fn;
        this.evtNames.forEach((evtName) => {
            window.addEventListener(evtName, _fn);
        });
        // }
    }
    removeEvent() {
        // if (isClient) {
        const _fn = this.cb;
        if (_fn) {
            this.evtNames.forEach((evtName) => {
                window.removeEventListener(evtName, _fn);
            });
        }
        else {
            console.error('removeEvent', 'this.cb并不存在！！！');
        }
        // }
    }
}
//# sourceMappingURL=FullScreen_Helper.js.map