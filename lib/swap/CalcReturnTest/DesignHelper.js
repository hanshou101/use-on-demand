export var SolidSide;
(function (SolidSide) {
    SolidSide["Buy"] = "\u4E70\u5355";
    SolidSide["Sell"] = "\u5356\u5355";
})(SolidSide || (SolidSide = {}));
export var FutureSide;
(function (FutureSide) {
    FutureSide["Long"] = "\u591A\u4ED3";
    FutureSide["Short"] = "\u7A7A\u4ED3";
})(FutureSide || (FutureSide = {}));
export class KLine_Indexes_Class {
    constructor(raw) {
        this.raw = raw;
        const len = raw.length;
        // 克隆数组，并排序。（不改变原有数组的顺序）
        const sortedRaw = [...raw].sort((new1, old1) => (new1 - old1));
        this.index = {
            firstK: raw[0],
            lastK: raw[len - 1],
            highestK: sortedRaw[0],
            lowestK: sortedRaw[len - 1],
            kLen: len,
            avgPerK: raw.reduce((preObj, k) => (preObj + k), 0) / len,
        };
    }
    print() {
        console.log(this.index);
    }
    /**
     * 一个【大K线数组】，平均拆分为，若干个【小K线数组】。
     */
    split(part) {
        const len = this.raw.length;
        const size = parseInt(len / part); // 每个块的大小
        const splitArr = [];
        for (let i = 0; i < len; i += size) {
            splitArr.push(new KLine_Indexes_Class(this.raw.slice(i, i + size)));
        }
        return splitArr;
    }
    /**
     * 采用【平方】的方式，来拆分【大K线数组】
     *        1.比如，原本为16长度，将拆分为，4个4长度的。
     */
    splitSquare() {
        const len = this.raw.length;
        const part = parseInt(Math.pow(len, 1 / 2)); // 开平方
        return this.split(part);
    }
}
class ActionSummary_Class {
    constructor(actionQueue, holdingVol) {
        this.actionQueue = actionQueue;
        this.holdingVol = holdingVol;
    }
    getSummary() {
        return {
            ...this.actionQueue.reduce((preObj, item) => {
                preObj.queueVol += item.fVol;
                preObj.queueCny += item.actionCny;
                return preObj;
            }, {
                queueVol: 0,
                queueCny: 0,
            }),
            leftVol: this.holdingVol,
        };
    }
}
export class CnyManager_Class {
    constructor() {
        this.perTimeCny = 5000;
    }
}
CnyManager_Class.instance = new CnyManager_Class();
class Base_ActionQueue_Class {
    constructor(kIndexes, cnyManager) {
        this.kIndexes = kIndexes;
        this.cnyManager = cnyManager;
    }
    // public abstract settleBoth(): Trade.Settle;               // 抽象
    /**
     * 【买入Action】和【卖出Action】，的组合数组。
     *        1.此处，没有做【汇总逻辑】。交给【Settle】环节去做。
     */
    get pureFullQueue() {
        return [
            ...this.getBuyQueue().actionQueue,
            ...this.getSellQueue().actionQueue,
        ];
    }
    print() {
        console.log({
            '买入Action结算': this.settleBuy(),
            '卖出Action结算': this.settleSell(),
            '两者总结算': this.settleBoth(),
        });
    }
    settleBuy() {
        return {
            settlePieces: this.getBuyQueue().getSummary().queueVol,
            cny_inBuy: this.getBuyQueue().getSummary().queueCny,
            leftPieces: this.getBuyQueue().getSummary().leftVol,
        };
    }
    settleSell() {
        return {
            settlePieces: this.getSellQueue().getSummary().queueVol,
            cny_inSell: this.getSellQueue().getSummary().queueCny,
            leftPieces: this.getSellQueue().getSummary().leftVol,
        };
    }
    settleBoth() {
        const { cny_inBuy, settlePieces: buy_settlePieces, leftPieces: buy_leftPieces, } = this.settleBuy();
        const { cny_inSell, settlePieces: sell_settlePieces, leftPieces: sell_leftPieces, } = this.settleSell();
        if ((buy_settlePieces + buy_leftPieces).toFixed(4) // 可能略微有误差
            !== (sell_settlePieces + sell_leftPieces).toFixed(4) // 可能略微有误差
        ) {
            console.log({
                买入: {
                    成功: buy_settlePieces,
                    遗留: buy_leftPieces,
                },
                卖出: {
                    成功: sell_settlePieces,
                    遗留: sell_leftPieces,
                },
            });
            throw new Error('按道理说，【买入张数】和【卖出张数】，一定是严格相等的！');
        }
        return {
            cny_inBuy,
            cny_inSell,
            settlePieces: buy_settlePieces,
            leftPieces: buy_leftPieces,
        };
    }
}
export class Long_ActionQueue_Class extends Base_ActionQueue_Class {
    /**
     * 【多仓】买入操作：
     *        1.分多批买入
     */
    getBuyQueue() {
        // Action队列
        const actionQueue = this.kIndexes.raw.map((k) => {
            return {
                actionCny: this.cnyManager.perTimeCny,
                fVol: this.cnyManager.perTimeCny / k,
                price: k,
                solidSide: SolidSide.Buy,
            };
        });
        return new ActionSummary_Class(actionQueue, 0);
    }
    /**
     * 【多仓】卖出操作：
     *        1.最后一日，一次性卖出。
     */
    getSellQueue() {
        const fVol = this.getBuyQueue().getSummary().queueVol;
        const price = this.kIndexes.index.lastK;
        // Action队列
        const actionQueue = [
            {
                actionCny: fVol * price,
                fVol,
                price,
                solidSide: SolidSide.Sell,
            },
        ];
        return new ActionSummary_Class(actionQueue, 0);
    }
}
export class Short_ActionQueue_Class extends Base_ActionQueue_Class {
    /**
     * 【空仓】买入操作：
     *        1.分多批买入
     */
    getBuyQueue() {
        let holdingVol = this.getSellQueue().getSummary().queueVol; // 当前持有量
        // Action队列
        const actionQueue = this.kIndexes.raw.map((k) => {
            const targetVol = this.cnyManager.perTimeCny / k;
            if (holdingVol > targetVol) { // TIP 买下【全部目标值】
                const action = {
                    actionCny: this.cnyManager.perTimeCny,
                    fVol: this.cnyManager.perTimeCny / k,
                    price: k,
                    solidSide: SolidSide.Buy,
                };
                holdingVol -= action.fVol; // 【持有量】变少
                return action;
            }
            else if (holdingVol > 0) { // TIP 买下【部分目标值】
                const partVol = holdingVol; // 买下【当前所有持有量】
                const action = {
                    actionCny: partVol * k,
                    fVol: partVol,
                    price: k,
                    solidSide: SolidSide.Buy,
                };
                holdingVol -= action.fVol; // 【持有量】变少
                return action;
            }
            else { // TIP 【什么都不能买】
                if (holdingVol !== 0) {
                    throw new Error('程序出错了，此处【当前持有量】必为0');
                }
                const action = {
                    actionCny: 0,
                    fVol: 0,
                    price: k,
                    solidSide: SolidSide.Buy,
                };
                return action;
            }
        });
        return new ActionSummary_Class(actionQueue, holdingVol);
    }
    /**
     * 【空仓】卖出操作：
     *        1.第一天时，一次性卖出。
     */
    getSellQueue() {
        const actionCny = this.cnyManager.perTimeCny * this.kIndexes.index.kLen;
        const price = this.kIndexes.index.firstK;
        // Action队列
        const actionQueue = [
            {
                actionCny,
                fVol: actionCny / price,
                price,
                solidSide: SolidSide.Sell,
            },
        ];
        return new ActionSummary_Class(actionQueue, 0);
    }
}
//# sourceMappingURL=DesignHelper.js.map