import { data_elTagColorFilter } from './MyElementUtils';
export class MyElementUtils_Helper {
    static get_ElTag_HtmlText(colorIndex, optionText) {
        return `<span class="el-tag el-tag--${data_elTagColorFilter[colorIndex]}">${optionText}</span>`;
    }
}
//# sourceMappingURL=MyElementUtils_Helper.js.map