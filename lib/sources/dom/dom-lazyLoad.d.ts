declare namespace EchoNS {
    interface EchoOption {
        offset?: number;
        throttle?: number;
        unload?: boolean;
        callback?(element: HTMLElement, op: 'load' | 'unload'): void;
        offsetVertical?: number;
        offsetHorizontal?: number;
        offsetTop?: number;
        offsetBottom?: number;
        offsetLeft?: number;
        offsetRight?: number;
        debounce?: boolean;
    }
    interface CustomViewPortOffset {
        t: number;
        b: number;
        l: number;
        r: number;
    }
    /**
     *
     */
    export class Echo {
        private root;
        callback: EchoOption['callback'];
        offsetCfg: CustomViewPortOffset;
        pollTimeout: NullableType<number>;
        throttleDelay: number;
        useDebounce: boolean;
        unload: boolean;
        private static readonly _selector;
        constructor(root: Window);
        init(opts?: EchoOption): void;
        render(context?: Document): void;
        detach(): void;
        /**
         * 【Window】加载完毕，和【scroll滚动】时，都会触发。
         * 				1.此处，如果使用了【防抖】
         * 						1.有【防抖】的话，则每次都会【清除定时器】。
         * 				2.如果，不存在【轮询定时器】
         * 						1.则，【新建定时器】。
         */
        private __ScrollOrLoad_debounceOrThrottle;
        /**
         * 是否处于【display:none】状态。
         * 				1.  display:none时，【offsetParent】为null  。
         */
        private static __isDisplayNone;
        /**
         * 判断【元素】是否在【视图】之内。
         */
        private static __inView;
    }
    export {};
}
export declare class xX_DomLazyLoad_Helper {
    static Echo_ImgLazyLoader: typeof EchoNS.Echo;
}
export {};
//# sourceMappingURL=dom-lazyLoad.d.ts.map