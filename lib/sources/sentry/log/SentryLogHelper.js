/**
 * Sentry枚举
 */
import { __read, __spread } from "tslib";
import { xX_DebugU, isClient, xX_LogE } from '../../debug-util/debug-util';
export var xX_SentryBreadCateE;
(function (xX_SentryBreadCateE) {
    xX_SentryBreadCateE["auth"] = "auth";
    xX_SentryBreadCateE["axios"] = "axios";
})(xX_SentryBreadCateE || (xX_SentryBreadCateE = {}));
/**
 * Sentry辅助类
 */
var xX_SentryLogHelper = /** @class */ (function () {
    function xX_SentryLogHelper() {
    }
    /**
     * 记录 面包屑/事件痕迹
     *        1.一般要和【主动发送事件】一起使用。
     *                1.不然，只有等到下一次【汇报异常】，才会上传。
     */
    xX_SentryLogHelper.logBreadcrumb = function (category, desc, message, level) {
        if (level === void 0) { level = window.Sentry.Severity.Error; }
        if (isClient) {
            xX_DebugU.l.apply(xX_DebugU, __spread([xX_LogE.sentry, '记录面包屑'], arguments));
            window.Sentry.addBreadcrumb({
                category: category,
                message: [category, desc, message, JSON.stringify({
                        message: message,
                    })].join(" " + xX_DebugU.separator + " "),
                level: level,
            });
        }
    };
    /**
     * 主动发送事件
     */
    xX_SentryLogHelper.sendError = function (category, desc, errMsg) {
        if (isClient) {
            xX_DebugU.l.apply(xX_DebugU, __spread([xX_LogE.sentry, '记录主动发送事件'], arguments));
            window.Sentry.captureException(new Error([category, desc, errMsg].join(" " + xX_DebugU.separator + " ")));
        }
    };
    return xX_SentryLogHelper;
}());
export { xX_SentryLogHelper };
//# sourceMappingURL=SentryLogHelper.js.map