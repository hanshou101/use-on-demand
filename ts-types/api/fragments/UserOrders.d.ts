import {OrderRecord_ErrNo, PositionType_QuanOrZhu} from '~/assets/js/_enum/ApiEnum';


declare global {

  namespace UserOrdersApiNS {

    export interface Recv {
      orders: IOrder[];
    }


    interface IOrder {
      oid: number;
      'instrument_id': number;
      uid: number;
      px: string;
      qty: string;
      'hide_qty': string;
      'avg_px': string;
      'cum_qty': string;
      side: number;
      category: number;
      'make_fee': string;
      'take_fee': string;
      origin: string;
      'created_at': string;
      'updated_at': string;
      'finished_at': void;/* 未知类型 */
      status: number;
      errno: OrderRecord_ErrNo;
      'position_type': PositionType_QuanOrZhu;        // WARN 1-逐仓  ； 2-全仓
      'time_in_force': number;
      imr: string;
      mmr: string;
      mfr: string;
      tfr: string;
      leverage: string;
      'freeze_assets': string;
    }
  }

}
