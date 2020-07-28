declare namespace PnlApiNS {

  export interface Recv {
    pnls: IPnl[];
  }


  interface IPnl {
    'instrument_id': number;
    'long_pnls': ILong_pnl[];
    'short_pnls': IShort_pnl[];
  }


  interface IShort_pnl {
    'min_pnl': string;
    'max_pnl': string;
    'quan_tile': number;
  }


  interface ILong_pnl {
    'min_pnl': string;
    'max_pnl': string;
    'quan_tile': number;
  }
}
