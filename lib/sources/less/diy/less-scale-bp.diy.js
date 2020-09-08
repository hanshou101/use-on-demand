import { DomStyle_Helper } from '../../dom/dom-style';
/**
 *  TIP 总结的参考资料，欢迎随时补充：
 *          1.[响应式布局 · (5) 最佳实践](https://www.teambition.com/project/5c4567c7266c640018d21c28/posts/post/5f283c1d7bf60900442418e7)
 */
export var LessScaleBpE;
(function (LessScaleBpE) {
    LessScaleBpE[LessScaleBpE["xxs"] = 0] = "xxs";
    LessScaleBpE[LessScaleBpE["xs"] = 320] = "xs";
    LessScaleBpE[LessScaleBpE["s"] = 576] = "s";
    LessScaleBpE[LessScaleBpE["m"] = 768] = "m";
    LessScaleBpE[LessScaleBpE["l"] = 992] = "l";
    LessScaleBpE[LessScaleBpE["xl"] = 1200] = "xl";
    LessScaleBpE[LessScaleBpE["xxl"] = 1400] = "xxl";
})(LessScaleBpE || (LessScaleBpE = {}));
var LessScaleBpDiy_Helper = /** @class */ (function () {
    function LessScaleBpDiy_Helper() {
    }
    LessScaleBpDiy_Helper.isSmallerThan = function (targetBpE) {
        return DomStyle_Helper.getDocumentWidthHeight().width <= targetBpE;
    };
    return LessScaleBpDiy_Helper;
}());
export { LessScaleBpDiy_Helper };
//# sourceMappingURL=less-scale-bp.diy.js.map