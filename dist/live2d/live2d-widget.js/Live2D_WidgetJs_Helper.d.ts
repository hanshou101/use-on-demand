declare enum CdnModeE {
    SelfPublic = "SelfPublic",
    UnPkg = "UnPkg"
}
declare enum L2Dwidget_LoadWayE {
    DynamicLoad = 0,
    Import = 1,
    SrcModuleImport = 2,
    Require = 3
}
export declare enum Live2DModelE {
    'default_demo' = "\u4E0D\u9700\u8981\u4F20\u503C\uFF0C\u7559\u4E00\u4E2Aundefined\u5373\u53EF",
    'chitose' = "chitose",
    /**
     * 原数据为；["epsilon2.1", "epsilon2_1"]。
     *        1.目录名和文件名，不一样。
     */
    'epsilon2_1' = "epsilon2_1",
    /**
     * 原数据为：["gantzert_felixander", "gf"]。
     *        1.目录名和文件名，不一样。
     */
    'gf' = "gf",
    'haru01' = "haru01",
    'haru02' = "haru02",
    'haruto' = "haruto",
    'hibiki' = "hibiki",
    'hijiki' = "hijiki",
    'izumi' = "izumi",
    'koharu' = "koharu",
    'miku' = "miku",
    'nico' = "nico",
    'ni-j' = "ni-j",
    'nipsilon' = "nipsilon",
    'nito' = "nito",
    'shizuku' = "shizuku",
    'tororo' = "tororo",
    'tsumiki' = "tsumiki",
    'Unitychan' = "Unitychan",
    'wanko' = "wanko",
    'z16' = "z16"
}
export declare class Live2D_WidgetJs_Helper {
    /**
     * 根据【live2d-widget.js】库的不同版本，选择不同的加载方式。
     */
    static readonly libLoadWay: L2Dwidget_LoadWayE;
    static readonly cdnMode: CdnModeE;
    /**
     * Model存储空间 的【远程路径】。
     */
    static readonly pathCfg: {
        modelBase: string;
    };
    static initDemo(modelE?: Live2DModelE, pathCfg?: {
        modelBase: string;
    }): void;
    /**
     * CSS，加载状态表
     */
    private static cssLoadStatus;
    private static loadDemoCss;
}
export {};
//# sourceMappingURL=Live2D_WidgetJs_Helper.d.ts.map