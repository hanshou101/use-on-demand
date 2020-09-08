/**
 * Sentry枚举
 */
import { __read, __spread } from "tslib";
import { DebugU, isClient, LogE } from '../../debug-util/debug-util';
export var SentryBreadCateE;
(function (SentryBreadCateE) {
    SentryBreadCateE["auth"] = "auth";
    SentryBreadCateE["axios"] = "axios";
})(SentryBreadCateE || (SentryBreadCateE = {}));
/**
 * Sentry辅助类
 */
var SentryLogHelper = /** @class */ (function () {
    function SentryLogHelper() {
    }
    /**
     * 记录 面包屑/事件痕迹
     *        1.一般要和【主动发送事件】一起使用。
     *                1.不然，只有等到下一次【汇报异常】，才会上传。
     */
    SentryLogHelper.logBreadcrumb = function (category, desc, message, level) {
        if (level === void 0) { level = window.Sentry.Severity.Error; }
        if (isClient) {
            DebugU.l.apply(DebugU, __spread([LogE.sentry, '记录面包屑'], arguments));
            window.Sentry.addBreadcrumb({
                category: category,
                message: [category, desc, message, JSON.stringify({
                        message: message,
                    })].join(" " + DebugU.separator + " "),
                level: level,
            });
        }
    };
    /**
     * 主动发送事件
     */
    SentryLogHelper.sendError = function (category, desc, errMsg) {
        if (isClient) {
            DebugU.l.apply(DebugU, __spread([LogE.sentry, '记录主动发送事件'], arguments));
            window.Sentry.captureException(new Error([category, desc, errMsg].join(" " + DebugU.separator + " ")));
        }
    };
    return SentryLogHelper;
}());
export { SentryLogHelper };
//# sourceMappingURL=SentryLogHelper.js.map