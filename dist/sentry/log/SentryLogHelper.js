/**
 * Sentry枚举
 */
import { DebugU, isClient, LogE } from '../../debug-util/debug-util';
export var SentryBreadCateE;
(function (SentryBreadCateE) {
    SentryBreadCateE["auth"] = "auth";
    SentryBreadCateE["axios"] = "axios";
})(SentryBreadCateE || (SentryBreadCateE = {}));
/**
 * Sentry辅助类
 */
export class SentryLogHelper {
    /**
     * 记录 面包屑/事件痕迹
     *        1.一般要和【主动发送事件】一起使用。
     *                1.不然，只有等到下一次【汇报异常】，才会上传。
     */
    static logBreadcrumb(category, desc, message, level = window.Sentry.Severity.Error) {
        if (isClient) {
            DebugU.l(LogE.sentry, '记录面包屑', ...arguments);
            window.Sentry.addBreadcrumb({
                category,
                message: [category, desc, message, JSON.stringify({
                        message,
                    })].join(` ${DebugU.separator} `),
                level,
            });
        }
    }
    /**
     * 主动发送事件
     */
    static sendError(category, desc, errMsg) {
        if (isClient) {
            DebugU.l(LogE.sentry, '记录主动发送事件', ...arguments);
            window.Sentry.captureException(new Error([category, desc, errMsg].join(` ${DebugU.separator} `)));
        }
    }
}
//# sourceMappingURL=SentryLogHelper.js.map