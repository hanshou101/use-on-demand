import { __decorate } from "tslib";
import { DrawUtil } from '../draw-utils/DrawUtil';
import { EleObj } from '../draw-utils/EleObj';
import { RefCheckUtilsFactory } from '../draw-utils/RefCheckUtils';
import { staticImplements } from '../../../ts/TsType_Helper';
var Start = EleObj.Start, End = EleObj.End, Operation = EleObj.Operation, Subroutine = EleObj.Subroutine, Condition = EleObj.Condition, InputOutput = EleObj.InputOutput, Parallel = EleObj.Parallel;
var IRefCheckUtil = RefCheckUtilsFactory.getV2();
var Case1 = /** @class */ (function () {
    function Case1() {
    }
    Case1.draw = function () {
        var 开始 = new Start('开始框111', 'www.baidu.com');
        var 开始预处理 = new Operation('开始预处理');
        var 第一个判断 = new Condition('判断框（是或否?）');
        var 第二个判断 = new Condition("\u5224\u65AD\u6846");
        var 对第二个判断框的说明 = new Operation("\u6CE8\u91CA\uFF08\u6211\u4EEC\u7528\u8FD9\u4E2A\u6846\uFF0C\u5B9E\u73B0\u591A\u4E2A\u5206\u652F\uFF09");
        var 第一个子流程 = new Subroutine('子流程（放一个完整的图）');
        var 输入输出框 = new InputOutput('输入输出框');
        var 结束框 = new End('结束框');
        var 平行框 = new Parallel('平行任务们');
        // const content = DrawUtil.drawFlow(`
        // ${开始}
        // ${开始预处理}
        // ${第一个判断}
        // ${第一个子流程}
        // ${输入输出框}
        // ${结束框}
        // st->op->cond
        // cond(yes)->io->e
        // cond(no)->sub1(right)->op
        // `);
        /*
                // FIXME 不推荐使用with关键字，但这又是【with】很适合的一种场景
                // @ts-ignore
                with (_) {

                }
        */
        var content = DrawUtil.drawFlow(
        // 元素
        IRefCheckUtil.collectToCheckRef([开始, 开始预处理, 第一个判断, 第二个判断, 对第二个判断框的说明, 第一个子流程, 输入输出框, 结束框, 平行框]), 
        // 连线
        [开始.link(开始预处理, 第一个判断),
            第一个判断.cond('yes', 'right').link(输入输出框, 结束框),
            第一个判断.cond('no', 'left').link(第二个判断),
            第二个判断.cond('yes').link(对第二个判断框的说明, 第一个子流程.toDirection('left'), 第一个判断),
            第二个判断.cond('no').link(平行框),
            // 开始预处理.link(平行框.byDirection('left')),
            平行框.parallel('path1', 'top').link(开始预处理),
            平行框.parallel('path2', 'right').link(输入输出框),
        ]);
        return {
            content: content,
            title: '测试案例1',
        };
    };
    Case1 = __decorate([
        staticImplements()
    ], Case1);
    return Case1;
}());
export { Case1 };
//# sourceMappingURL=Case1.js.map