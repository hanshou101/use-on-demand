import * as bitmex from './data/bitmex';
import * as bgex   from './data/bgex';
import * as mock   from './data/mock';

const cfg = {
  investMoney  : 5000,
  // zhangPerCoin: 10000,
  sellPx       : 0,
  // optimizeRatio: 1 / 2,         // 优化参数（0——1）
  // optimizeRatio: 1 / 3,         // 优化参数（0——1）
  optimizeRatio: 0,         // 优化参数（0——1）
};

function go() {
  // const data: Array<number> = bgex.getBgData();
  const data: Array<number> = bitmex.getBitmexData();
  // const data: Array<number> = mock.pingjunData();
  const length              = data.length;

  let first = data[0];
  let last  = data[length - 1];

  let max        = Number.MIN_SAFE_INTEGER;
  let min        = Number.MAX_SAFE_INTEGER;
  // 计算平均价。
  const avgPrice = data.reduce((preObj, _close) => {
    if (!_close) {
      throw new Error('数据有问题');
    }
    max = _close > max ? _close : max;
    min = _close < min ? _close : min;
    return preObj + _close;
  }, 0) / length;


  /**
   * 先买，后卖
   */
  const intervalOpenDuo_sumVolume = data.reduce((preObj, close) => {
    return preObj + cfg.investMoney / close /**  cfg.zhangPerCoin */;
  }, 0);

  /**
   * 先卖，后买
   */
  const intervalOpenKong_sumVolume = data.reduce((preObj, close) => {
    return preObj + cfg.investMoney / close /**  cfg.zhangPerCoin */;
  }, 0);

  const investDuoMoney = cfg.investMoney * length;

  const investKongMoney = cfg.investMoney * length;

  const avgCost = investDuoMoney / intervalOpenDuo_sumVolume;

  // cfg.sellPx = avgPrice;   // 均价
  // cfg.sellPx = max;        // 最高价
  // cfg.sellPx = min;        // 最低价

  // cfg.sellPx = avgPrice + (max - avgPrice) * cfg.optimizeRatio;    // 较优价。
  // cfg.sellPx        = first;

  // WARN 第一版，采用平均价格，来进行估值。
  // const returnMoney = intervalBuy_sumVolume /*/ cfg.zhangPerCoin */ * cfg.sellPx;

  // const returnMoney = {
  //   // 多仓，采用最后价格，估值
  //   duo : intervalOpenDuo_sumVolume /*/ cfg.zhangPerCoin */ * last,
  //   // 空仓，采用？？？？？？？？？？？？？？？（此处，应该是【分开卖】，统一买，才对。？？？？？？？？？？？需要修正一下。）
  //   kong: intervalOpenDuo_sumVolume /*/ cfg.zhangPerCoin */ * first,
  // };

  const duoResult = {
    totalBuy : investDuoMoney,
    totalSell: intervalOpenDuo_sumVolume /*/ cfg.zhangPerCoin */ * last,
  };

  const kongResult = {
    totalBuy : intervalOpenKong_sumVolume * last,
    totalSell: investKongMoney,
  };

  console.log(
    // [
    '长度', length,
    '平均价', avgPrice,
    '起始价', first,
    '最终价', last,
    '最高价', max,
    '最低价', min,
    '每日购买，合计张（币）数', intervalOpenDuo_sumVolume,
    '购买平均成本', avgCost,
    '卖出价格', cfg.sellPx,
    '投入成本（多+空）', investDuoMoney * 2,
    '回归结果', {'多': duoResult, '空': kongResult,},
    '收益比（多+空）', (duoResult.totalSell + kongResult.totalSell) / (duoResult.totalBuy + kongResult.totalBuy),
    // ]
  );
}

go();
