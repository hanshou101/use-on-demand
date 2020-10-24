import { xX_VarsColor }             from '../less/diy/less-vars.diy';
import { xX_ExceptionError_Helper } from '../exception-error/ExceptionError_Helper';

export class xX_ColorUtil {

	/**
	 * 【RGB】转【HEX】
	 */
	public static rgbToHex(r: number, g: number, b: number) {
		return '#' + this.__componentToHex(r) + this.__componentToHex(g) + this.__componentToHex(b);
	}

	/**
	 * 【HEX】转【RGB】
	 */
	public static hexToRgb(sharpHex: string) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sharpHex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
		} : null;
	}

	/**
	 * 指定某个颜色
	 */
	public static ElLoading_color = (function() {
		const TextPrimary_or_Bg_Color = xX_VarsColor.TextPrimary_or_Bg_Color;
		const rgbObj                  = xX_ColorUtil.hexToRgb(TextPrimary_or_Bg_Color);
		if (!rgbObj) {
			throw new Error(xX_ExceptionError_Helper.throwError_andLog('转化Hex颜色到Rgb颜色，失败！'));
		}
		return `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, 0.65)`;
	})();

	//
	//
	//

	private static __componentToHex(c: number) {
		const hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

}
