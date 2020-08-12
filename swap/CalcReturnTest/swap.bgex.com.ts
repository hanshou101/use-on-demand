import * as bitmex from './data/bitmex';
import * as bgex   from './data/bgex';
import * as mock   from './data/mock';

interface Cfg {
  onceInvestM: number;      // 单次投资量
  optimizeRatio: number;    // 优化参数
}

interface DuoKong {
  totalBuyCny: number;
  totalSellCny: number;
  finalPrice: number;
}

abstract class KInfo {
  public length: number;
  public first: number;
  public last: number;
  public max: number = Number.MIN_SAFE_INTEGER;
  public min: number = Number.MAX_SAFE_INTEGER;
  public avgPrice: number;           // 平均价格
  // perAvgCost: number;
  public investCNY: number;    // 人民币总投资额
  public sumHoldVol: number;   // 总计持有币数
  public perCoinCnyCost: number;      // 每个币的平均CNY成本

  protected constructor(public KLines: number[]) {
    this.length         = KLines.length;
    this.first          = KLines[0];
    this.last           = KLines[this.length - 1];
    // 计算平均价。
    this.avgPrice       = KLines.reduce((preObj, _close) => {
      if (!_close) {
        throw new Error('数据有问题');
      }
      this.max = _close > this.max ? _close : this.max;
      this.min = _close < this.min ? _close : this.min;
      return preObj + _close;
    }, 0) / this.length;
    //
    this.investCNY      = this.length * cfg.onceInvestM;
    this.sumHoldVol     = this.KLines.reduce((preObj, close) => {
      return preObj + cfg.onceInvestM / close /**  cfg.zhangPerCoin */;
    }, 0);
    this.perCoinCnyCost = this.investCNY / this.sumHoldVol;
  }
}

class Plan_A_Info extends KInfo {

  constructor(public KLines: number[]) {
    super(KLines);
  }
}

class Plan_B_Info extends KInfo {


  constructor(public KLines: number[]) {
    super(KLines);
  }
}

class Plan_C_Info extends KInfo {


  constructor(public KLines: number[]) {
    super(KLines);
  }
}

class Plan_D_Info extends KInfo {


  constructor(public KLines: number[]) {
    super(KLines);
  }
}

const cfg: Cfg = {
  onceInvestM  : 5000,
  // zhangPerCoin: 10000,
  // sellPx       : 0,
  // optimizeRatio: 1 / 2,         // 优化参数（0——1）
  // optimizeRatio: 1 / 3,         // 优化参数（0——1）
  optimizeRatio: 0,         // 优化参数（0——1）
};

function go() {
  // const data: Array<number> = bgex.getBgData();
  // const data: Array<number> = bgex.getBgData().reverse();
  // const data = bitmex.getBitmexData();
  // const data = bitmex.getBitmexData().reverse();
  const data: Array<number> = mock.pingjunData();
  // const data: Array<number> = mock.pingjunData().reverse();

  console.log('————————————————————————');
  planA(new Plan_A_Info(data), false);
  console.log('————————————————————————');
  planB(new Plan_B_Info(data));
  console.log('————————————————————————');
  planC(new Plan_C_Info(data));
  console.log('————————————————————————');
  planD(new Plan_D_Info(data));
}

function planA(kInfo: Plan_A_Info, useLastPrice = true) {
  console.log('计划A');
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
  let sellPx;
  if (useLastPrice) {
    console.log('使用最后价格');
    sellPx = kInfo.last;
  } else {
    console.log('使用均价');
    sellPx = kInfo.avgPrice;
  }

  // WARN 第一版，采用平均价格，来进行估值。
  const CNY_Result = kInfo.sumHoldVol * sellPx;   // 所得钱数。
  console.log(
    // [
    {
      '长度'    : kInfo.length,
      '平均价'   : kInfo.avgPrice,
      '起始价'   : kInfo.first,
      '最终价'   : kInfo.last,
      '最高价'   : kInfo.max,
      '最低价'   : kInfo.min,
      '合计持币数' : kInfo.sumHoldVol,
      '购买平均成本': kInfo.perCoinCnyCost,
      '卖出价格'  : sellPx,
      '投入成本'  : kInfo.investCNY,
      '回归结果'  : CNY_Result,
      '收益比'   : CNY_Result / kInfo.investCNY,
    },
    // ]
  );

}


function planB(kInfo: Plan_B_Info) {
  console.log('计划B');
  const duoRes: DuoKong = (function () {
    const finalPrice_duo = kInfo.last;    // 多的最后卖价
    return {
      totalBuyCny : kInfo.investCNY,                    // 先买
      totalSellCny: kInfo.sumHoldVol * finalPrice_duo,  // 后卖
      finalPrice  : finalPrice_duo,
    };
  })();

  const kongRes: DuoKong = (function () {
    const finalPrice_kong = kInfo.last;   // 空的最后买价
    return {
      totalSellCny: kInfo.investCNY,                    // 先卖
      totalBuyCny : kInfo.sumHoldVol * finalPrice_kong, // 后买
      finalPrice  : finalPrice_kong,
    };
  })();

  const cost      = {
    多: duoRes.totalBuyCny,
    空: kongRes.totalSellCny,
  };
  const bonus     = {
    多: duoRes.totalSellCny - duoRes.totalBuyCny,
    空: kongRes.totalSellCny - kongRes.totalBuyCny,
  };
  const earnRatio = {
    多: bonus.多 / cost.多,
    空: bonus.空 / cost.空,
    总: (bonus.多 + bonus.空) / (cost.多 + cost.空),
  };
  console.log(
    // [
    // JSON.stringify(
    {
      '长度'    : kInfo.length,
      '平均价'   : kInfo.avgPrice,
      '起始价'   : kInfo.first,
      '最终价'   : kInfo.last,
      '最高价'   : kInfo.max,
      '最低价'   : kInfo.min,
      '合计持币数' : kInfo.sumHoldVol,
      '购买平均成本': kInfo.perCoinCnyCost,
      '最后处理价格': {
        多: duoRes.finalPrice,
        空: kongRes.finalPrice,
      },
      '投入成本'  : cost,
      '回归结果'  : bonus,
      '收益比'   : earnRatio,
    },
    // null, 2)
    // ]
  );

}

/**
 * 准备，用【零仓开买】和【满仓开卖】，来执行。
 */
function planC(kInfo: Plan_C_Info) {
  console.log('计划C');
  const duoRes: DuoKong = (function () {
    const finalPrice_duo = kInfo.last;    // 多的最后卖价
    return {
      totalBuyCny : kInfo.investCNY,                    // 先买
      totalSellCny: kInfo.sumHoldVol * finalPrice_duo,  // 后卖
      finalPrice  : finalPrice_duo,
    };
  })();

  /**
   * 先满空仓（卖出），然后再逐步减仓（买入）
   */
  const kongRes: DuoKong = (function () {
    const beginPrice_Kong = kInfo.first;   // 空的一开始买价
    return {
      totalSellCny: kInfo.sumHoldVol * beginPrice_Kong,                    // 先卖
      totalBuyCny : kInfo.investCNY, // 后买
      finalPrice  : beginPrice_Kong,
    };
  })();

  const cost      = {
    多: duoRes.totalBuyCny,
    空: kongRes.totalSellCny,
  };
  const bonus     = {
    多: duoRes.totalSellCny - duoRes.totalBuyCny,
    空: kongRes.totalSellCny - kongRes.totalBuyCny,
  };
  const earnRatio = {
    多: bonus.多 / cost.多,
    空: bonus.空 / cost.空,
    总: (bonus.多 + bonus.空) / (cost.多 + cost.空),
  };
  console.log(
    // [
    // JSON.stringify(
    {
      '长度'    : kInfo.length,
      '平均价'   : kInfo.avgPrice,
      '起始价'   : kInfo.first,
      '最终价'   : kInfo.last,
      '最高价'   : kInfo.max,
      '最低价'   : kInfo.min,
      '合计持币数' : kInfo.sumHoldVol,
      '购买平均成本': kInfo.perCoinCnyCost,
      '最后处理价格': {
        多: duoRes.finalPrice,
        空: kongRes.finalPrice,
      },
      '投入成本'  : cost,
      '回归结果'  : bonus,
      '收益比'   : earnRatio,
    },
    // null, 2)
    // ]
  );
}

/**
 * 修正了【planC】的一些错误。
 *        1.【planC】考虑的过于理想化。是【从后往前】倒推的形式.
 */
function planD(kInfo: Plan_D_Info) {
  console.log('计划D');
  const duoRes: DuoKong = (function () {
    const finalPrice_duo = kInfo.last;    // 多的最后卖价
    return {
      totalBuyCny : kInfo.investCNY,                    // 先买
      totalSellCny: kInfo.sumHoldVol * finalPrice_duo,  // 后卖
      finalPrice  : finalPrice_duo,
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
  const kongRes: DuoKong = (function () {
    const beginPrice_Kong = kInfo.first;   // 空的一开始买价
    const real_sumHoldVol = kInfo.length * cfg.onceInvestM / kInfo.first;  // 总计【真实】购买数量。

    const predicate_sumHoldVol = kInfo.sumHoldVol;                              // 预计中【计划】购买数量。

    // 购买进程
    const buyProgress = kInfo.KLines.reduce((preObj, curItem) => {
      let buyTimes = preObj.buyTimes;

      if (preObj.remainVol === 0) {      // 已经【提前】买完。

      } else {                           // 仍然可买。
        buyTimes++;
      }

      let onceVol = cfg.onceInvestM / curItem;   // 单次买入量
      let onceCNY = cfg.onceInvestM;             // 单次买入的CNY价值

      if (preObj.remainVol < onceVol) {            // 如果不够买【一整次】。
        if (preObj.remainVol > 0) {                                                                   // 减少日志次数
          console.log('数量已不足以，买一整次', '剩余数量', preObj.remainVol, '想要采购数量', onceVol);
        }
        onceVol = preObj.remainVol;
        onceCNY = onceVol * curItem;
      }

      return {
        remainVol : preObj.remainVol - onceVol,  // 合约张数变少
        buyCNY_sum: preObj.buyCNY_sum + onceCNY,                       // 买入上已花的CNY
        // buyTimes  : preObj.buyTimes,    // 这里用【自加】好像不太好？所以拆开用【+1】。
        buyTimes,
      };
    }, {
      remainVol : real_sumHoldVol,
      buyCNY_sum: 0,
      buyTimes  : 0,
    });

    console.log(`空仓，分${buyProgress.buyTimes}次，全买完`);

    if (buyProgress.remainVol > 0) {
      console.error(`经历过${kInfo.length}天后，仍未买完，剩余`, `合约数：${buyProgress.remainVol}。`, `以最终价计，钱数：${-1 * buyProgress.remainVol * kInfo.last}`);
    }

    return {
      totalSellCny: kInfo.investCNY,                    // 先卖。卖出的份额，是一定的。
      totalBuyCny : buyProgress.buyCNY_sum,  // 后买
      finalPrice  : beginPrice_Kong,
    };
  })();

  // 投入成本
  const cost      = {
    多: duoRes.totalBuyCny,
    空: kongRes.totalSellCny,
  };
  // 所得收益
  const bonus     = {
    多: duoRes.totalSellCny - duoRes.totalBuyCny,
    空: kongRes.totalSellCny - kongRes.totalBuyCny,
  };
  //
  const earnRatio = {
    多: bonus.多 / cost.多,
    空: bonus.空 / cost.空,
    总: (bonus.多 + bonus.空) / (cost.多 + cost.空),
  };
  console.log(
    // [
    // JSON.stringify(
    {
      '长度'      : kInfo.length,
      '平均价'     : kInfo.avgPrice,
      '起始价'     : kInfo.first,
      '最终价'     : kInfo.last,
      '最高价'     : kInfo.max,
      '最低价'     : kInfo.min,
      '合计持币数'   : kInfo.sumHoldVol,
      '购买平均成本'  : kInfo.perCoinCnyCost,
      '最后处理价格'  : {
        多: duoRes.finalPrice,
        空: kongRes.finalPrice,
      },
      '投入成本'    : cost,
      '回归结果（盈利）': bonus,
      '收益比'     : earnRatio,
    },
    // null, 2)
    // ]
  );
}

go();
