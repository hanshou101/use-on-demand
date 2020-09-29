declare namespace EchoNS {
    interface EchoOption {
        offset?: number;
        throttle?: number;
        unload?: boolean;
        callback?(element: HTMLElement, op: string): void;
        offsetVertical?: number;
        offsetHorizontal?: number;
        offsetTop?: number;
        offsetBottom?: number;
        offsetLeft?: number;
        offsetRight?: number;
        debounce?: boolean;
    }
    interface EchoOffset {
        t: number;
        b: number;
        l: number;
        r: number;
    }
    export class Echo {
        private root;
        callback: EchoOption['callback'];
        offset: EchoOffset;
        poll: NullableType<number>;
        throttleDelay: number;
        useDebounce: boolean;
        unload: boolean;
        constructor(root: Window);
        init(opts?: EchoOption): void;
        render(context?: Document): void;
        detach(): void;
        private __debounceOrThrottle;
        private static __isHidden;
        private static __inView;
    }
    export {};
}
export declare class xX_DomLazyLoad_Helper {
    static Echo_ImgLazyLoader: typeof EchoNS.Echo;
}
export {};
//# sourceMappingURL=dom-lazyLoad.d.ts.map