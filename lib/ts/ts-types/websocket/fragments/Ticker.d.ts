declare namespace WsComm {
  namespace Ticker {
    // TIP 通过SimpleCmd.Send，来发起订阅
    // type Send = SimpleCmd.Send;   // 和那个相同
    interface Recv {
      group: string;  // Ticker:xx
      action: number;
      data: IData;
    }

    interface IData {
      'last_px': string;
      close: string;
      'avg_px': string;
      'last_qty': string;
      timestamp: number;
      'change_rate': string;
      'change_value': string;
      'qty_day': string;
      symbol: string;
      'instrument_id': number;
      'position_size': string;
      'quote_coin_qty': string;
      pps: string;
    }
  }
}
