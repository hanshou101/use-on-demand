declare namespace KlineApiNS {

  export type Recv = Array<IData>

  interface IData {
    low: string;
    high: string;
    open: string;
    close: string;
    'last_px': string;
    'avg_px': string;
    qty: string;
    timestamp: number;
    'change_rate': string;
    'change_value': string;
    'base_coin_qty': string;
    'quote_coin_qty': string;
  }

}
