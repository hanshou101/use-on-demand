declare namespace WsComm {
  namespace PNL {
    // TIP 通过SimpleCmd.Send，来发起订阅
    // type Send = SimpleCmd.Send;   // 和那个相同
    interface Recv {
      group: string; // PNL:xx
      action: number;
      data: IData;
    }

    interface IData {
      instrument_id: number;
      long_pnls: Array<IPnl>;
      short_pnls: Array<IPnl>;
    }

    interface IPnl {
      'min_pnl': string;
      'max_pnl': string;
      'quan_tile': number;
    }
  }
}
