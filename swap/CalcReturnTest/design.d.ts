// K线系统、K线指标、K线切分

// 投资策略（买入过程、买入结算、卖出过程、卖出结算）
//          1.此处，其实可以，将【所有操作】都整为一个列表。
//          2.策略————————确定行为————————行为，带来结果        （如此，之间界线更为，清晰 明了 了。）

// 收益核算（可附加多种指标）

// 输出显示


//

// 转化为Excel

// 风险预估？

// 多组数据，同时运行？（将显示结果组合？）


// 投资过程拆分展现？（便于细化分析？）

//

// 将来更为复杂的，可能要换用【python】了。  【数据处理】和【可视化绘制】

/*
    declare enum SolidSide {
      Buy  = '买单',
      Sell = '卖单',
    }

    declare enum FutureSide {
      Long  = '多仓',
      Short = '空仓',
    }
*/


import {FutureSide, SolidSide} from './DesignHelper';

declare global {


  type KLineItem = number;

  interface KLine_Indexes {
    raw: Array<KLineItem>;

    index: {
      firstK: number;
      lastK: number;
      highestK: number;
      lowestK: number;

      kLen: number;
      avgPerK: number;
    };

    // K线切分
    split(part: number): Array<KLine_Indexes>;

    // K线切分，转为【平方数法则】
    splitSquare(): Array<KLine_Indexes>;


    print(): void;

  }

  interface CnyManager {
    perTimeCny: number;
  }

  namespace Trade {
    interface Action {
      actionCny: number;
      fVol: number;
      price: number;
      solidSide: SolidSide;
    }

    interface SummaryInAction_Type {
      queueVol: number;
      queueCny: number;
      leftVol: number;
    }

    interface ActionSummary {
      actionQueue: Array<Trade.Action>;

      getSummary(): SummaryInAction_Type;
    }

    interface Settle {
      cny_inBuy?: number;
      cny_inSell?: number;

      // 处理张数
      settlePieces: number;
      // 遗留张数
      leftPieces: number;
    }

    interface ActionQueue<S extends FutureSide> {
      kIndexes: KLine_Indexes;
      pureFullQueue: Array<Action>;

      getBuyQueue(): Trade.ActionSummary;

      getSellQueue(): Trade.ActionSummary;

      settleBuy(): Settle;

      settleSell(): Settle;

      settleBoth(): Settle;

      print(): void;

    }
  }

  namespace Bonus {
    interface SolidPart {
      actionTimes: number;
      fVol: number;
      cny_inSolid: number;
      fAvgPrice: number;
    }

    interface Bonus<S extends FutureSide> {
      buy: SolidPart;
      sell: SolidPart;

      getBonus(): {
        cnyBefore: number;
        cnyChange: number;
        cnyAfter: number;
        ratio: number;
      };

      print(): string;
    }
  }

  namespace Excel {
    interface Data<S extends FutureSide> {
      actionQueue: Trade.ActionQueue<S>;
      bonus: Bonus.Bonus<S>;
    }

    interface Exporter {
      kLines: KLine_Indexes;
      long: Data<FutureSide.Long>;
      short: Data<FutureSide.Short>;

      //
      export(): void;
    }
  }

}
