// 对cookie的用法进行封装
import { xX_DebugU, xX_LogE } from '../debug-util/debug-util';
var xX_CookieHelper = /** @class */ (function () {
    function xX_CookieHelper() {
    }
    // 设置cookie
    xX_CookieHelper.setCookie = function (name, value, exdays, path, domain) {
        var stExdays = '';
        var stDomain = '';
        if (exdays) {
            var date = new Date();
            date.setTime(date.getTime() + (parseInt(exdays) * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000));
            stExdays = ';expires=' + date.toUTCString();
        }
        if (domain) {
            stDomain = ';domain=' + domain;
        }
        window.document.cookie = name + '=' + value + stExdays + ';path=' + path + stDomain;
        xX_DebugU.l(xX_LogE.cookieUtil, '设置cookie', 'name', name, 'value', value, 'exdays', exdays, 'path', path, 'domain', domain);
    };
    // 获取cookie
    xX_CookieHelper.getCookie = function (name) {
        var cookieName = name + '=';
        var arr = document.cookie.split(';');
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            while (item.charAt(0) === ' ') {
                item = item.substring(1);
            }
            if (!item.indexOf(cookieName)) {
                return item.substring(cookieName.length, item.length);
            }
        }
        return '';
    };
    // 清除cookie
    xX_CookieHelper.clearCookie = function (name, domain) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        var cookieValue = this.getCookie(name);
        var stDomain = '';
        if (domain) {
            stDomain = ';domain=' + domain;
        }
        if (cookieValue !== null) {
            document.cookie = name + '=' + ' ' + ';expires=' + date.toUTCString() + ';path=/' + stDomain;
        }
        else {
            alert(name + '的值为空！');
        }
        xX_DebugU.l(xX_LogE.cookieUtil, '清除cookie', 'name', name, 'domain', domain);
    };
    return xX_CookieHelper;
}());
export { xX_CookieHelper };
export function xX_quickSave(key, _value, domain) {
    if (domain === void 0) { domain = location.hostname; }
    var finalV;
    if (_value == undefined && _value == null) {
        finalV = '';
    }
    else {
        finalV = _value;
    }
    xX_CookieHelper.setCookie(key, finalV, 1, // 默认有效期1天。
    '/', domain);
}
export function xX_quickGet(name) {
    return xX_CookieHelper.getCookie(name);
}
//# sourceMappingURL=CookieHelper.js.map