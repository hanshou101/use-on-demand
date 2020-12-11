import { __decorate } from "tslib";
import { DrawUtil } from '../draw-utils/DrawUtil';
import { EleObj } from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements } from '../../../ts/TsType_Helper';
var Start = EleObj.Start, End = EleObj.End, Operation = EleObj.Operation, Subroutine = EleObj.Subroutine, Condition = EleObj.Condition, InputOutput = EleObj.InputOutput, Parallel = EleObj.Parallel;
var IRefCheckUtil = RefCheckUtilsFactory.getV2();
var Case2 = /** @class */ (function () {
    function Case2() {
    }
    Case2.draw = function () {
        var 基本流程表 = new Start('基本流程，从', 'https://shimo.im/sheets/v3gPWwhtKdyPw3dg/MODOC');
        var 数据逻辑梳理 = new Operation('数据逻辑梳理');
        var 单表结构设计_创建 = new Operation('表结构设计_创建');
        var 表与表之间联系_梳理 = new Operation('表与表之间联系_梳理');
        var 各个子难点_单独列举_早期只伪造接口 = new Operation("\u5404\u4E2A\u5B50\u96BE\u70B9_\u5355\u72EC\u5217\u4E3E_\n    \u65E9\u671F\u53EA\u4F2A\u9020\u63A5\u53E3");
        var 界面简单绘制_增删改查 = new Operation("\u754C\u9762\u7B80\u5355\u7ED8\u5236_\n    \u589E\u5220\u6539\u67E5");
        var 结束 = new End('未完待续');
        return {
            title: '测试案例2',
            content: DrawUtil.drawFlow(IRefCheckUtil.collectToCheckRef([
                基本流程表, 数据逻辑梳理, 单表结构设计_创建, 表与表之间联系_梳理,
                各个子难点_单独列举_早期只伪造接口, 界面简单绘制_增删改查,
                结束,
            ]), [
                基本流程表.link(数据逻辑梳理, 单表结构设计_创建, 表与表之间联系_梳理, 各个子难点_单独列举_早期只伪造接口, 界面简单绘制_增删改查, 结束),
            ]),
        };
    };
    Case2 = __decorate([
        staticImplements()
    ], Case2);
    return Case2;
}());
export { Case2 };
//# sourceMappingURL=Case2.js.map