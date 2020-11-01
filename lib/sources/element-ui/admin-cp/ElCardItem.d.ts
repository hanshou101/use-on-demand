/**
 * El卡片的配置类
 *
 * TODO 具体使用方式：查看  PlayerDetail_Page.vue 文件。
 */
export declare class xX_MyEl_Cards {
    array: xX_MyEl_OneCard[];
    constructor(array: xX_MyEl_OneCard[]);
}
export declare class xX_MyEl_OneCard {
    cardTitle: string;
    rows: MyEl_OneRow[];
    constructor(cardTitle: string, rows: MyEl_OneRow[]);
}
declare type MyEl_OneRow = xX_MyEl_OneCol[];
export declare class xX_MyEl_OneCol {
    leftLabel: string;
    rightProp: string;
    constructor(leftLabel: string, rightProp: string);
}
export {};
//# sourceMappingURL=ElCardItem.d.ts.map