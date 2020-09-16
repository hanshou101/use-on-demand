export declare class xX_VersionUpdate_Helper {
    private static vFileName;
    private static lastCheckTs;
    private static checkIntervalTs;
    private static getCheckUrl;
    /**
     * 在打包时，设置【版本号】。
     * 				1.建议，无论是【开发环境】还是【打包环境】，都执行【设置版本号】操作。
     */
    static setVersion_onBuild: VueCliService_ProjectOptions_Type['configureWebpack'];
    /**
     * 在路由跳转中，检查【版本更新】。
     */
    static checkVersion(): void;
}
//# sourceMappingURL=VersionUpdate_Helper.d.ts.map