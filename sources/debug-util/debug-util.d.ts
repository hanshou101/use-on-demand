export declare const isClient: boolean;
export declare enum LogE {
    bgTokenAbout = "bgTokenAbout",
    KlinePerformance = "KlinePerformance",
    KlineCycleLife = "KlineCycleLife",
    tradingViewDraw = "tradingViewDraw",
    indexPage = "indexPage",
    baseConfig = "baseConfig",
    axiosBase = "axiosBase",
    storeBase = "storeBase",
    axiosWatcher = "axiosWatcher",
    qrcodeCp = "qrcodeCp",
    cookieUtil = "cookieUtil",
    pluginBxUi = "pluginBxUi",
    wasm = "wasm",
    BgNavHeader = "BgNavHeader",
    createContractAccount = "createContractAccount",
    positLine = "positLine",
    positCp = "positCp",
    leverageInfo = "leverageInfo",
    chatroom = "chatroom",
    directive = "directive",
    directiveDrag = "directiveDrag",
    contractArea = "contractArea",
    transferWindow = "transferWindow",
    loadScript = "loadScript",
    sentry = "sentry"
}
/**
 * console日志工具
 */
export declare class DebugU {
    static separator: string;
    private static readonly allowKeys;
    static l(logEnum: LogE, ...args: Array<any>): void;
    static e(logEnum: LogE, ...args: Array<any>): void;
    static pic(logEnum: LogE, imgUrl?: string): void;
    realLog(message?: any, ...optionalParams: Array<any>): void;
}
//# sourceMappingURL=debug-util.d.ts.map