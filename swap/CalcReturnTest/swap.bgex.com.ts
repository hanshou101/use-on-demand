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
  const data = bitmex.getBitmexData();
  // const data: Array<number> = mock.pingjunData();

  planA(new Plan_A_Info(data), false);
  console.log('————————————————————————');
  planB(new Plan_B_Info(data));
}

function planA(kInfo: Plan_A_Info, useLastPrice = true) {
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
      '长度'          : kInfo.length,
      '平均价'         : kInfo.avgPrice,
      '起始价'         : kInfo.first,
      '最终价'         : kInfo.last,
      '最高价'         : kInfo.max,
      '最低价'         : kInfo.min,
      '每日购买，合计张（币）数': kInfo.sumHoldVol,
      '购买平均成本'      : kInfo.perCoinCnyCost,
      '卖出价格'        : sellPx,
      '投入成本'        : kInfo.investCNY,
      '回归结果'        : CNY_Result,
      '收益比'         : CNY_Result / kInfo.investCNY,
    },
    // ]
  );

}


function planB(kInfo: Plan_B_Info) {
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
      '长度'          : kInfo.length,
      '平均价'         : kInfo.avgPrice,
      '起始价'         : kInfo.first,
      '最终价'         : kInfo.last,
      '最高价'         : kInfo.max,
      '最低价'         : kInfo.min,
      '每日购买，合计:（币）数': kInfo.sumHoldVol,
      '购买平均成本'      : kInfo.perCoinCnyCost,
      '最后处理价格'      : {
        多: duoRes.finalPrice,
        空: kongRes.finalPrice,
      },
      '投入成本'        : cost,
      '回归结果'        : bonus,
      '收益比'         : earnRatio,
    },
    // null, 2)
    // ]
  );

}

/**
 * 准备，用【零仓开买】和【满仓开卖】，来执行。
 */
function planC() {
  // const duoResult = {
  //   totalBuy : investDuoMoney,
  //   totalSell: intervalOpenDuo_sumVolume /*/ cfg.zhangPerCoin */ * last,
  // };
  //
  // const kongResult = {
  //   totalBuy : intervalOpenKong_sumVolume * last,
  //   totalSell: investKongMoney,
  // };
  //
  // /**
  //  * 先买，后卖
  //  */
  // const intervalOpenDuo_sumVolume = data.reduce((preObj, close) => {
  //   return preObj + cfg.onceInvestM / close /**  cfg.zhangPerCoin */;
  // }, 0);
  //
  // /**
  //  * 先卖，后买
  //  */
  // const intervalOpenKong_sumVolume = data.reduce((preObj, close) => {
  //   return preObj + cfg.onceInvestM / close /**  cfg.zhangPerCoin */;
  // }, 0);
  //
  // const investDuoMoney = cfg.onceInvestM * length;
  //
  // const investKongMoney = cfg.onceInvestM * length;
  //
  // const avgCost = investDuoMoney / intervalOpenDuo_sumVolume;
  //
  // // const returnMoney = {
  // //   // 多仓，采用最后价格，估值
  // //   duo : intervalOpenDuo_sumVolume /*/ cfg.zhangPerCoin */ * last,
  // //   // 空仓，采用？？？？？？？？？？？？？？？（此处，应该是【分开卖】，统一买，才对。？？？？？？？？？？？需要修正一下。）
  // //   kong: intervalOpenDuo_sumVolume /*/ cfg.zhangPerCoin */ * first,
  // // };
  //
  // console.log(
  //   // [
  //   '长度', length,
  //   '平均价', avgPrice,
  //   '起始价', first,
  //   '最终价', last,
  //   '最高价', max,
  //   '最低价', min,
  //   '每日购买，合计张（币）数', intervalOpenDuo_sumVolume,
  //   '购买平均成本', avgCost,
  //   '卖出价格', cfg.sellPx,
  //   '投入成本（多+空）', investDuoMoney * 2,
  //   '回归结果', {多: duoResult, 空: kongResult},
  //   '收益比（多+空）', (duoResult.totalSell + kongResult.totalSell) / (duoResult.totalBuy + kongResult.totalBuy),
  //   // ]
  // );
}

go();
