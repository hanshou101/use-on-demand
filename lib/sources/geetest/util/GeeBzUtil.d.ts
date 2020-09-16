export declare class xX_GeeBzUtil {
    /**
     * 内部SDK调用，唤起一次极验。
     */
    private static __innerSdkInit;
    static beginGee(preInfoApi: () => Promise<BgCoinApi.Bean<GeePreInfo>>, onFingerSuc: (rawVerifyRes: SdkVerifyFingerResNS.RawData, parsedHeader: SdkVerifyFingerResNS.ParsedHeader) => void, // WARN 此处，不采用Promise的原因，是Promise天然适合【立即执行Verify】的逻辑；可能造成误解。
    immediateVerify?: boolean): Promise<NullableType<GeeCtrl>>;
}
//# sourceMappingURL=GeeBzUtil.d.ts.map