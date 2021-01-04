declare class ExpressBase_Helper {
    expressBase: import("express-serve-static-core").Express;
    constructor(expressBase?: import("express-serve-static-core").Express);
    initAll(): void;
    /**
     * 初始化View层模板引擎
     */
    $0_initView(): void;
    /**
     * 初始化 内部Assets、外部public。
     */
    $1_initAssets_andPublic(): void;
    $2_redirectHttps(): void;
    /**
     * 路由批量设置
     */
    $3_bindRoutes(): void;
    /**
     * Express的插件
     */
    $4_initPlugin(): void;
    /**
     * 设置错误页面
     */
    $5_bindErrorPage(): void;
}
export { ExpressBase_Helper, };
//# sourceMappingURL=express-base.d.ts.map