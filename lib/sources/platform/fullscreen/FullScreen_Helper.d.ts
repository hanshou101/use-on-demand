export declare class FullScreen_Helper {
    /**
     * 进入全屏
     */
    fullScreen(el?: HTMLElement): void;
    /**
     * 退出全屏
     */
    exitScreen(): void;
    /**
     * 获取【全屏事件】监听的【更强工具类】。
     */
    get_ChangeEvtListen_Util(): WatchFullScreenUtil;
}
declare type CbType = (this: Window, ev: Event) => void;
declare class WatchFullScreenUtil {
    private cb?;
    /**
     * 兼容更多事件类型。
     *        1.参考资料：MDN。
     */
    evtNames: Array<any>;
    bindEvent(_fn: CbType): void;
    removeEvent(): void;
}
export {};
//# sourceMappingURL=FullScreen_Helper.d.ts.map