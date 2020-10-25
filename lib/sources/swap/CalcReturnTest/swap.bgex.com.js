import { __extends } from "tslib";
import * as bgex from './data/bgex';
import { CnyManager_Class, KLine_Indexes_Class, Long_ActionQueue_Class, Short_ActionQueue_Class } from './DesignHelper';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';
var KInfo = /** @class */ (function () {
    function KInfo(KLines) {
        var _this = this;
        this.KLines = KLines;
        this.max = Number.MIN_SAFE_INTEGER;
        this.min = Number.MAX_SAFE_INTEGER;
        this.length = KLines.length;
        this.first = KLines[0];
        this.last = KLines[this.length - 1];
        // 计算平均价。
        this.avgPrice =
            KLines.reduce(function (preObj, _close) {
                if (!_close) {
                    throw new Error(xX_ExceptionError_Helper.throwError_andLog('数据有问题'));
                }
                _this.max = _close > _this.max ? _close : _this.max;
                _this.min = _close < _this.min ? _close : _this.min;
                return preObj + _close;
            }, 0) / this.length;
        //
        this.investCNY = this.length * cfg.onceInvestM;
        this.sumHoldVol = this.KLines.reduce(function (preObj, close) {
            return preObj + cfg.onceInvestM / close /**  cfg.zhangPerCoin */;
        }, 0);
        this.perCoinCnyCost = this.investCNY / this.sumHoldVol;
    }
    return KInfo;
}());
var Plan_A_Info = /** @class */ (function (_super) {
    __extends(Plan_A_Info, _super);
    function Plan_A_Info(KLines) {
        var _this = _super.call(this, KLines) || this;
        _this.KLines = KLines;
        return _this;
    }
    return Plan_A_Info;
}(KInfo));
var Plan_B_Info = /** @class */ (function (_super) {
    __extends(Plan_B_Info, _super);
    function Plan_B_Info(KLines) {
        var _this = _super.call(this, KLines) || this;
        _this.KLines = KLines;
        return _this;
    }
    return Plan_B_Info;
}(KInfo));
var Plan_C_Info = /** @class */ (function (_super) {
    __extends(Plan_C_Info, _super);
    function Plan_C_Info(KLines) {
        var _this = _super.call(this, KLines) || this;
        _this.KLines = KLines;
        return _this;
    }
    return Plan_C_Info;
}(KInfo));
var Plan_D_Info = /** @class */ (function (_super) {
    __extends(Plan_D_Info, _super);
    function Plan_D_Info(KLines) {
        var _this = _super.call(this, KLines) || this;
        _this.KLines = KLines;
        return _this;
    }
    return Plan_D_Info;
}(KInfo));
var Plan_E_Info = /** @class */ (function (_super) {
    __extends(Plan_E_Info, _super);
    function Plan_E_Info(KLines) {
        var _this = _super.call(this, KLines) || this;
        _this.KLines = KLines;
        return _this;
    }
    return Plan_E_Info;
}(KInfo));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var cfg = {
    onceInvestM: 5000,
    // zhangPerCoin: 10000,
    // sellPx       : 0,
    // optimizeRatio: 1 / 2,         // 优化参数（0——1）
    // optimizeRatio: 1 / 3,         // 优化参数（0——1）
    optimizeRatio: 0,
};
function planA(kInfo, useLastPrice) {
    if (useLastPrice === void 0) { useLastPrice = true; }
    console.log("\n  \u3010\u8BA1\u5212A\u3011\n  \u7279\u70B9\uFF1A\n          1.\u4EC5\u8003\u8651\u3010\u591A\u4ED3\u3011\u60C5\u51B5\u3002\n          2.\n  ");
    // cfg.sellPx = max;        // 最高价
    // cfg.sellPx = min;        // 最低价
    //
    // cfg.sellPx = avgPrice + (max - avgPrice) * cfg.optimizeRatio;    // 较优价。
    // cfg.sellPx        = first;
    /**
     * TIP 常用方式：
     *        1.最后价格。
     *        2.均价。
     */
    var sellPx;
    if (useLastPrice) {
        console.log('使用最后价格');
        sellPx = kInfo.last;
    }
    else {
        console.log('使用均价');
        sellPx = kInfo.avgPrice;
    }
    // WARN 第一版，采用平均价格，来进行估值。
    var CNY_Result = kInfo.sumHoldVol * sellPx; // 所得钱数。
    console.log(
    // [
    {
        长度: kInfo.length,
        平均价: kInfo.avgPrice,
        起始价: kInfo.first,
        最终价: kInfo.last,
        最高价: kInfo.max,
        最低价: kInfo.min,
        合计持币数: kInfo.sumHoldVol,
        购买平均成本: kInfo.perCoinCnyCost,
        卖出价格: sellPx,
        投入成本: kInfo.investCNY,
        回归结果: CNY_Result,
        收益比: CNY_Result / kInfo.investCNY,
    });
}
function planB(kInfo) {
    console.log("\n  \u3010\u8BA1\u5212B\u3011\n  \u7279\u70B9\uFF1A\n          1.\u5BF9\u79F0\n          2.\n  ");
    var duoRes = (function () {
        var finalPrice_duo = kInfo.last; // 多的最后卖价
        return {
            totalBuyCny: kInfo.investCNY,
            totalSellCny: kInfo.sumHoldVol * finalPrice_duo,
            finalPrice: finalPrice_duo,
        };
    })();
    var kongRes = (function () {
        var finalPrice_kong = kInfo.last; // 空的最后买价
        return {
            totalSellCny: kInfo.investCNY,
            totalBuyCny: kInfo.sumHoldVol * finalPrice_kong,
            finalPrice: finalPrice_kong,
        };
    })();
    var cost = {
        多: duoRes.totalBuyCny,
        空: kongRes.totalSellCny,
    };
    var bonus = {
        多: duoRes.totalSellCny - duoRes.totalBuyCny,
        空: kongRes.totalSellCny - kongRes.totalBuyCny,
    };
    var earnRatio = {
        多: bonus.多 / cost.多,
        空: bonus.空 / cost.空,
        总: (bonus.多 + bonus.空) / (cost.多 + cost.空),
    };
    console.log(
    // [
    // JSON.stringify(
    {
        长度: kInfo.length,
        平均价: kInfo.avgPrice,
        起始价: kInfo.first,
        最终价: kInfo.last,
        最高价: kInfo.max,
        最低价: kInfo.min,
        合计持币数: kInfo.sumHoldVol,
        购买平均成本: kInfo.perCoinCnyCost,
        最后处理价格: {
            多: duoRes.finalPrice,
            空: kongRes.finalPrice,
        },
        投入成本: cost,
        回归结果: bonus,
        收益比: earnRatio,
    });
}
/**
 * 准备，用【零仓开买】和【满仓开卖】，来执行。
 */
function planC(kInfo) {
    console.log("\n  \u3010\u8BA1\u5212C\u3011\n  \u7279\u70B9\u662F\uFF1A\n          1.\u5DF2\u77E5\u3010K\u7EBF\u6570\u636E\u3011\u540E\uFF0C\u518D\u5012\u63A8\u7684\u7B56\u7565\u3002\u9006\u65F6\u95F4\u5012\u63A8\u3002\n          2.\n  ");
    var duoRes = (function () {
        var finalPrice_duo = kInfo.last; // 多的最后卖价
        return {
            totalBuyCny: kInfo.investCNY,
            totalSellCny: kInfo.sumHoldVol * finalPrice_duo,
            finalPrice: finalPrice_duo,
        };
    })();
    /**
     * 先满空仓（卖出），然后再逐步减仓（买入）
     */
    var kongRes = (function () {
        var beginPrice_Kong = kInfo.first; // 空的一开始买价
        return {
            totalSellCny: kInfo.sumHoldVol * beginPrice_Kong,
            totalBuyCny: kInfo.investCNY,
            finalPrice: beginPrice_Kong,
        };
    })();
    var cost = {
        多: duoRes.totalBuyCny,
        空: kongRes.totalSellCny,
    };
    var bonus = {
        多: duoRes.totalSellCny - duoRes.totalBuyCny,
        空: kongRes.totalSellCny - kongRes.totalBuyCny,
    };
    var earnRatio = {
        多: bonus.多 / cost.多,
        空: bonus.空 / cost.空,
        总: (bonus.多 + bonus.空) / (cost.多 + cost.空),
    };
    console.log(
    // [
    // JSON.stringify(
    {
        长度: kInfo.length,
        平均价: kInfo.avgPrice,
        起始价: kInfo.first,
        最终价: kInfo.last,
        最高价: kInfo.max,
        最低价: kInfo.min,
        合计持币数: kInfo.sumHoldVol,
        购买平均成本: kInfo.perCoinCnyCost,
        最后处理价格: {
            多: duoRes.finalPrice,
            空: kongRes.finalPrice,
        },
        投入成本: cost,
        回归结果: bonus,
        收益比: earnRatio,
    });
}
/**
 * 修正了【planC】的一些错误。
 *        1.【planC】考虑的过于理想化。是【从后往前】倒推的形式.
 */
function planD(kInfo) {
    console.log("\n  \u3010\u8BA1\u5212D\u3011\n  \u7279\u70B9\uFF1A\n          1.\u6BD4\u8F83\u8D34\u8FD1\u4E8E\uFF0C\u771F\u6B63\u7684\u3010\u4E00\u6B21\u6027\u5356\u51FA\u3011\u3001\u3010\u5206\u591A\u6279\u4E70\u5165\u3011\u3002\n  ");
    var duoRes = (function () {
        var finalPrice_duo = kInfo.last; // 多的最后卖价
        return {
            totalBuyCny: kInfo.investCNY,
            totalSellCny: kInfo.sumHoldVol * finalPrice_duo,
            finalPrice: finalPrice_duo,
        };
    })();
    /**
     * 先满空仓（卖出），然后再逐步减仓（买入）
     *        1.第一次卖出后，拿到的【合约张数】是一定的。
     *        2.之后每天，用【同样的CNY】消化掉【部分合约张数】。
     *                1.价格越低，则消化掉的【张数】越多。
     *        3.一直持续。
     *                1.一直到【消化】完后，计算一下  【总卖价值】和【总买价值】  的多少。
     *                2.所以，也就是说。【时间】这个项，是没有办法预计的。
     *                        1.【时间】，是一个不确定项。
     *        4.
     */
    var extraLoose = 0;
    var kongRes = (function () {
        var beginPrice_Kong = kInfo.first; // 空的一开始买价
        var real_sumHoldVol = (kInfo.length * cfg.onceInvestM) / kInfo.first; // 总计【真实】购买数量。
        var predicate_sumHoldVol = kInfo.sumHoldVol; // 预计中【计划】购买数量。
        // 购买进程
        var buyProgress = kInfo.KLines.reduce(function (preObj, curItem) {
            var buyTimes = preObj.buyTimes;
            if (preObj.remainVol === 0) {
                // 已经【提前】买完。
            }
            else {
                // 仍然可买。
                buyTimes++;
            }
            var onceVol = cfg.onceInvestM / curItem; // 单次买入量
            var onceCNY = cfg.onceInvestM; // 单次买入的CNY价值
            if (preObj.remainVol < onceVol) {
                // 如果不够买【一整次】。
                if (preObj.remainVol > 0) {
                    // 减少日志次数
                    console.log('数量已不足以，买一整次', '剩余数量', preObj.remainVol, '想要采购数量', onceVol);
                }
                onceVol = preObj.remainVol;
                onceCNY = onceVol * curItem;
            }
            return {
                remainVol: preObj.remainVol - onceVol,
                buyCNY_sum: preObj.buyCNY_sum + onceCNY,
                // buyTimes  : preObj.buyTimes,    // 这里用【自加】好像不太好？所以拆开用【+1】。
                buyTimes: buyTimes,
            };
        }, {
            remainVol: real_sumHoldVol,
            buyCNY_sum: 0,
            buyTimes: 0,
        });
        console.log("\u7A7A\u4ED3\uFF0C\u5206", buyProgress.buyTimes, "\u6B21\uFF0C\u5168\u4E70\u5B8C");
        if (buyProgress.remainVol > 0) {
            extraLoose = -1 * buyProgress.remainVol * kInfo.last;
            console.error("\u7ECF\u5386\u8FC7", kInfo.length, "\u5929\u540E\uFF0C\u4ECD\u672A\u4E70\u5B8C\uFF0C\u5269\u4F59", "\u5408\u7EA6\u6570\uFF1A", buyProgress.remainVol, "\u3002", "\u4EE5\u6700\u7EC8\u4EF7\u8BA1\uFF0C\u94B1\u6570\uFF1A", extraLoose);
        }
        return {
            totalSellCny: kInfo.investCNY,
            totalBuyCny: buyProgress.buyCNY_sum,
            finalPrice: beginPrice_Kong,
        };
    })();
    // 投入成本
    var cost = {
        多: duoRes.totalBuyCny,
        空: kongRes.totalSellCny,
    };
    // 所得收益
    var bonus = {
        多: duoRes.totalSellCny - duoRes.totalBuyCny,
        空: kongRes.totalSellCny - kongRes.totalBuyCny,
        空仓额外亏损: extraLoose,
    };
    //
    var earnRatio = {
        '多': bonus.多 / cost.多,
        '空': bonus.空 / cost.空,
        '空仓额外亏损': extraLoose / cost.空,
        '总(不计额外)': (bonus.多 + bonus.空) / (cost.多 + cost.空),
    };
    /**
     * TODO 此处，准备进行拆分：
     *        1.共同参数，全部放一块儿
     *        2，【合计持币数】，此处的值，应该只是【多仓】的值；    你还需要，单独计算【空仓】的值。
     *        3.可以通过切割【K线数组】，来完成【单元模块，累加叠加】的效果。
     *                1.非常机智的，绕过了【重写算法】的问题。
     *        4.
     *        5.【架构】需要整体重构一下。
     */
    console.log(
    // [
    // JSON.stringify(
    {
        '长度': kInfo.length,
        '平均价': kInfo.avgPrice,
        '起始价': kInfo.first,
        '最终价': kInfo.last,
        '最高价': kInfo.max,
        '最低价': kInfo.min,
        '合计持币数': kInfo.sumHoldVol,
        '购买平均成本': kInfo.perCoinCnyCost,
        '最后处理价格': {
            多: duoRes.finalPrice,
            空: kongRes.finalPrice,
        },
        '投入成本': cost,
        '回归结果（盈利）': bonus,
        '收益比': earnRatio,
    });
}
function planE(arr) {
    console.log("\n  \u3010\u8BA1\u5212E\u3011\n  \u7279\u70B9\uFF1A\n          1.\u6253\u5305\u6210\u3010\u5E73\u65B9\u5F0F\u62C6\u5206\u3011\u7684\u4E00\u63FD\u5B50\u65B9\u6848\u3002\n  ");
    var kLineIndexes = new KLine_Indexes_Class(arr);
    var cnyManager = CnyManager_Class.instance;
    var long = new Long_ActionQueue_Class(kLineIndexes, cnyManager);
    var short = new Short_ActionQueue_Class(kLineIndexes, cnyManager);
    console.log('——————走势信息——————');
    kLineIndexes.print();
    console.log('——————多仓——————');
    long.print();
    console.log('——————空仓——————');
    short.print();
}
function go() {
    var data = bgex.getBgData();
    // const data: Array<number> = bgex.getBgData().reverse();
    // const data = bitmex.getBitmexData();
    // const data = bitmex.getBitmexData().reverse();
    // const data: Array<number> = mock.pingjunData(2000, 100, 300);
    // const data: Array<number> = mock.pingjunData(2000, 100, 300).reverse();
    console.log('————————————————————————');
    planA(new Plan_A_Info(data), false);
    console.log('————————————————————————');
    planB(new Plan_B_Info(data));
    console.log('————————————————————————');
    planC(new Plan_C_Info(data));
    console.log('————————————————————————');
    planD(new Plan_D_Info(data));
    console.log('————————————————————————');
    planE(data);
}
go();
//# sourceMappingURL=swap.bgex.com.js.map