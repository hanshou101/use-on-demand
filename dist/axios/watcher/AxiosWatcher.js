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
const isClient = process.client;
export class AxiosWatcher {
    static saveReqInfo_onClient(config) {
        var _a;
        if (isClient) {
            const bzId = (_a = config.bzInfo) === null || _a === void 0 ? void 0 : _a.bzId;
            const accessor = window.$nuxt.$accessor;
            const map = accessor.dic.axiosWatcherMap;
            if (bzId) { // 当传了bzId时
                if (!map[bzId]) {
                    map[bzId] = {}; // 初始化
                }
                accessor.dic.SET_AXIOS_WATCHER_MAP({
                    [bzId]: { requesting: true },
                }); // TIP 正确解法
                // map[bzId].requesting = true;    // WARN 有可能，watch/deep无法监听到。
                // window.$nuxt.$set(map[bzId], 'requesting', true);
                DebugU.l(LogE.axiosWatcher, 'bzId', bzId, '正在请求中', JSON.stringify(map));
            }
        }
    }
    static saveRespInfo_onClient(res) {
        var _a;
        if (isClient) {
            const bzId = (_a = res.config.bzInfo) === null || _a === void 0 ? void 0 : _a.bzId;
            const accessor = window.$nuxt.$accessor;
            const map = accessor.dic.axiosWatcherMap;
            if (bzId) { // 当传了bzId时
                accessor.dic.SET_AXIOS_WATCHER_MAP({
                    [bzId]: { requesting: false },
                }); // TIP 正确解法
                // map[bzId].requesting = false;   // WARN 有可能，watch/deep无法监听到。
                DebugU.l(LogE.axiosWatcher, 'bzId', bzId, '正在返回中', JSON.stringify(map));
            }
        }
    }
}
//# sourceMappingURL=AxiosWatcher.js.map