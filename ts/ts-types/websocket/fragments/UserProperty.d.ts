import {Ws_UserProperty_E} from '~/assets/js/websocket/WsEnum';

declare global {
  namespace WsComm {
    namespace UserProperty {

      // TIP 通过SimpleCmd.Send，来发起订阅
      // type Send = SimpleCmd.Send;   // 和那个相同
      interface Recv {
        group: 'UserProperty';
        data: Array<{
          action: Ws_UserProperty_E;
          order?: IOrder;
          position?: IPosition;
          c_assets?: I_C_Assets;
          s_assets?: {};
        }>;
      }

      interface IOrder {
        'avg_px': string;
        category: number;
        'company_id': number;
        'created_at': string;
        'cum_qty': string;
        errno: number;
        'finished_at': string;
        'freeze_assets': string;
        'hide_qty': string;
        imr: string;
        'instrument_id': number;
        key: number;
        leverage: string;
        'make_fee': string;
        mfr: string;
        mmr: string;
        oid: number;
        origin: string;
        'position_type': number;
        px: string;
        qty: string;
        side: number;
        status: number;
        'take_fee': string;
        tfr: string;
        'time_in_force': number;
        uid: number;
        'updated_at': string;
      }

      interface IPosition {
        'avg_cost_px': string;
        'avg_open_px': string;
        'close_qty': string;
        'company_id': number;
        'created_at': string;
        'cur_qty': string;
        earnings: string;
        errno: number;
        'freeze_qty': string;
        im: string;
        'instrument_id': number;
        mm: string;
        oim: string;
        pid: number;    // 仓位ID
        'position_type': number;
        'realised_pnl': string;
        side: number;
        status: number;
        tax: string;            // 持仓产生的资金费用
        uid: number;
        'updated_at': string;
      }

      interface I_C_Assets {
        'account_id': number;
        'available_vol': string;
        'bonus_vol': string;
        'cash_vol': string;
        'coin_code': string;
        'company_id': number;
        'created_at': string;
        'earnings_vol': string;
        'freeze_vol': string;
        'margin_vol': string;
        'realised_vol': string;
        'updated_at': string;
      }

    }
  }
}
