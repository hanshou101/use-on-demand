import {data_elTagColorFilter} from './MyElementUtils';

export class MyElementUtils_Helper {
  public static get_ElTag_HtmlText(colorIndex: number, optionText: string) {
    return `<span class="el-tag el-tag--${data_elTagColorFilter[colorIndex]}">${optionText}</span>`;
  }
}
