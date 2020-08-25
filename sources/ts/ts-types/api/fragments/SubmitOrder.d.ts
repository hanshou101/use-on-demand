// import {PositionType_QuanOrZhu, SubmitOrderSide} from '~/assets/js/_enum/ApiEnum';

import Vue from 'sources/vue';

declare global {

  namespace SubmitOrderApiNS {
    export interface Recv {
      oid: number;
    }


    export interface OpenReqBean {
      nonce: number;
      'instrument_id': number;        // 合约对ID
      // side: SubmitOrderSide;
      category: number;
      qty: string;
      //
      leverage: number;               // 杠杆倍数
      // 'position_type': PositionType_QuanOrZhu;  // 仓位类型

      // WARN 该值，在市价委托，不存在；仅在【限价委托】存在
      px?: string | undefined;                    // 开仓价格（有，则是限价；没有，则是市价）
    }

    export interface CloseReqBean {
      nonce: number;
      'instrument_id': number;
      // side: SubmitOrderSide;
      category: number;
      qty: number;
      //
      pid: number;    // 仓位ID

      // WARN 该值，在市价委托，不存在；仅在【限价委托】存在
      px?: string | undefined;                    // 开仓价格（有，则是限价；没有，则是市价）
    }

  }

}
