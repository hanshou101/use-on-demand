export declare class CheckAddressNew_Util {
    private updateTime;
    private readonly aliveDuration;
    constructor(updateTime?: number);
    checkOrRefresh(refreshFn: Promise<any>): Promise<any>;
}
export declare class DownloadAppUtil {
    /**
     *
     */
    static autoDownload(option: {
        androidUrl: string;
        iosUrl: string;
    }): void;
    /**
     *
     */
    static downloadAndroid(androidUrl: string): void;
    /**
     *
     */
    static downloadIOS(iosUrl: string, autoJoinProtocol?: boolean, // 是否自动拼接，【itms-services】协议头。默认为是。
    callback?: Function): void;
}
//# sourceMappingURL=DownloadAppUtil.d.ts.map