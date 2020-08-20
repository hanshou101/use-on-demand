export enum SolidSide {
  Buy  = '买单',
  Sell = '卖单',
}

export enum FutureSide {
  Long  = '多仓',
  Short = '空仓',
}

export class KLine_Indexes_Class implements KLine_Indexes {

  public index: {
    firstK: number;
    lastK: number;
    highestK: number;
    lowestK: number;
    kLen: number;
    avgPerK: number
  };


  constructor(public raw: Array<KLineItem>) {
    const len       = raw.length;
    // 克隆数组，并排序。（不改变原有数组的顺序）
    const sortedRaw = [...raw].sort((new1, old1) => (new1 - old1));
    this.index      = {
      firstK  : raw[0],
      lastK   : raw[len - 1],
      highestK: sortedRaw[0],
      lowestK : sortedRaw[len - 1],
      kLen    : len,
      avgPerK : raw.reduce((preObj, k) => (preObj + k), 0) / len,
    };
  }


  public print() {
    console.log(this.index);
  }

  /**
   * 一个【大K线数组】，平均拆分为，若干个【小K线数组】。
   */
  public split(part: number): Array<KLine_Indexes> {
    const len      = this.raw.length;
    const size     = parseInt(len / part);    // 每个块的大小
    const splitArr = [];
    for (let i = 0; i < len; i += size) {
      splitArr.push(
        new KLine_Indexes_Class(
          this.raw.slice(i, i + size),         // 添加【被分割的数组】
        ),
      );
    }
    return splitArr;
  }

  /**
   * 采用【平方】的方式，来拆分【大K线数组】
   *        1.比如，原本为16长度，将拆分为，4个4长度的。
   */
  public splitSquare(): Array<KLine_Indexes> {
    const len  = this.raw.length;
    const part = parseInt(Math.pow(len, 1 / 2));    // 开平方
    return this.split(part);
  }


}

class ActionSummary_Class implements Trade.ActionSummary {
  constructor(
    public actionQueue: Array<Trade.Action>,
    public holdingVol: number,
  ) {
  }

  public getSummary(): Trade.SummaryInAction_Type {
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

export class CnyManager_Class implements CnyManager {
  public perTimeCny      = 5000;
  public static instance = new CnyManager_Class();
}

abstract class Base_ActionQueue_Class<S extends FutureSide> implements Trade.ActionQueue<S> {
  public abstract getBuyQueue(): Trade.ActionSummary;       // 抽象
  public abstract getSellQueue(): Trade.ActionSummary;      // 抽象
  // public abstract settleBoth(): Trade.Settle;               // 抽象

  /**
   * 【买入Action】和【卖出Action】，的组合数组。
   *        1.此处，没有做【汇总逻辑】。交给【Settle】环节去做。
   */
  get pureFullQueue(): Array<Trade.Action> {
    return [
      ...this.getBuyQueue().actionQueue,
      ...this.getSellQueue().actionQueue,
    ];
  }

  constructor(
    public kIndexes: KLine_Indexes,
    public cnyManager: CnyManager,
  ) {

  }


  public print(): void {
    console.log({
      '买入Action结算': this.settleBuy(),
      '卖出Action结算': this.settleSell(),
      '两者总结算'     : this.settleBoth(),
    });
  }

  public settleBuy(): Omit<Trade.Settle, 'cny_inSell'> {
    return {
      settlePieces: this.getBuyQueue().getSummary().queueVol,       // 相关张数
      cny_inBuy   : this.getBuyQueue().getSummary().queueCny,       // 买入人民币
      leftPieces  : this.getBuyQueue().getSummary().leftVol,        // 多仓，残留必定为【0】。空仓，则可能非0.
    };
  }

  public settleSell(): Omit<Trade.Settle, 'cny_inBuy'> {
    return {
      settlePieces: this.getSellQueue().getSummary().queueVol,      // 相关张数
      cny_inSell  : this.getSellQueue().getSummary().queueCny,      // 卖出人民币
      leftPieces  : this.getSellQueue().getSummary().leftVol,       // 多仓、空仓，残留必定为【0】。
    };
  }

  public settleBoth(): Trade.Settle {
    const {
            cny_inBuy,
            settlePieces: buy_settlePieces,
            leftPieces  : buy_leftPieces,
          } = this.settleBuy();
    const {
            cny_inSell,
            settlePieces: sell_settlePieces,
            leftPieces  : sell_leftPieces,
          } = this.settleSell();

    if (
      (buy_settlePieces + buy_leftPieces).toFixed(4)                  // 可能略微有误差
      !== (sell_settlePieces + sell_leftPieces).toFixed(4)            // 可能略微有误差
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
      leftPieces  : buy_leftPieces,
    };
  }

}

export class Long_ActionQueue_Class extends Base_ActionQueue_Class<FutureSide.Long> {

  /**
   * 【多仓】买入操作：
   *        1.分多批买入
   */
  public getBuyQueue(): Trade.ActionSummary {
    // Action队列
    const actionQueue = this.kIndexes.raw.map((k) => {
      return {
        actionCny: this.cnyManager.perTimeCny,
        fVol     : this.cnyManager.perTimeCny / k,
        price    : k,
        solidSide: SolidSide.Buy,
      };
    });
    return new ActionSummary_Class(actionQueue, 0);
  }

  /**
   * 【多仓】卖出操作：
   *        1.最后一日，一次性卖出。
   */
  public getSellQueue(): Trade.ActionSummary {
    const fVol        = this.getBuyQueue().getSummary().queueVol;
    const price       = this.kIndexes.index.lastK;
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


export class Short_ActionQueue_Class extends Base_ActionQueue_Class <FutureSide.Short> {

  /**
   * 【空仓】买入操作：
   *        1.分多批买入
   */
  public getBuyQueue(): Trade.ActionSummary {
    let holdingVol = this.getSellQueue().getSummary().queueVol;         // 当前持有量

    // Action队列
    const actionQueue = this.kIndexes.raw.map((k) => {

      const targetVol = this.cnyManager.perTimeCny / k;

      if (holdingVol > targetVol) {                     // TIP 买下【全部目标值】
        const action = {
          actionCny: this.cnyManager.perTimeCny,
          fVol     : this.cnyManager.perTimeCny / k,
          price    : k,
          solidSide: SolidSide.Buy,
        };
        holdingVol -= action.fVol;      // 【持有量】变少
        return action;
      } else if (holdingVol > 0) {                      // TIP 买下【部分目标值】
        const partVol = holdingVol;     // 买下【当前所有持有量】
        const action  = {
          actionCny: partVol * k,       // 部分Cny
          fVol     : partVol,           // 部分量
          price    : k,
          solidSide: SolidSide.Buy,
        };
        holdingVol -= action.fVol;      // 【持有量】变少
        return action;
      } else {                                          // TIP 【什么都不能买】
        if (holdingVol !== 0) {
          throw new Error('程序出错了，此处【当前持有量】必为0');
        }
        const action = {
          actionCny: 0,
          fVol     : 0,
          price    : k,
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
  public getSellQueue(): Trade.ActionSummary {
    const actionCny   = this.cnyManager.perTimeCny * this.kIndexes.index.kLen;
    const price       = this.kIndexes.index.firstK;
    // Action队列
    const actionQueue = [
      {
        actionCny,       // 一次性卖出，预定金额
        fVol     : actionCny / price,
        price,
        solidSide: SolidSide.Sell,
      },
    ];
    return new ActionSummary_Class(actionQueue, 0);
  }

}
