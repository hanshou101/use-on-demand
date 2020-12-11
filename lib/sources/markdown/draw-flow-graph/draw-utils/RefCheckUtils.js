import os from 'os';
/**
 * 既然【静态接口】用不了，那我就换成【工厂模式】。
 */
var RefCheckUtilsFactory = /** @class */ (function () {
    function RefCheckUtilsFactory() {
    }
    RefCheckUtilsFactory.getV1 = function () {
        if (!RefCheckUtilsFactory.v1) {
            RefCheckUtilsFactory.v1 = new RefCheckUtils_v1();
        }
        return RefCheckUtilsFactory.v1;
    };
    RefCheckUtilsFactory.getV2 = function () {
        if (!RefCheckUtilsFactory.v2) {
            RefCheckUtilsFactory.v2 = new RefCheckUtils_v2();
        }
        return RefCheckUtilsFactory.v2;
    };
    return RefCheckUtilsFactory;
}());
export { RefCheckUtilsFactory };
var RefCheckUtils_v1 = /** @class */ (function () {
    function RefCheckUtils_v1() {
    }
    /**
     * 将元素收集起来，检查引用
     *        1.避免，未在md变量中声明，就在md连线中使用  的情况。
     *        2.该方法，可以用作【drawFlow】方法的外部传参之前，也可以用作【drawFlow】内部。
     */
    RefCheckUtils_v1.prototype.collectToCheckRef = function (eleObjs) {
        eleObjs.forEach(function (item) {
            // 先加后减，和先减后加。效果是一个样！！！
            item.canUseTimes += 9999; // 初始值时，凡是声明过的，都增为最大。
        });
        return new CheckRefWrapper(eleObjs);
    };
    RefCheckUtils_v1.prototype.checkUsedIfOnce = function (obj) {
        obj.canUseTimes--; // TODO 被使用次数增加，ref值减少。（此处，最好应该使用@注解）
    };
    /**
     * 基本思路  声明/引用 引用次数，计数器。
     *
     * 1.方式一.
     *      1.将所有的声明，包起来，放在一个对象里。然后通过对象调用。
     *      2.这样的好处是，我们拥有全集的一个对象。
     * 2.方式二.
     *      1.方式二，通过【with】关键字。
     *      2.这是基于方式一，对方式一的一种简化、修正。（但是缺陷在于，TypeScript，以及strict模式，并不支持）
     * 3.方式三.
     *      1.正在考虑。在Utils类中维护一个全局。
     *      2.然后每个调用、被调用方法内，进行处理。
     */
    RefCheckUtils_v1.prototype.checkRefs = function (usedParams) {
        if (!usedParams) {
            throw new Error("v1\u7248\u672C\uFF0C\u9700\u8981usedParams\u3002" + os.EOL + "1.\u8BF7\u5C06\u8BE5\u53C2\u6570\u4F20\u5165" + os.EOL + "2.\u6216\u8005\uFF0C\u91CD\u65B0\u5199\u4E00\u904D\u65B9\u6CD5\u7684\u903B\u8F91");
        }
        // FIXME 此处，似乎只能检查哪些已声明没用过？？？？？  而检查不到，哪些用了但没声明？？？
        // TIP 那么，只能运用【全量表】的思维了。！！！用IDE的提示，来实现。
        for (var key in usedParams) {
            if (usedParams.hasOwnProperty(key)) {
                var item = usedParams[key];
                if (item.canUseTimes < 0) {
                    throw new Error("\u5B58\u5728\u672A\u5728md\u58F0\u660E\uFF0C\u5C31\u5728\u8FDE\u7EBF\u4E2D\u4F7F\u7528\u7684\u60C5\u51B5" + os.EOL + "1." + item.toString());
                }
            }
        }
    };
    return RefCheckUtils_v1;
}());
var CheckRefWrapper = /** @class */ (function () {
    function CheckRefWrapper(eleObjs) {
        this.eleObjs = eleObjs;
    }
    return CheckRefWrapper;
}());
export { CheckRefWrapper };
var RefCheckUtils_v2 = /** @class */ (function () {
    function RefCheckUtils_v2() {
    }
    RefCheckUtils_v2.prototype.collectToCheckRef = function (eleObjs) {
        RefCheckUtils_v2.declaredObjs = eleObjs;
        return new CheckRefWrapper(RefCheckUtils_v2.declaredObjs);
    };
    RefCheckUtils_v2.prototype.checkUsedIfOnce = function (obj) {
        // 如果元素并非【虚拟衍生元素】，并且没有被声明，则抛出异常
        if (!obj.__isVirtualEleObj()
            && !RefCheckUtils_v2.declaredObjs.includes(obj)) {
            throw new Error("" + obj.toString() + os.EOL + "1.\u8BE5\u5143\u7D20\u6B63\u5728\u88AB\u4F7F\u7528" + os.EOL + "2.\u8BE5\u5143\u7D20\u6CA1\u6709\u88AB\u58F0\u660E");
        }
    };
    RefCheckUtils_v2.prototype.checkRefs = function () {
        // 此处，暂时好像没有什么好检查的。
    };
    RefCheckUtils_v2.declaredObjs = [];
    return RefCheckUtils_v2;
}());
//# sourceMappingURL=RefCheckUtils.js.map