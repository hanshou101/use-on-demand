export declare const cfg: {
    /**
     * 挂载端口
     */
    readonly port: {
        http: number;
        https: number;
    };
    /**
     * Https证书
     *        1. 2020.01.19获得
     */
    readonly cert: {
        privateKey: string;
        certificate: string;
    };
    /**
     * 视图
     */
    readonly view: {
        viewsPath: string;
        viewsEngine: "jade";
        staticPaths: string[];
        assetsPaths: string[];
    };
    /**
     * 路由表
     */
    readonly route: {
        map: {
            baseUrl: string;
            router: import("express-serve-static-core").Router;
        }[];
    };
};
//# sourceMappingURL=config.d.ts.map