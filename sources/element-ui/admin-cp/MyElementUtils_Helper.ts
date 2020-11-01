import { xX_data_elTagColorFilter } from './ElTagItem';

export class xX_MyElementUtils_Helper {
  public static get_MyElTagLike_HtmlText(colorIndex: number, optionText: string) {
    return `<span class="el-tag el-tag--${xX_data_elTagColorFilter[colorIndex]}">${optionText}</span>`;
  }
}
