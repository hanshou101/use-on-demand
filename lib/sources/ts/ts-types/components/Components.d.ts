import {IPositionLineAdapter} from '../../../tradingview/charting_library/charting_library.min';
import {xX___CAreaTypeE}      from '../../../cookie/store/CEnum';
// import {PositionType_QuanOrZhu} from '~/assets/js/_enum/ApiEnum';
// import {xX___CAreaTypeE}           from '~/assets/js/_enum/CEnum';

declare global {
  interface BgHeaderMixins_NaveData {
    visible: boolean;
    name: any;
    basePath?: string;
    path?: string;
    exactMatch?: boolean;
    clickFn?: () => void; // 会成为<a>标签，并带有点击事件
    noLink?: boolean;
    isHighlight?: boolean; // true-始终高亮
    children?: BgHeaderMixins_NaveData[];
  }

  interface Window {
    position_test(long: any, sort: any): void;
  }

  namespace AlertNS {
    interface Info {
      type: 'success' | 'error';
      title: string;
      message: string;
    }
  }

  namespace CreateSwapAccountNS {
    interface BeginQuestion {
      title: string;
      choices: Array<BeginQuestion_Choice>;
    }

    interface BeginQuestion_Choice {
      content: string;
      correct: boolean;
      checked: boolean;
    }
  }

  namespace DepthCpNS {
    interface BitCfg {
      price: number;
      size: number;
    }

    interface DeepStyleType {
      axisFontColor: string;
      textBoxWidth: number;
      textLineHeight: number;
      dotColor1: string;
      textBoxHeight: number;
      bottom: number;
      spaceY: number;
      spaceX: number;
      axisColor: string;
      textBgColor: string;
      sideSpace: number;
      textFontColor: string;
      right: number;
      dotColor2: string;
      textPaddingLeft: number;
      markLine: number;
      lineWidth: number;
      color1: string;
      color2: string;
      top: number;
      left: number;
      textFont: string;
      radius: number;
      font: string;
    }

    interface RangeType {
      rangeX: number;
      startX: number;
      endY?: number;
    }

    interface DrawParamInfo {
      Ox: number;
      Oy: number;
      x1: number;
      x0: number;
      //
      innerWidth: number;
      numX: number;
      numY: number;
      //
      pxX: number;
      pxY: number;
    }
  }

  namespace PositionNS {


    type PositionEntity_Type = Combined_PositionListItem & {
      money: number;
      fairPxMoney: number; // 用【合理价】算的未实现盈亏
      liquidatePrice: number; // 根据【仓位信息】，计算出，该仓位【强平价格】
      positionValue: number;
      positionValue2: number;
      on_vol: number;
      inital: number;

      open_type?: number; // FIXME 这个值，和【不存在的值-open_type】相关，但实际意思是什么？？？

      //
      trueMargin_RateText: string;   // 实时保证金率，的文字
      maintenance_RateText: string;  // 维持保证金率，的文字
    };

    // type GetLiquidate_Fn = (
    //   side: SimplePosit_DuoKongSide,
    //   position_type: PositionType_QuanOrZhu,
    //   addIM          ?: number,
    //   info_or_firstInfo ?: {          // WARN 此处，之前edit-margin-window.vue文件传递【EditMarginWindow】Vue实例的方式，过于累赘；  传递一个JSON对象进来，更好一点。
    //     liquidatePrice?: number,          // 用作 _Position.ts
    //     firstLiquidatePrice?: number,     // 用作 edit-margin-window.vue
    //   },
    // ) => number

    // WARN 使用这种方式，实时获取【Vue组件内方法】的类型，以保持【随时同步】
    // type PositionCpType = InstanceType<typeof _Position>;
    // type GetLiquidate_Fn = VueInlineCp.PositionCpType['getLiquidate']; // TIP 这种方式，应该是最优方式了
    // @ts-ignore
    type New_0609Version_getLiquidate_Fn = VueInlineCp.PositionCpType['New_0609Version_getLiquidate'];

    type PositionLineCfg_Type = {
      // pid: number;
      // line: IPositionLineAdapter;
      [key: string]: IPositionLineAdapter_Type;
    };

    interface PositionLine_TextInfo_Type {
      [key: string]: undefined | string; // 每个pid，对应一条【盈亏文本】
    }

    export interface PositionContractInfo {
      contractSize: number; // 合约面值
      quoteCoin: string; // 目标币种
      priceCoin: string; // 报价币种
    }

    // 【setLeverageInfo_fromOpenLever】方法，所用到的【数据结构】
    interface LeverageInfo_FromCurrentOpenLever {
      leverage: string;
      // position_type?: PositionType_QuanOrZhu; // WARN 1-逐仓  ； 2-全仓
    }

    // 【当前委托  列表】的大小
    interface LongOrShort_PendingOrder_Size {
      Amount: number;
      Vol: number;
    }

    // 【用户持有仓位】的大小
    interface LongOrShort_HoldPosition_Size {
      HoldVol: string; // 当前仓位数量
      HoldAvgPrice: string; // 当前持仓均价
      position_id: number; // 仓位ID
      FreezeVol: string; // 冻结数量

      // 有些情况下，才会出现
      IM?: number;
      MM?: number;
    }

    // 正要开仓的订单信息
    interface LongOrShort_SubmittingOrderInfo
      extends LongOrShort_SubmittingOrderInfo_LocalExpand {
      Vol: number;
      Price: number;
      Leverage: number;
      TakeFeeRatio: string;
      longOrSort: boolean;
    }

    type LongOrShort_SubmittingOrderInfo_LocalExpand = {
      // 后来附加的值
      IMR?: number;
    };

    interface TrueLeverage_CalcInfo {
      text: string;
      ceiledLeverage: number;
      noCeiledLeverage: number;
      finalTotalTrueMargin: number;
      positionValue: number;
      trueMarginRatio: number;
      trueMarginRatio_text: string;
    }
  }

  namespace MainNavFourNS {
    interface ContractProduct_Type {
      ticker: FunnyTrade;
      priceUnit: number;
      contract: InstrumentsApiNS.IInstrument;
    }

    interface ContractArea_Type {
      areaV: xX___CAreaTypeE;
      label: string;
    }
  }

  namespace HistoryEntrustNS {
    interface ListAction_Param {
      instrument_id: number;
      offset: number;
      originList: Array<UserOrdersApiNS.IOrder>;
      size?: void; // 统一用固定值20，便于修改  WARN 使用void，禁止传值
    }
  }

  namespace RiskLimitNS {
    // TIP 标准系数，基准值
    interface RiskLimitInfo_StandardMeta {
      BaseLimit: number;
      Step: number;
      InitialMargin: number;
      MaintenanceMargin: number;
    }

    // TIP 具体业务逻辑，数值参数
    interface RiskLimitInfo_BzVal {
      totalValue: number; //
      sum: number;
      initial: number;
      maintenance: number;
      level: number;
    }

    type RiskLimitInfo_StoreType = {
      long: NullableType<RiskLimitNS.RiskLimitInfo_BzVal>;
      short: NullableType<RiskLimitNS.RiskLimitInfo_BzVal>;
    };
  }

  namespace SubmitEntrustNS {
    // 缩写
    interface SE_ContractInfo {
      FeeConfig: {
        TakerFee: number;
      };
      Contract: PositionNS.PositionContractInfo;
      RiskLimit: RiskLimitNS.RiskLimitInfo_StandardMeta;
    }

    // 缩写
    interface SE_OrderInfo {
      OpenType?: boolean; // true-全仓    ；    false-逐仓
      Leverage: number;
      Vol: number | string;
      Price: string | number;
    }
  }

  namespace ChatRoomNS {
    // type ChatRoomList_CpType = InstanceType<typeof ChatRoomList>;

    interface Base_ChatMember_Bean {
    }

    type GuestMember_Bean_List = {};

    interface Interface {
    }

    interface JMemberItem {
      key: 'j-ownerList' | 'j-managerList' | 'j-normalList' | 'j-otherList';
      list: Array<NimNS.MemberType_Type>;
    }

    interface JMemberInfo {
      ownerList: Array<NimNS.MemberType_Type>;
      managerList: Array<NimNS.MemberType_Type>;
      normalList: Array<NimNS.MemberType_Type>;
      otherList: Array<NimNS.MemberType_Type>;

      guestList: Array<NimNS.MemberType_Type>;
    }
  }
}
