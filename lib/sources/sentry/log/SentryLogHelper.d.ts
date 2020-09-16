/**
 * Sentry枚举
 */
export declare enum xX_SentryBreadCateE {
    'auth' = "auth",
    'axios' = "axios"
}
/**
 * Sentry辅助类
 */
export declare class xX_SentryLogHelper {
    /**
     * 记录 面包屑/事件痕迹
     *        1.一般要和【主动发送事件】一起使用。
     *                1.不然，只有等到下一次【汇报异常】，才会上传。
     */
    static logBreadcrumb(category: xX_SentryBreadCateE, desc: string, message: string, level?: SentrySeverity_Type_Values): void;
    /**
     * 主动发送事件
     */
    static sendError(category: xX_SentryBreadCateE, desc: string, errMsg: string): void;
}
//# sourceMappingURL=SentryLogHelper.d.ts.map