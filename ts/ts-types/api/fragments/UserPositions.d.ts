// import {PositionErrNo, PositionType_QuanOrZhu, SimplePosit_DuoKongSide} from '~/assets/js/_enum/ApiEnum';
import Vue  from 'vue'

declare global {
  namespace UserPositionsApiNS {

    export interface Recv {
      positions: IPosition[];
    }


    interface IPosition {
      pid: number;    // 仓位ID
      uid: number;
      'company_id': number;
      'instrument_id': number;
      'cur_qty': string;
      'freeze_qty': string;
      'close_qty': string;
      'avg_cost_px': string;
      'avg_open_px': string;
      'avg_close_px': string;
      oim: string;            // 原始的【开仓保证金】
      im: string;             // 开仓保证金
      mm: string;             // 维持保证金
      'realised_pnl': string;
      earnings: string;
      tax: string;            // 持仓产生的资金费用
      // 'position_type': PositionType_QuanOrZhu;
      // side: SimplePosit_DuoKongSide;
      status: number;
      // errno: PositionErrNo;
      'created_at': string;
      'updated_at': string;
    }

  }
}
