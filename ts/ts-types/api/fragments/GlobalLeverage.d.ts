import {PositionType_QuanOrZhu, SubmitOrderSide} from '~/assets/js/_enum/ApiEnum';

declare global {
  namespace GlobalLeverageApiNS {
    type Recv = Array<Common_RecvItem>

    interface Common_RecvItem {
      account_id: number;
      config_key: string;
      config_value: string;
      data_type: string;
      //
      created_at: string;
      updated_at: string;
      //
      side?: SubmitOrderSide;
      position_type?: PositionType_QuanOrZhu;
    }

    interface SetLever_Req {
      instrument_id: number,
      leverage: number,
      nonce: number,
      //
      side?: SubmitOrderSide;
      position_type?: PositionType_QuanOrZhu,
    }

    interface GetLever_Req {
      instrumentID: number
    }

  }
}
