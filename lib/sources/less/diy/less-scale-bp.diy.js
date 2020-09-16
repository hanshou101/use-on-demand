import { xX_DomStyle_Helper } from '../../dom/dom-style';
/**
 *  TIP 总结的参考资料，欢迎随时补充：
 *          1.[响应式布局 · (5) 最佳实践](https://www.teambition.com/project/5c4567c7266c640018d21c28/posts/post/5f283c1d7bf60900442418e7)
 */
export var xX_LessScaleBpE;
(function (xX_LessScaleBpE) {
    xX_LessScaleBpE[xX_LessScaleBpE["xxs"] = 0] = "xxs";
    xX_LessScaleBpE[xX_LessScaleBpE["xs"] = 320] = "xs";
    xX_LessScaleBpE[xX_LessScaleBpE["s"] = 576] = "s";
    xX_LessScaleBpE[xX_LessScaleBpE["m"] = 768] = "m";
    xX_LessScaleBpE[xX_LessScaleBpE["l"] = 992] = "l";
    xX_LessScaleBpE[xX_LessScaleBpE["xl"] = 1200] = "xl";
    xX_LessScaleBpE[xX_LessScaleBpE["xxl"] = 1400] = "xxl";
})(xX_LessScaleBpE || (xX_LessScaleBpE = {}));
var xX_LessScaleBpDiy_Helper = /** @class */ (function () {
    function xX_LessScaleBpDiy_Helper() {
    }
    xX_LessScaleBpDiy_Helper.isSmallerThan = function (targetBpE) {
        return xX_DomStyle_Helper.getDocumentWidthHeight().width <= targetBpE;
    };
    return xX_LessScaleBpDiy_Helper;
}());
export { xX_LessScaleBpDiy_Helper };
//# sourceMappingURL=less-scale-bp.diy.js.map