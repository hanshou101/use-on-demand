declare namespace TickersApiNS {

  interface Recv {
    tickers: ITickerItem[];
  }


  interface ITickerItem {
    'last_px': string;
    open: string;
    close: string;
    low: string;
    high: string;
    'avg_px': string;
    'last_qty': string;
    qty24: string;
    timestamp: number;
    'change_rate': string;
    'change_value': string;
    'qty_day': string;
    amount24: string;
    'instrument_id': number;
    'position_size': string;
    'base_coin_qty': string;
    'quote_coin_qty': string;
    'index_px': string;
    'fair_px': string;
    'depth_px': IDepth_px;
    'fair_basis': string;
    'fair_value': string;
    madb: string;
    rate: IRate;
    'premium_index': string;
    'funding_rate': string;
    'next_funding_at': string;
  }


  interface IRate {
    'quote_rate': string;
    'base_rate': string;
    'interest_rate': string;
  }


  interface IDepth_px {
    'bid_px': string;
    'ask_px': string;
    'mid_px': string;
  }
}
