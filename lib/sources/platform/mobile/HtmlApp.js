import { checkHtmlVersion } from '../url-location/url-location';
import { My_RemCompatible_Util } from '../../viewport/rem-responsive/RemCompatible_Util';
window.Promise = Promise; // FIXME 可有效修复，Webpack/Parcel中，有些Promise语法  没有经过polyfill 的问题！！！
var HtmlApp = /** @class */ (function () {
    function HtmlApp(pageConfig) {
        this.pageConfig = pageConfig;
        // public readonly designWidth: number       = 750;
        // public readonly designAdjustRatio: number = 1;
        // public readonly checkHtmlVersion  !: () => void;                                  //
        this.calcRemCompatible = My_RemCompatible_Util.calc_remCompatible_YanNan.bind(this); //
        // 检查更新
        if (pageConfig.need_checkHtmlVersion) {
            checkHtmlVersion();
        }
        // 设置rem
        if (pageConfig.need_calcRemCompatible) {
            var that_1 = this;
            this.calcRemCompatible(pageConfig.designWidth, pageConfig.designAdjustRatio); // 执行1次
            window.onresize = function () {
                that_1.calcRemCompatible(pageConfig.designWidth, pageConfig.designAdjustRatio);
            };
        }
        // 绑定onload事件
        window.onload = this.onWindowLoaded.bind(this);
    }
    return HtmlApp;
}());
export { HtmlApp };
//# sourceMappingURL=HtmlApp.js.map