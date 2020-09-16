import { xX_data_elTagColorFilter } from './MyElementUtils';
var xX_MyElementUtils_Helper = /** @class */ (function () {
    function xX_MyElementUtils_Helper() {
    }
    xX_MyElementUtils_Helper.get_ElTag_HtmlText = function (colorIndex, optionText) {
        return "<span class=\"el-tag el-tag--" + xX_data_elTagColorFilter[colorIndex] + "\">" + optionText + "</span>";
    };
    return xX_MyElementUtils_Helper;
}());
export { xX_MyElementUtils_Helper };
//# sourceMappingURL=MyElementUtils_Helper.js.map