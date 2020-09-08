import { VarsColor } from '../less/diy/less-vars.diy';
export class ColorUtil {
    /**
     * 【RGB】转【HEX】
     */
    static rgbToHex(r, g, b) {
        return '#' + this.__componentToHex(r) + this.__componentToHex(g) + this.__componentToHex(b);
    }
    /**
     * 【HEX】转【RGB】
     */
    static hexToRgb(sharpHex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sharpHex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    }
    //
    //
    //
    static __componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
}
/**
 * 指定某个颜色
 */
ColorUtil.ElLoading_color = (function () {
    const TextPrimary_or_Bg_Color = VarsColor.TextPrimary_or_Bg_Color;
    const rgbObj = ColorUtil.hexToRgb(TextPrimary_or_Bg_Color);
    if (!rgbObj) {
        throw new Error('转化Hex颜色到Rgb颜色，失败！');
    }
    return `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, 0.65)`;
})();
//# sourceMappingURL=color-util.js.map