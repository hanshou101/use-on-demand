/**
 *  TODO 一些可以优化的点：
 *          1.【常用函数】，在合适的时机，可以考虑换成【lodash】所采用的方法。
 *          2.
 */
import { DebugU, LogE } from '../debug-util/debug-util';
export class CDecoratorU {
    /**
     *  防抖
     *        1.【若干秒之后】，才执行，必定执行一次。
     */
    static debounce(wait, immediate = false) {
        const that = this;
        return function handleDescriptor(target, key, descriptor) {
            const callback = descriptor.value;
            if (typeof callback !== 'function') {
                throw new SyntaxError('Only functions can be debounced');
            }
            const fn = CDecoratorU_Helper.__debounce(callback, wait, immediate);
            return {
                ...descriptor,
                // value () {  // TODO 此处，是错误示范。原版的【Lodash】在这里写的方法有问题。
                //   fn();
                // },
                value: fn(),
            };
        };
    }
    /**
     *  节流
     *          1.马上执行
     *          2.但之后【若干秒之内的事件】，全部放到【若干秒后】，执行最后一次。
     */
    static throttle(wait, /*immediate: boolean = false*/ __options = {}) {
        const that = this;
        return function handleDescriptor(target, key, descriptor) {
            const callback = descriptor.value;
            if (typeof callback !== 'function') {
                throw new SyntaxError('Only functions can be throttled');
            }
            const fn = CDecoratorU_Helper.__throttle(callback, wait, __options);
            console.log('throttle的descriptor', descriptor);
            return {
                ...descriptor,
                // value () {  // TODO 此处，是错误示范。原版的【Lodash】在这里写的方法有问题。
                //   fn();
                // },
                /**
                 * TIP 所有的函数形式，包括【Promise】/【异步】/【async/await】，都是支持的。
                 */
                // TODO 以下的方式，是没有问题的
                value: function (...args) {
                    // fn.bind(this)();
                    return fn.apply(this, args); // TODO 此处，用于处理类似  Promise<any> 这样返回值的情况。
                },
            };
        };
    }
    /**
     * 执行1次，若干秒内，都不执行
     */
    static runOnlyOnce_inDuration() {
        // TODO 暂时还没想好。
    }
    /**
     * Loading加载提示
     */
    static loading() {
    }
    /**
     * 确认框
     */
    static ConfirmDialog() {
    }
}
/**
 * 应用于成员方法之上
 *        1.类的原型——成员方法名字——对象内部属性描述符
 *        2.FIXME 用箭头函数，避免this被指向别处
 */
CDecoratorU.log = (that, type = 'verbose') => {
    return (target, name, descriptor) => {
        DebugU.l(LogE.decorator, 'target', target);
        DebugU.l(LogE.decorator, 'descriptor', descriptor);
        const method = descriptor.value; // 获取描述符的值——方法
        DebugU.l(LogE.decorator, 'method', method);
        descriptor.value = function (...args) {
            console.info(`${type} 正在进行：${name}(${args}) = ?`);
            let result;
            try {
                DebugU.l(LogE.decorator, 'target值', target);
                DebugU.l(LogE.decorator, 'that值', that);
                DebugU.l(LogE.decorator, 'this值', this);
                // 这种方式可以
                result = method.apply(this, args);
                // 这种方式不行
                // result = method.apply(target, args)
                console.info(`(${type}) 成功： ${name}(${args}) => ${result}`);
            }
            catch (err) {
                console.error(`(${type}) 失败： ${name}(${args}) => ${err}`);
            }
            return result;
        };
    };
};
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
class CDecoratorU_Helper {
    // TIP——————————————————————————————————内部方法————————————————————————————————————
    static __debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const that = this;
            const args = arguments;
            if (timeout) {
                clearTimeout(timeout);
            }
            if (immediate) {
                const callNow = !timeout;
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
    }
    static __throttle(func, wait, __options) {
        let timeout;
        let that;
        let args;
        let result;
        let previous = 0;
        let options = __options;
        if (!options) {
            options = {};
        }
        const later = function () {
            previous = options.leading === false ? 0 : new Date().valueOf();
            timeout = null;
            result = func.apply(that, args);
            console.log('later中，执行了1次方法');
            if (!timeout) {
                that = args = null;
            }
        };
        const throttled = function () {
            const now = new Date().valueOf();
            if (!previous && options.leading === false) { // 这句话，是处理【不要leading】的情况
                console.log('不要leading的情况');
                previous = now;
            }
            const remaining = wait - (now - previous);
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
    }
    static __runOnlyOnce_inDuration(func, wait, immediate) {
        // TODO 暂时还没想好
    }
}
//# sourceMappingURL=common-decorator.js.map