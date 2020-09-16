import {xX_data_elTagColorFilter} from './MyElementUtils';

export class xX_MyElementUtils_Helper {
  public static get_ElTag_HtmlText(colorIndex: number, optionText: string) {
    return `<span class="el-tag el-tag--${xX_data_elTagColorFilter[colorIndex]}">${optionText}</span>`;
  }
}
