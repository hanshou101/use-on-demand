import {PlanOrder_TriggerCycle, PlanOrder_TriggerPrice_Type, PositionType_QuanOrZhu, SubmitOrderSide} from '~/assets/js/_enum/ApiEnum';

declare global {

  namespace SubmitPlanOrderApiNS {

    export interface SubmitPlanOrderMain {

    }

    interface ReqBean {
      nonce: number;
      'instrument_id': number;        // 合约对ID
      category: number;
      leverage: string;               // 杠杆倍数
      'trigger_type': PlanOrder_TriggerPrice_Type;      // 触发价格的类型
      trend: number;
      'exec_px': string;              // 执行价格
      px: string;                     // 触发价格（计划触发）
      qty: string;                    // 数量
      cycle: PlanOrder_TriggerCycle;  // 计划有效时间
      side: SubmitOrderSide;
      'position_type': PositionType_QuanOrZhu;  // 仓位类型
    }

  }

}
