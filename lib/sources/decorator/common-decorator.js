import { __assign } from "tslib";
/**
 *  TODO 一些可以优化的点：
 *          1.【常用函数】，在合适的时机，可以考虑换成【lodash】所采用的方法。
 *          2.
 */
import { xX_DebugU, xX_LogE } from '../debug-util/debug-util';
import { xX_ExceptionError_Helper } from '../exception-error/ExceptionError_Helper';
var xX_CDecoratorU = /** @class */ (function () {
    function xX_CDecoratorU() {
    }
    /**
     *  防抖
     *        1.【若干秒之后】，才执行，必定执行一次。
     */
    xX_CDecoratorU.debounce = function (wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var that = this;
        return function handleDescriptor(target, key, descriptor) {
            var callback = descriptor.value;
            if (typeof callback !== 'function') {
                throw new SyntaxError(xX_ExceptionError_Helper.throwError_andLog('Only functions can be debounced'));
            }
            var fn = CDecoratorU_Helper.__debounce(callback, wait, immediate);
            return __assign(__assign({}, descriptor), { 
                // value () {  // TODO 此处，是错误示范。原版的【Lodash】在这里写的方法有问题。
                //   fn();
                // },
                value: fn() });
        };
    };
    /**
     *  节流
     *          1.马上执行
     *          2.但之后【若干秒之内的事件】，全部放到【若干秒后】，执行最后一次。
     */
    xX_CDecoratorU.throttle = function (wait, /*immediate: boolean = false*/ __options) {
        if (__options === void 0) { __options = {}; }
        var that = this;
        return function handleDescriptor(target, key, descriptor) {
            var callback = descriptor.value;
            if (typeof callback !== 'function') {
                throw new SyntaxError(xX_ExceptionError_Helper.throwError_andLog('Only functions can be throttled'));
            }
            var fn = CDecoratorU_Helper.__throttle(callback, wait, __options);
            console.log('throttle的descriptor', descriptor);
            return __assign(__assign({}, descriptor), { 
                // value () {  // TODO 此处，是错误示范。原版的【Lodash】在这里写的方法有问题。
                //   fn();
                // },
                /**
                 * TIP 所有的函数形式，包括【Promise】/【异步】/【async/await】，都是支持的。
                 */
                // TODO 以下的方式，是没有问题的
                value: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // fn.bind(this)();
                    return fn.apply(this, args); // TODO 此处，用于处理类似  Promise<any> 这样返回值的情况。
                } });
        };
    };
    /**
     * 执行1次，若干秒内，都不执行
     */
    xX_CDecoratorU.runOnlyOnce_inDuration = function () {
        // TODO 暂时还没想好。
    };
    /**
     * Loading加载提示
     */
    xX_CDecoratorU.loading = function () {
    };
    /**
     * 确认框
     */
    xX_CDecoratorU.ConfirmDialog = function () {
    };
    /**
     * 应用于成员方法之上
     *        1.类的原型——成员方法名字——对象内部属性描述符
     *        2.FIXME 用箭头函数，避免this被指向别处
     */
    xX_CDecoratorU.log = function (that, type) {
        if (type === void 0) { type = 'verbose'; }
        return function (target, name, descriptor) {
            xX_DebugU.l(xX_LogE.decorator, 'target', target);
            xX_DebugU.l(xX_LogE.decorator, 'descriptor', descriptor);
            var method = descriptor.value; // 获取描述符的值——方法
            xX_DebugU.l(xX_LogE.decorator, 'method', method);
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                console.info(type + " \u6B63\u5728\u8FDB\u884C\uFF1A" + name + "(" + args + ") = ?");
                var result;
                try {
                    xX_DebugU.l(xX_LogE.decorator, 'target值', target);
                    xX_DebugU.l(xX_LogE.decorator, 'that值', that);
                    xX_DebugU.l(xX_LogE.decorator, 'this值', this);
                    // 这种方式可以
                    result = method.apply(this, args);
                    // 这种方式不行
                    // result = method.apply(target, args)
                    console.info("(" + type + ") \u6210\u529F\uFF1A " + name + "(" + args + ") => " + result);
                }
                catch (err) {
                    console.error("(" + type + ") \u5931\u8D25\uFF1A " + name + "(" + args + ") => " + err);
                }
                return result;
            };
        };
    };
    return xX_CDecoratorU;
}());
export { xX_CDecoratorU };
//
//
//
//
//
//
//
//
//
//
var CDecoratorU_Helper = /** @class */ (function () {
    function CDecoratorU_Helper() {
    }
    // TIP——————————————————————————————————内部方法————————————————————————————————————
    CDecoratorU_Helper.__debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var that = this;
            var args = arguments;
            if (timeout) {
                clearTimeout(timeout);
            }
            if (immediate) {
                var callNow = !timeout;
                timeout = window.setTimeout(function () {
                    timeout = null;
                }, wait);
                if (callNow) {
                    func.apply(that, args);
                }
            }
            else {
                timeout = window.setTimeout(function () {
                    func.apply(that, args);
                }, wait);
            }
        };
    };
    CDecoratorU_Helper.__throttle = function (func, wait, __options) {
        var timeout;
        var that;
        var args;
        var result;
        var previous = 0;
        var options = __options;
        if (!options) {
            options = {};
        }
        var later = function () {
            previous = options.leading === false ? 0 : new Date().valueOf();
            timeout = null;
            result = func.apply(that, args);
            console.log('later中，执行了1次方法');
            if (!timeout) {
                that = args = null;
            }
        };
        var throttled = function () {
            var now = new Date().valueOf();
            if (!previous && options.leading === false) { // 这句话，是处理【不要leading】的情况
                console.log('不要leading的情况');
                previous = now;
            }
            var remaining = wait - (now - previous);
            console.log('wait', wait, 'now', now, 'previous', previous, 'remaining', remaining);
            that = this; // 此处，原本的【lodash代码】，已经考虑到了，处理  this 的过程
            // console.log('__throttle里的that值', that);
            args = arguments;
            // 如果剩余时间小于0，清空timeout，立即调用
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(that, args);
                console.log('throttled中，执行了1次方法');
                if (!timeout) {
                    that = args = null;
                }
            }
            else if (!timeout && options.trailing !== false) {
                // 如果没有timeout并且不禁止最后一次调用，那就设置定时重新运行
                console.log('进入到最后一次判断阶段。此处，若是无限次重复调用，则说明，可能是有【1带3】的情况');
                timeout = window.setTimeout(later, remaining);
            }
            return result;
        };
        throttled.cancel = function () {
            clearTimeout(timeout || undefined);
            previous = 0;
            timeout = that = args = null;
        };
        // console.log('throttled', throttled);
        return throttled; // TODO 最终的新函数
    };
    CDecoratorU_Helper.__runOnlyOnce_inDuration = function (func, wait, immediate) {
        // TODO 暂时还没想好
    };
    return CDecoratorU_Helper;
}());
//# sourceMappingURL=common-decorator.js.map