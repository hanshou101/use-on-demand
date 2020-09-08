// 对cookie的用法进行封装
import { DebugU, LogE } from '../debug-util/debug-util';
var CookieHelper = /** @class */ (function () {
    function CookieHelper() {
    }
    // 设置cookie
    CookieHelper.setCookie = function (name, value, exdays, path, domain) {
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
        DebugU.l(LogE.cookieUtil, '设置cookie', 'name', name, 'value', value, 'exdays', exdays, 'path', path, 'domain', domain);
    };
    // 获取cookie
    CookieHelper.getCookie = function (name) {
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
    CookieHelper.clearCookie = function (name, domain) {
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
        DebugU.l(LogE.cookieUtil, '清除cookie', 'name', name, 'domain', domain);
    };
    return CookieHelper;
}());
export { CookieHelper };
export function quickSave(key, _value, domain) {
    if (domain === void 0) { domain = location.hostname; }
    var finalV;
    if (_value == undefined && _value == null) {
        finalV = '';
    }
    else {
        finalV = _value;
    }
    CookieHelper.setCookie(key, finalV, 1, // 默认有效期1天。
    '/', domain);
}
export function quickGet(name) {
    return CookieHelper.getCookie(name);
}
//# sourceMappingURL=CookieHelper.js.map