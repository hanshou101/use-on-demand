import { data_elTagColorFilter } from './MyElementUtils';
var MyElementUtils_Helper = /** @class */ (function () {
    function MyElementUtils_Helper() {
    }
    MyElementUtils_Helper.get_ElTag_HtmlText = function (colorIndex, optionText) {
        return "<span class=\"el-tag el-tag--" + data_elTagColorFilter[colorIndex] + "\">" + optionText + "</span>";
    };
    return MyElementUtils_Helper;
}());
export { MyElementUtils_Helper };
//# sourceMappingURL=MyElementUtils_Helper.js.map