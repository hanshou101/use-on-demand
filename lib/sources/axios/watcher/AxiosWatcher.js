/**
 * 对Axios的接口状态、网络状态，进行监听
 *                1.url、baseUrl、
 *                2.method方法判断
 *                3.
 *
 */
import { DebugU, LogE } from '../../debug-util/debug-util';
/**
 * 其实，更好的方法是：
 *                1.修改Axios的传参参数，强制传一个【字符串】过来？
 */
var isClient = process.client;
var AxiosWatcher = /** @class */ (function () {
    function AxiosWatcher() {
    }
    AxiosWatcher.saveReqInfo_onClient = function (config) {
        var _a;
        var _b;
        if (isClient) {
            var bzId = (_b = config.bzInfo) === null || _b === void 0 ? void 0 : _b.bzId;
            var accessor = window.$nuxt.$accessor;
            var map = accessor.dic.axiosWatcherMap;
            if (bzId) { // 当传了bzId时
                if (!map[bzId]) {
                    map[bzId] = {}; // 初始化
                }
                accessor.dic.SET_AXIOS_WATCHER_MAP((_a = {},
                    _a[bzId] = { requesting: true },
                    _a)); // TIP 正确解法
                // map[bzId].requesting = true;    // WARN 有可能，watch/deep无法监听到。
                // window.$nuxt.$set(map[bzId], 'requesting', true);
                DebugU.l(LogE.axiosWatcher, 'bzId', bzId, '正在请求中', JSON.stringify(map));
            }
        }
    };
    AxiosWatcher.saveRespInfo_onClient = function (res) {
        var _a;
        var _b;
        if (isClient) {
            var bzId = (_b = res.config.bzInfo) === null || _b === void 0 ? void 0 : _b.bzId;
            var accessor = window.$nuxt.$accessor;
            var map = accessor.dic.axiosWatcherMap;
            if (bzId) { // 当传了bzId时
                accessor.dic.SET_AXIOS_WATCHER_MAP((_a = {},
                    _a[bzId] = { requesting: false },
                    _a)); // TIP 正确解法
                // map[bzId].requesting = false;   // WARN 有可能，watch/deep无法监听到。
                DebugU.l(LogE.axiosWatcher, 'bzId', bzId, '正在返回中', JSON.stringify(map));
            }
        }
    };
    return AxiosWatcher;
}());
export { AxiosWatcher };
//# sourceMappingURL=AxiosWatcher.js.map