import {PositionType_QuanOrZhu, SimplePosit_DuoKongSide} from '~/assets/js/_enum/ApiEnum';

declare global {

  namespace HttpApiNS {
     interface Bean<T> {
      /**
       * 1.  Swap合约的api，采用  errno + message
       * 2.  币币的api，采用 errcode + errmsg
       */
      'errno': 'OK' | 'FORBIDDEN' | 'BAD_REQUEST' | string;
      'message': 'Success' | string;
      'data': T;
    }

    // TIP——————————————————Ssr端
    type Instruments = Bean<InstrumentsApiNS.Recv>

    // TIP——————————————————客户端
    type Indexes = Bean<Array<IndexesApiNS.Recv>>

    type Tickers = Bean<TickersApiNS.Recv>

    type Depth = Bean<DepthApiNS.Recv>

    type Pnl = Bean<PnlApiNS.Recv>

    type Trades = Bean<TradesApiNS.Recv>

    type Accounts = Bean<AccountsApiNS.Recv>

    type UserPositions = Bean<UserPositionsApiNS.Recv>

    type UserOrders = Bean<UserOrdersApiNS.Recv>

    type Kline = Bean<KlineApiNS.Recv>

    type SubmitOrder = Bean<SubmitOrderApiNS.Recv>

    type UserPlanOrders = Bean<UserPlanOrdersApiNS.Recv>

    type GlobalLeverage = Bean<GlobalLeverageApiNS.Recv>

    // cancelOrders

    // userTrades

    // userLiqRecords

    // orderTrades

    // transferFunds

    // changeMargin

    // fundingrate

    // createAccount

    // riskReserves

    // activity/openAccountReward

    // activity/depositReward

    // rebates

    // submitPlanOrder

    // cancelPlanOrders


    // queryOrder

    // ifglobal/coinBrief

    // positionTax

    // task/complete

    // task/check

    // task/complete

    // calculate

  }


  namespace PositionNS {
    type Ask = [number, string, string, number]
    type Bid = [number, string, string, number]
  }

// 对应【LongOrShort_BooleanEnum】的两个值
  type LongOrShort_BooleanType =  /*typeof LongOrShort_BooleanEnum.Long*/true
    | /*typeof LongOrShort_BooleanEnum.Short*/false

  interface FunnyTrade extends TickersApiNS.ITickerItem {
    // instrument_id: string | number;
    // fair_px: string;
    // loss: number;
    // cur_qty: number;
    // avg_cost_px: number;
    // side: number;
    // im: string;
    // position_type: number;
    // pid: string;

    // 新增部分字段
    fair_price: string | number;
  }


  interface AccountsType {
    available_vol: string | null;
    coin_code: string;
  }


  interface PendingOrderType {
    pid: string;    // 仓位ID
    oid: string;
    instrument_id: number;
    status: 1 | 2 | 3 | 4;

    // oid: number;
    // 'instrument_id': number;
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
    'finished_at': void /* 未知类型 */
    ;
    // status: number;
    errno: number;
    'position_type'?: PositionType_QuanOrZhu;        // WARN 1-逐仓  ； 2-全仓
    'time_in_force': number;
    imr: string;
    mmr: string;
    mfr: string;
    tfr: string;
    leverage: string;
    'freeze_assets': string;
    //
    'company_id'?: number;
  }

// TIP——————————————————————————————————————————————————

  interface ProductInfoType extends InstrumentsApiNS.IInstrument {

    instrument_id: number;

    contract: IndexedObj;

    liquidation_warn_ratio:unknown;     // ？？？

    // 也许存在，也许不存在
    price_coin?: string;

  }

// TIP——————————————————————————————————————————————————

  interface PositionListItem {
    pid: number;    // 仓位ID
    uid: number;
    'company_id': number;
    'instrument_id': number | string;
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
    'position_type': PositionType_QuanOrZhu;        // WARN 1-逐仓  ； 2-全仓
    side: SimplePosit_DuoKongSide;
    status: number;
    errno: number;
    'created_at': string;
    'updated_at': string;
    //
    'avg_fixed_leverage'?: string;
    'fixed_leverage'?: string;
  }

// TIP 仅仅是本地的增强。
  interface PositionListItem_LocalIncrease {
    loss?: number;
    [Symbol.iterator]?: Iterator<any>;    // ？？？？？？？？
  }

  type Combined_PositionListItem = PositionListItem & PositionListItem_LocalIncrease

// interface Changed_CabinType {
//
// }

// TIP——————————————————————————————————————————————————

  interface UserInfoType {
    account_type: number,
    phone: number,
    status: number,
    user_assets: Array<{
      available_vol: string;
      coin_code: string;
    }>;
  }

// TIP——————————————————————————————————————————————————


  namespace WsBean {
    namespace UserProperty_UserMessageDispose {
      type C_Assets = {
        coin_code: string;
      };
      type S_Assets = {
        coin_code: string;
      }
      type BeanList = Array<{
        c_assets?: C_Assets;
        s_assets?: S_Assets;
        order?: PendingOrderType;
        position?: PositionListItem;
      }>
    }
  }

}
