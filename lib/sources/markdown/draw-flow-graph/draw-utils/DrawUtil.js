import { __read, __spread } from "tslib";
import { EleObj } from './EleObj';
import os from 'os';
import { RefCheckUtilsFactory } from './RefCheckUtils';
var IRefCheckUtil = RefCheckUtilsFactory.getV2();
var DrawUtil = /** @class */ (function () {
    function DrawUtil() {
    }
    /**
     * 绘制流程图
     */
    DrawUtil.drawFlow = function (eleObjsWrapper, operations) {
        var eleObjs = eleObjsWrapper.eleObjs;
        this.checkHasStartEnd(eleObjs);
        this.checkLinks(eleObjs);
        IRefCheckUtil.checkRefs();
        var _content = __spread(eleObjs, operations).map(function (obj) {
            return obj.toString();
        }).join(os.EOL);
        var sep = DrawUtil.SyntaxSep;
        var graph = DrawUtil.GraphType;
        var final = "" + sep + graph + os.EOL + _content + os.EOL + sep;
        var _final = final.trim();
        return _final;
    };
    /**
     * 检查是否有开始标签、结束标签。
     */
    DrawUtil.checkHasStartEnd = function (eleObjs) {
        var startEndCheck = [false, false];
        eleObjs.forEach(function (item) {
            if (item instanceof EleObj.Start) {
                startEndCheck[0] = true;
            }
            if (item instanceof EleObj.End) {
                startEndCheck[1] = true;
            }
        });
        var result = startEndCheck.reduce(function (previousValue, total) {
            return total && previousValue;
        });
        if (!result) {
            throw new Error('并未满足条件：必须要有【Start】标签，必须要有【End】标签');
        }
    };
    /**
     * 检查连接线。
     *        1.除【条件】、【平行】之外的框，连接数是否超过1
     */
    DrawUtil.checkLinks = function (eleObjs) {
        eleObjs.forEach(function (item) {
            var maxTimes;
            // TIP 从网上找到资料，可见这位作者相当聪明！Switch可以反过来用：https://stackoverflow.com/questions/36332665/how-to-use-instanceof-in-a-switch-statement
            switch (true) {
                case item instanceof EleObj.Condition: {
                    maxTimes = 3; // 【条件】，3次
                    break;
                }
                case item instanceof EleObj.Parallel: {
                    maxTimes = 2; // 【平行】，2次
                    break;
                }
                default: {
                    maxTimes = 1;
                    break;
                }
            }
            if (item.linkTimes > maxTimes) {
                throw new Error(item.toString() + "\u7684linkTimes - " + item.linkTimes + "\uFF0C\u5DF2\u8D85\u8FC7\u6700\u5927\u8FDE\u63A5\u6570 - " + maxTimes);
            }
        });
    };
    DrawUtil.SyntaxSep = '\`\`\`';
    DrawUtil.GraphType = 'flow';
    return DrawUtil;
}());
export { DrawUtil };
//# sourceMappingURL=DrawUtil.js.map