import {VarsColor} from '../less/diy/less-vars.diy';

export class ColorUtil {

  private static componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  static rgbToHex(r: number, g: number, b: number) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  static hexToRgb(sharpHex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sharpHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static ElLoading_color = (function () {
    const TextPrimary_or_Bg_Color = VarsColor.TextPrimary_or_Bg_Color;
    const rgbObj                  = ColorUtil.hexToRgb(TextPrimary_or_Bg_Color);
    if (!rgbObj) {
      throw new Error('转化Hex颜色到Rgb颜色，失败！');
    }
    return `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, 0.65)`;
  })();

}
