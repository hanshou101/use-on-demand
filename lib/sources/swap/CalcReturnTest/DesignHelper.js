import { __assign, __extends, __read, __spread } from "tslib";
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
var KLine_Indexes_Class = /** @class */ (function () {
    function KLine_Indexes_Class(raw) {
        this.raw = raw;
        var len = raw.length;
        // 克隆数组，并排序。（不改变原有数组的顺序）
        var sortedRaw = __spread(raw).sort(function (new1, old1) { return (new1 - old1); });
        this.index = {
            firstK: raw[0],
            lastK: raw[len - 1],
            highestK: sortedRaw[0],
            lowestK: sortedRaw[len - 1],
            kLen: len,
            avgPerK: raw.reduce(function (preObj, k) { return (preObj + k); }, 0) / len,
        };
    }
    KLine_Indexes_Class.prototype.print = function () {
        console.log(this.index);
    };
    /**
     * 一个【大K线数组】，平均拆分为，若干个【小K线数组】。
     */
    KLine_Indexes_Class.prototype.split = function (part) {
        var len = this.raw.length;
        var size = parseInt(len / part); // 每个块的大小
        var splitArr = [];
        for (var i = 0; i < len; i += size) {
            splitArr.push(new KLine_Indexes_Class(this.raw.slice(i, i + size)));
        }
        return splitArr;
    };
    /**
     * 采用【平方】的方式，来拆分【大K线数组】
     *        1.比如，原本为16长度，将拆分为，4个4长度的。
     */
    KLine_Indexes_Class.prototype.splitSquare = function () {
        var len = this.raw.length;
        var part = parseInt(Math.pow(len, 1 / 2)); // 开平方
        return this.split(part);
    };
    return KLine_Indexes_Class;
}());
export { KLine_Indexes_Class };
var ActionSummary_Class = /** @class */ (function () {
    function ActionSummary_Class(actionQueue, holdingVol) {
        this.actionQueue = actionQueue;
        this.holdingVol = holdingVol;
    }
    ActionSummary_Class.prototype.getSummary = function () {
        return __assign(__assign({}, this.actionQueue.reduce(function (preObj, item) {
            preObj.queueVol += item.fVol;
            preObj.queueCny += item.actionCny;
            return preObj;
        }, {
            queueVol: 0,
            queueCny: 0,
        })), { leftVol: this.holdingVol });
    };
    return ActionSummary_Class;
}());
var CnyManager_Class = /** @class */ (function () {
    function CnyManager_Class() {
        this.perTimeCny = 5000;
    }
    CnyManager_Class.instance = new CnyManager_Class();
    return CnyManager_Class;
}());
export { CnyManager_Class };
var Base_ActionQueue_Class = /** @class */ (function () {
    function Base_ActionQueue_Class(kIndexes, cnyManager) {
        this.kIndexes = kIndexes;
        this.cnyManager = cnyManager;
    }
    Object.defineProperty(Base_ActionQueue_Class.prototype, "pureFullQueue", {
        // public abstract settleBoth(): Trade.Settle;               // 抽象
        /**
         * 【买入Action】和【卖出Action】，的组合数组。
         *        1.此处，没有做【汇总逻辑】。交给【Settle】环节去做。
         */
        get: function () {
            return __spread(this.getBuyQueue().actionQueue, this.getSellQueue().actionQueue);
        },
        enumerable: false,
        configurable: true
    });
    Base_ActionQueue_Class.prototype.print = function () {
        console.log({
            '买入Action结算': this.settleBuy(),
            '卖出Action结算': this.settleSell(),
            '两者总结算': this.settleBoth(),
        });
    };
    Base_ActionQueue_Class.prototype.settleBuy = function () {
        return {
            settlePieces: this.getBuyQueue().getSummary().queueVol,
            cny_inBuy: this.getBuyQueue().getSummary().queueCny,
            leftPieces: this.getBuyQueue().getSummary().leftVol,
        };
    };
    Base_ActionQueue_Class.prototype.settleSell = function () {
        return {
            settlePieces: this.getSellQueue().getSummary().queueVol,
            cny_inSell: this.getSellQueue().getSummary().queueCny,
            leftPieces: this.getSellQueue().getSummary().leftVol,
        };
    };
    Base_ActionQueue_Class.prototype.settleBoth = function () {
        var _a = this.settleBuy(), cny_inBuy = _a.cny_inBuy, buy_settlePieces = _a.settlePieces, buy_leftPieces = _a.leftPieces;
        var _b = this.settleSell(), cny_inSell = _b.cny_inSell, sell_settlePieces = _b.settlePieces, sell_leftPieces = _b.leftPieces;
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
            cny_inBuy: cny_inBuy,
            cny_inSell: cny_inSell,
            settlePieces: buy_settlePieces,
            leftPieces: buy_leftPieces,
        };
    };
    return Base_ActionQueue_Class;
}());
var Long_ActionQueue_Class = /** @class */ (function (_super) {
    __extends(Long_ActionQueue_Class, _super);
    function Long_ActionQueue_Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 【多仓】买入操作：
     *        1.分多批买入
     */
    Long_ActionQueue_Class.prototype.getBuyQueue = function () {
        var _this = this;
        // Action队列
        var actionQueue = this.kIndexes.raw.map(function (k) {
            return {
                actionCny: _this.cnyManager.perTimeCny,
                fVol: _this.cnyManager.perTimeCny / k,
                price: k,
                solidSide: SolidSide.Buy,
            };
        });
        return new ActionSummary_Class(actionQueue, 0);
    };
    /**
     * 【多仓】卖出操作：
     *        1.最后一日，一次性卖出。
     */
    Long_ActionQueue_Class.prototype.getSellQueue = function () {
        var fVol = this.getBuyQueue().getSummary().queueVol;
        var price = this.kIndexes.index.lastK;
        // Action队列
        var actionQueue = [
            {
                actionCny: fVol * price,
                fVol: fVol,
                price: price,
                solidSide: SolidSide.Sell,
            },
        ];
        return new ActionSummary_Class(actionQueue, 0);
    };
    return Long_ActionQueue_Class;
}(Base_ActionQueue_Class));
export { Long_ActionQueue_Class };
var Short_ActionQueue_Class = /** @class */ (function (_super) {
    __extends(Short_ActionQueue_Class, _super);
    function Short_ActionQueue_Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 【空仓】买入操作：
     *        1.分多批买入
     */
    Short_ActionQueue_Class.prototype.getBuyQueue = function () {
        var _this = this;
        var holdingVol = this.getSellQueue().getSummary().queueVol; // 当前持有量
        // Action队列
        var actionQueue = this.kIndexes.raw.map(function (k) {
            var targetVol = _this.cnyManager.perTimeCny / k;
            if (holdingVol > targetVol) { // TIP 买下【全部目标值】
                var action = {
                    actionCny: _this.cnyManager.perTimeCny,
                    fVol: _this.cnyManager.perTimeCny / k,
                    price: k,
                    solidSide: SolidSide.Buy,
                };
                holdingVol -= action.fVol; // 【持有量】变少
                return action;
            }
            else if (holdingVol > 0) { // TIP 买下【部分目标值】
                var partVol = holdingVol; // 买下【当前所有持有量】
                var action = {
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
                var action = {
                    actionCny: 0,
                    fVol: 0,
                    price: k,
                    solidSide: SolidSide.Buy,
                };
                return action;
            }
        });
        return new ActionSummary_Class(actionQueue, holdingVol);
    };
    /**
     * 【空仓】卖出操作：
     *        1.第一天时，一次性卖出。
     */
    Short_ActionQueue_Class.prototype.getSellQueue = function () {
        var actionCny = this.cnyManager.perTimeCny * this.kIndexes.index.kLen;
        var price = this.kIndexes.index.firstK;
        // Action队列
        var actionQueue = [
            {
                actionCny: actionCny,
                fVol: actionCny / price,
                price: price,
                solidSide: SolidSide.Sell,
            },
        ];
        return new ActionSummary_Class(actionQueue, 0);
    };
    return Short_ActionQueue_Class;
}(Base_ActionQueue_Class));
export { Short_ActionQueue_Class };
//# sourceMappingURL=DesignHelper.js.map