// import {PlanOrder_ErrNo, PlanOrder_TypeField, PositionType_QuanOrZhu} from '~/assets/js/_enum/ApiEnum';

import Vue from 'vue';

declare global {

  namespace UserPlanOrdersApiNS {
    export interface Recv {
      orders: IOrder[];
    }

    interface IOrder {
      oid: number;
      'instrument_id': number;
      uid: number;
      'company_id': number;
      px: string;
      'exec_px': string;
      qty: string;
      side: number;
      'trigger_type': number;
      trend: number;
      category: number;
      cycle: number;
      // 'position_type': PositionType_QuanOrZhu;        // WARN 1-逐仓  ； 2-全仓
      leverage: string;
      origin: string;
      'created_at': string;
      'finished_at': void; /* 未知类型 */
      status: number;
      // errno: PlanOrder_ErrNo;
      // type: PlanOrder_TypeField;
    }
  }

}
