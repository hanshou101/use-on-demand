declare namespace TradesApiNS {

  export interface Recv {
    trades: ITrad[];
  }


  interface ITrad {
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
  }

}
