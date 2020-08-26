declare namespace InstrumentsApiNS {

  export interface Recv {
    instruments: IInstrument[];
  }


  interface IInstrument {
    'instrument_id': number;
    'index_id': number;
    symbol: string;
    'name_zh': string;
    'name_en': string;
    'base_coin': string;
    'quote_coin': string;
    'margin_coin': string;
    'is_reverse': boolean;
    'market_name': string;
    'face_value': string;
    'begin_at': string;
    'settle_at': string;
    'settlement_interval': number;
    'min_leverage': string;
    'max_leverage': string;
    'px_unit': string;
    'qty_unit': string;
    'value_unit': string;
    'min_qty': string;
    'max_qty': string;
    'position_type': number;
    'underweight_type': number;
    status: number;
    area: number;
    'created_at': string;
    'depth_round': string;
    'max_funding_rate': string;
    'min_funding_rate': string;
    'risk_limit_base': string;
    'risk_limit_step': string;
    mmr: string;
    imr: string;
    'maker_fee_ratio': string;
    'taker_fee_ratio': string;
    'settle_fee_ratio': string;
    'plan_order_price_min_scope': string;
    'plan_order_price_max_scope': string;
    'plan_order_max_count': number;
    'plan_order_min_life_cycle': number;
    'plan_order_max_life_cycle': number;
  }
}
