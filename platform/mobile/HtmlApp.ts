import {checkHtmlVersion}      from '../url-location/url-location';
import {My_RemCompatible_Util} from '../../viewport/rem-responsive/RemCompatible_Util';

window.Promise = Promise; // FIXME 可有效修复，Webpack/Parcel中，有些Promise语法  没有经过polyfill 的问题！！！

declare global {
  interface PageConfig {
    need_checkHtmlVersion: boolean;           // 开关
    need_calcRemCompatible: boolean;          // 开关
    designWidth: number;
    designAdjustRatio: number;
  }                                           //
  // interface GetPageConfig {
  //   (): PageConfig;
  // }
}

interface IBasicInit {
  // designWidth: number;                      //

  // checkHtmlVersion (): void;                //
  calcRemCompatible(designWidth: number, adjustRatio: number): void;          //
//
//   getPageConfig: GetPageConfig;
}

interface IOnLoadInit {
  onWindowLoaded(): void;
}

export abstract class HtmlApp implements IBasicInit, IOnLoadInit {
  // public readonly designWidth: number       = 750;
  // public readonly designAdjustRatio: number = 1;
  // public readonly checkHtmlVersion  !: () => void;                                  //
  public readonly calcRemCompatible = My_RemCompatible_Util.calc_remCompatible_YanNan.bind(this);               //
  //
  // public abstract getPageConfig (): PageConfig;                                     //
  //
  public abstract onWindowLoaded(): void;

  constructor(public pageConfig: PageConfig) {
    // 检查更新
    if (pageConfig.need_checkHtmlVersion) {
      checkHtmlVersion();
    }
    // 设置rem
    if (pageConfig.need_calcRemCompatible) {
      const that = this;
      this.calcRemCompatible(pageConfig.designWidth, pageConfig.designAdjustRatio);   // 执行1次
      window.onresize = function () {             // 绑定每次回调
        that.calcRemCompatible(pageConfig.designWidth, pageConfig.designAdjustRatio);
      };
    }
    // 绑定onload事件
    window.onload = this.onWindowLoaded.bind(this);
  }

}
