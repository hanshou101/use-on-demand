export declare class EnvFlags {
    /**
     * 本地 Mock Cookie值。
     *        1.便于登录
     */
    static localMockCookie: boolean;
    /**
     * 使用CDN。
     */
    private static firstCheck_useCDN;
    static finalCheck_useCDN: boolean;
    /**
     * K线的 debug模式 。
     */
    static tradingViewDebug: boolean;
    private static _allowEnvs;
}
declare global {
    type EnvFlags_Type = typeof EnvFlags;
}
//# sourceMappingURL=env-flags.d.ts.map