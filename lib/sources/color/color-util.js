import { xX_VarsColor } from '../less/diy/less-vars.diy';
import { xX_ExceptionError_Helper } from '../exception-error/ExceptionError_Helper';
var xX_ColorUtil = /** @class */ (function () {
    function xX_ColorUtil() {
    }
    /**
     * 【RGB】转【HEX】
     */
    xX_ColorUtil.rgbToHex = function (r, g, b) {
        return '#' + this.__componentToHex(r) + this.__componentToHex(g) + this.__componentToHex(b);
    };
    /**
     * 【HEX】转【RGB】
     */
    xX_ColorUtil.hexToRgb = function (sharpHex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sharpHex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    };
    //
    //
    //
    xX_ColorUtil.__componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };
    /**
     * 指定某个颜色
     */
    xX_ColorUtil.ElLoading_color = (function () {
        var TextPrimary_or_Bg_Color = xX_VarsColor.TextPrimary_or_Bg_Color;
        var rgbObj = xX_ColorUtil.hexToRgb(TextPrimary_or_Bg_Color);
        if (!rgbObj) {
            throw new Error(xX_ExceptionError_Helper.throwError_andLog('转化Hex颜色到Rgb颜色，失败！'));
        }
        return "rgba(" + rgbObj.r + ", " + rgbObj.g + ", " + rgbObj.b + ", 0.65)";
    })();
    return xX_ColorUtil;
}());
export { xX_ColorUtil };
//# sourceMappingURL=color-util.js.map