/**
 * 加速开关
 *        1.以下各项，true为开启优化，false为关闭优化。
 */
export declare class SpeedUpFlags {
    /**
     * 是否使用【ForkTsCheckerNotifierWebpackPlugin】，进行异步【类型检查】
     *        1.WHY 存疑，nuxt.js的【TS套件】，自身有没有内置【ForkTsCheckerNotifierWebpackPlugin】？？？
     *        2.
     */
    static readonly asyncTypeCheck = false;
    /**
     * 是否【禁止TS脚本中，出现JS脚本】
     *        1.在【长时间编译】中，可以减少【7秒】左右的编译时间。
     *                1.在有【3个js脚本】的前提下，进行的测试。
     */
    static readonly notAllow_JsInTs = false;
}
export declare class TypeScript_SpeedUp_Helper {
    /**
     * 【tsconfig.json】
     *        TypeScript加速。
     *                1.其实，这一块的主要工作 是在【ts-loader】 里面做的。
     */
    static readonly tsConfig_JSON: {
        /**
         * 为【fork-ts-checker-webpack-plugin】插件，修复一个issue
         *        0.参考资料：
         *                1.https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#installation
         *        1.场景：
         *                1.当遇到【ts变动，但不会产生js】的场合（如 interface、type 变动），此时 默认情况下 不会触发【本插件的检查】。
         *                        0.参考资料：https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#type-only-modules-watching
         *        2.修复方案：
         *                1.加入该【配置项】。
         */
        _importsNotUsedAsValues: string;
        /**
         * 见flag注释
         */
        _allowJs: boolean;
    };
    /**
     * 【nuxt.config.js】
     *        优化TypeScript的编译速度。
     *
     */
    static readonly nuxtConfig_JS: {
        /**
         * 【typeCheck】
         *        1.FIXME 这个值，似乎并不在【loaders选项】里面，而是和【loaders选项】同级？？？
         *
         * 【transpileOnly】
         *        1.缺省默认false。
         *        2.设置为true，可以加速TS的编译速度。
         */
        _buildModules: {
            _typeCheck: boolean;
            _loadersCfg: {
                transpileOnly: boolean;
            };
        };
        get_SpeedUp_TypeCheck_Plugins(): any[];
    };
}
/**
 *
 */
export declare class CDN_Helper {
    /**
     * 末尾，要记得保留【"/"】。
     */
    static readonly c_baseUrl: string;
    private static readonly d_publicPath;
    private static linkTowSplashPart;
    /**
     * 【assets目录】
     * 条件：
     *    1.客户端 + 需要CDN环境
     */
    static readonly _build_publicPath: string;
    /**
     * 【static目录】
     *        1.传入path，必须以【"/"】开头。
     */
    static getStaticDir_CDN_Path(localPath: string, // 必须以【"/"】开头
    canUseCDN?: boolean): string;
    test____getStaticDir_CDN_Path(): void;
}
declare global {
    type TypeScript_SpeedUp_Helper____Type = typeof TypeScript_SpeedUp_Helper;
    type SpeedUpFlags_Type = typeof SpeedUpFlags;
    type CDN_Helper_Type = typeof CDN_Helper;
}
//# sourceMappingURL=gen-helper.d.ts.map