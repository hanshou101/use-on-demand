import TradingView, {
  ChartActionId, ChartingLibraryWidgetOptions, CreateTradingPrimitiveOptions, IChartingLibraryWidget,
  IChartWidgetApi, IPositionLineAdapter, ResolutionString
} from '../../../tradingview/charting_library/charting_library.min';

// import swapsApi                                        from '~/assets/js/api/swapsApi';
import {Bar, DatafeedConfiguration, LibrarySymbolInfo} from '../../../tradingview/charting_library/datafeed-api';




declare global {
  // 增加一些选项字段
  export type ChartingLibraryWidgetOptions_Improved = ChartingLibraryWidgetOptions & {
    allow_symbol_change: boolean;
  }
  type ChartActionIdType = ChartActionId;

  interface IPositionLineAdapter_Type extends IPositionLineAdapter {
    onReverse(callback: (text: string) => void): this;        //
    onClose(callback: (text: string) => void): this;          //
  }

}


/**
 * 专门处理【原始命名空间】，缺少的类型
 */
declare global {
  /*
    // TIP 原版的命名空间
    declare namespace TradingView {
      // interface IChartingLibraryWidget {
      //   // a(): void;
      // }
      interface IChartWidgetApi {
        setResolution(resolution: ResolutionString): void;
      }
    }
  */
  namespace TradingView {
    interface IChartingLibraryWidget {
      _innerAPI(): boolean;//
      chart(index?: number): IChartWidgetApi & {
        createPositionLine(options?: CreateTradingPrimitiveOptions): IPositionLineAdapter_Type;
      };

      _id: string;
    } //
    interface IChartWidgetApi {
      setResolution(resolution: ResolutionString, callback?: () => void): void;
      createPositionLine(options: CreateTradingPrimitiveOptions): IPositionLineAdapter_Type;
    } //
  } //
  interface Window {
    tvWidget: TradingView.IChartingLibraryWidget;
    TradingView: typeof TradingView;
    tv_chart_ready: boolean;
  } //
}

type MinuteType = 1 | 5 | 15 | 30;
type HourType = 1 | 2 | 4 | 6 | 12;
type DayType = 1 | 7;

declare global {
  namespace KlineDataFeedNS {
    type CfgType_Type = 'M' | 'H' | 'D';
    type CfgBit_Type = MinuteType | HourType | DayType;

    // FIXME 此处，要和【datafeed.ts / getDate】的传参，一起排查
    type SourceType = 1 | 2;        //  1：第一次请求 2：历史增量请求

    interface KLineCfg {
      id: number;
      name: string;
      buttonName: string;
      period: string; /* '1min' | '5min' */
      step: number;                           // 步距，以毫秒为单位。比如：5*60*1000。
      type: CfgType_Type,                        // 时间单位：M-分钟，H-小时。
      bit: CfgBit_Type,             // 基于【时间单位】的时间数量
      firstTime: string | number,
      lastTime: string | number,
      // cache: Array<any>,
      noData: boolean,
      isIncremental: boolean, // 是否是第一次增量
      active?: boolean,                        // 是否默认激活？


      // WARN 这些，是处理过程中，动态添加上去的数据
      cache: Array<Bar>,
    }

    // type GetBar_FnType = typeof swapsApi.getBar;

    /**
     * 拉取K线的方式：
     *        1.合约市场K线
     *        2.指数K线
     */
    type Theme = 'QuoteBin' | 'IndexBin' | '';

    type ReadyCb_Fn = (cfg: DatafeedConfiguration) => void;

    type OnSymbolResolvedCb_Fn = (cfg: LibrarySymbolInfo) => void;

    type OnResolveErrorCb_Fn = Function;

    type OnDataCb_Fn = (arr: Array<any>, conf?: {
      noData: boolean;
      nextTime?: number;
    }) => void;

    type OnErrorCb_Fn = Function;

    type OnRealtimeCb_Fn = (bar: Bar) => void;

    // 对外暴露出，DataFeed类的自定义回调。
    interface ExposedCustomCB_Maps {
      onReady_Cb?(): void;
    }

  }

  namespace KlineDrawNS {
    interface PositionLineCloseData_Type {
      position?: PositionNS.PositionEntity_Type;
      ts?: number;
    } //
    interface CommonDrawParam {
      from: number;
      to: number;
      priceHigh: number;
      priceLow: number;
    }
  }
}
