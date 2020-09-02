// import {WebSocketContainer} from '~/assets/js/websocket/webSocket';
import Vue from 'vue';

declare global {
  /**
   *  实例类型
   *    0.参考资料：[Typescript之获取函数返回值类型 - 知乎](https://zhuanlan.zhihu.com/p/59434318)
   */
  // type WebSocketType = ReturnType<typeof WebSocketContainer>;
  // type WebSocketType = WebSocketContainer;

  namespace WS_SucFn {
    // ws订阅，OrderBook
    interface OrderBookResult {
      action: number;
      data?: DepthApiNS.Recv;
    }

    // ws订阅，Trade
    interface TradeResult {
      group: string;
      action: number;
      data: Array<{
        tid: number;
        oid: number;
        'instrument_id': number;
        px: string;
        qty: string;
        'make_fee': string;
        'take_fee': string;
        'created_at': string;
        side: number;
        change: string;
      }>;
    }

    // ws订阅，Pnl
    interface PnlResult {
      group: string;
      action: number;
      data: {
        'instrument_id': number;
        'long_pnls': Array<PnlResult_Item>;
        'short_pnls': Array<PnlResult_Item>;
      };
    }
    interface PnlResult_Item {
      'min_pnl': string;
      'max_pnl': string;
      'quan_tile': number;
    }

    // ws订阅，CloudAccess
    interface CloudAccessResult {
      // action: string;
      // success: boolean;
      // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？似乎没抓到正确的包？？？？？？？？？？？？？？？？？？
    }

    // ws订阅，UserProperty
    interface UserPropertyResult {
      group: string;
      data: Array<{
        action: number;
        order: PendingOrderType;
        position: PositionListItem;
      }>;
    }

    // ws订阅，Ticker
    interface TickerResult {
      group: string;
      action: number;
      data: {
        'avg_px': string;
        'last_qty': string;
        timestamp: number;
        'qty_day': string;
        symbol: string;
        'instrument_id': number;
        'position_size': string;
        'quote_coin_qty': string;
        pps: string;
      };
    }

  }

  namespace WS_Temp_NS {
    type SuccessFn_Type = {
      [key in string]: Function;
    };
    type ErrorCB_Type = {
      [key in string]: Function;
    };
    type CmdTime_Type = {
      [key in string]?: number;
    };

    type OriginWsMsg = {
      data: Blob | string;
    }
  }

}

