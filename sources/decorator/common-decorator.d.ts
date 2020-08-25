/**
 *  TODO 一些可以优化的点：
 *          1.【常用函数】，在合适的时机，可以考虑换成【lodash】所采用的方法。
 *          2.
 */
export declare class CDecoratorU {
    /**
     * 应用于成员方法之上
     *        1.类的原型——成员方法名字——对象内部属性描述符
     *        2.FIXME 用箭头函数，避免this被指向别处
     */
    static log: (type: string | undefined, that: any) => (target: {}, name: string, descriptor: PropertyDescriptor) => void;
    /**
     *  防抖
     *        1.【若干秒之后】，才执行，必定执行一次。
     */
    static debounce(wait: number, immediate?: boolean): (target: {}, key: string, descriptor: PropertyDescriptor) => {
        value: void;
        configurable?: boolean | undefined;
        enumerable?: boolean | undefined;
        writable?: boolean | undefined;
        get?(): any;
        set?(v: any): void;
    };
    /**
     *  节流
     *          1.马上执行
     *          2.但之后【若干秒之内的事件】，全部放到【若干秒后】，执行最后一次。
     */
    static throttle(wait: number, /*immediate: boolean = false*/ __options?: {
        leading?: boolean;
        trailing?: boolean;
    }): (this: any, target: {}, key: string, descriptor: PropertyDescriptor) => {
        /**
         * TIP 所有的函数形式，包括【Promise】/【异步】/【async/await】，都是支持的。
         */
        value: () => any;
        configurable?: boolean | undefined;
        enumerable?: boolean | undefined;
        writable?: boolean | undefined;
        get?(): any;
        set?(v: any): void;
    };
    /**
     * 执行1次，若干秒内，都不执行
     */
    static runOnlyOnce_inDuration(): void;
    /**
     * Loading加载提示
     */
    static loading(): void;
    /**
     * 确认框
     */
    static ConfirmDialog(): void;
}
//# sourceMappingURL=common-decorator.d.ts.map