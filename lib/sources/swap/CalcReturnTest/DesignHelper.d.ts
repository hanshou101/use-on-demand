export declare enum SolidSide {
    Buy = "\u4E70\u5355",
    Sell = "\u5356\u5355"
}
export declare enum FutureSide {
    Long = "\u591A\u4ED3",
    Short = "\u7A7A\u4ED3"
}
export declare class KLine_Indexes_Class implements KLine_Indexes {
    raw: Array<KLineItem>;
    index: {
        firstK: number;
        lastK: number;
        highestK: number;
        lowestK: number;
        kLen: number;
        avgPerK: number;
    };
    constructor(raw: Array<KLineItem>);
    print(): void;
    /**
     * 一个【大K线数组】，平均拆分为，若干个【小K线数组】。
     */
    split(part: number): Array<KLine_Indexes>;
    /**
     * 采用【平方】的方式，来拆分【大K线数组】
     *        1.比如，原本为16长度，将拆分为，4个4长度的。
     */
    splitSquare(): Array<KLine_Indexes>;
}
export declare class CnyManager_Class implements CnyManager {
    perTimeCny: number;
    static instance: CnyManager_Class;
}
declare abstract class Base_ActionQueue_Class<S extends FutureSide> implements Trade.ActionQueue<S> {
    kIndexes: KLine_Indexes;
    cnyManager: CnyManager;
    abstract getBuyQueue(): Trade.ActionSummary;
    abstract getSellQueue(): Trade.ActionSummary;
    /**
     * 【买入Action】和【卖出Action】，的组合数组。
     *        1.此处，没有做【汇总逻辑】。交给【Settle】环节去做。
     */
    get pureFullQueue(): Array<Trade.Action>;
    constructor(kIndexes: KLine_Indexes, cnyManager: CnyManager);
    print(): void;
    settleBuy(): Omit<Trade.Settle, 'cny_inSell'>;
    settleSell(): Omit<Trade.Settle, 'cny_inBuy'>;
    settleBoth(): Trade.Settle;
}
export declare class Long_ActionQueue_Class extends Base_ActionQueue_Class<FutureSide.Long> {
    /**
     * 【多仓】买入操作：
     *        1.分多批买入
     */
    getBuyQueue(): Trade.ActionSummary;
    /**
     * 【多仓】卖出操作：
     *        1.最后一日，一次性卖出。
     */
    getSellQueue(): Trade.ActionSummary;
}
export declare class Short_ActionQueue_Class extends Base_ActionQueue_Class<FutureSide.Short> {
    /**
     * 【空仓】买入操作：
     *        1.分多批买入
     */
    getBuyQueue(): Trade.ActionSummary;
    /**
     * 【空仓】卖出操作：
     *        1.第一天时，一次性卖出。
     */
    getSellQueue(): Trade.ActionSummary;
}
export {};
//# sourceMappingURL=DesignHelper.d.ts.map