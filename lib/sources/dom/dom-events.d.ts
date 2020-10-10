interface My_DragItems_CB {
    plainString_CB?: (str: string) => void;
    htmlMultiString_CB?: (str: string) => void;
    uriOrLink_pathString_CB?: (str: string) => void;
    file_CB?: (file: File | null) => void;
}
/**
 * TODO 这里  GlobalEventHandlers ，似乎不如直接声明具体类型好用…………
 */
declare type MyEventTarget = (/*GlobalEventHandlers |*/ HTMLElement | Window) & {
    _events?: {
        [key: string]: any;
    };
};
declare global {
    type KeyCode_MAP_Type = typeof xX_BrowserEventMap.KEYBOARD.KeyCode_MAP;
    type KeyCode_MAP_Type__Keys = keyof KeyCode_MAP_Type;
    type KeyCode_MAP_Type__Values = KeyCode_MAP_Type[KeyCode_MAP_Type__Keys];
}
export declare class xX_DomEvt_Helper {
    /**
     * 绑定事件
     * @param ele dom元素
     * @param eventName 事件名称
     * @param fn 事件回调函数
     */
    bindEvt(ele: MyEventTarget, eventName: string | unknown, fn: (e: Event) => any): void;
    /**
     * 解绑事件
     * @param ele dom元素
     * @param eventName 事件名称
     * @param fn 事件回调函数
     */
    unbindEvt(ele: MyEventTarget, eventName: string | unknown, fn: (e: Event) => any): void;
    /**
     * 当【Dom拖动操作】时，处理被拖动条目————【TransferItems】。
     */
    onDragDom_handleDataTransferItems(items: DataTransferItemList, callbackBundle: My_DragItems_CB): void;
}
export declare class xX_BrowserEventMap {
    static MOUSE: {
        click: string;
        dblclick: string;
        contextmenu: string;
        mousedown: string;
        mousemove: string;
        mouseup: string;
        mouseenter: string;
        mouseover: string;
        mouseout: string;
        BUTTON_TYPE: {
            LeftButton: number;
            RightButton: number;
        };
    };
    static KEYBOARD: {
        readonly keypress: "keypress";
        readonly keydown: "keydown";
        readonly keyup: "keyup";
        /**
         * 参考资料：
         *          键盘按钮keyCode大全，keyCode列表对照表 - 如果声音记得 - 博客园 - https://www.cnblogs.com/jf-guo/p/5235136.html
         */
        readonly KeyCode_MAP: {
            readonly 0: 48;
            readonly 1: 49;
            readonly 2: 50;
            readonly 3: 51;
            readonly 4: 52;
            readonly 5: 53;
            readonly 6: 54;
            readonly 7: 55;
            readonly 8: 56;
            readonly 9: 57;
            readonly A: 65;
            readonly B: 66;
            readonly C: 67;
            readonly D: 68;
            readonly E: 69;
            readonly F: 70;
            readonly G: 71;
            readonly H: 72;
            readonly I: 73;
            readonly J: 74;
            readonly K: 75;
            readonly L: 76;
            readonly M: 77;
            readonly N: 78;
            readonly O: 79;
            readonly P: 80;
            readonly Q: 81;
            readonly R: 82;
            readonly S: 83;
            readonly T: 84;
            readonly U: 85;
            readonly V: 86;
            readonly W: 87;
            readonly X: 88;
            readonly Y: 89;
            readonly Z: 90;
            readonly F1: 112;
            readonly F2: 113;
            readonly F3: 114;
            readonly F4: 115;
            readonly F5: 116;
            readonly F6: 117;
            readonly F7: 118;
            readonly F8: 119;
            readonly F9: 120;
            readonly F10: 121;
            readonly F11: 122;
            readonly F12: 123;
            readonly BackSpace: 8;
            readonly Tab: 9;
            readonly Enter: 13;
            readonly Caps_Lock: 20;
            readonly Control: 17;
            readonly Shift: 16;
            readonly Alt: 18;
            readonly Left_Arrow: 37;
            readonly Up_Arrow: 38;
            readonly Right_Arrow: 39;
            readonly Down_Arrow: 40;
            readonly Insert: 45;
            readonly Delete: 46;
            readonly Num_Lock: 144;
        };
        /**
         * 参考资料：
         *          浅谈JavaScript中按键事件的e.keyCode || e.which || e.charCode - 筱葭的博客 - CSDN博客 - https://blog.csdn.net/zhouziyu2011/article/details/53978293
         */
        readonly getKeyCode: (__e: Event) => number;
    };
    static ClipBoard: {
        copy: string;
        paste: string;
        cut: string;
    };
    static DragDom: {
        fromSelf: {
            /**
             * TODO 以下的事件，针对DOM自身被拖动。
             */
            drag: string;
            dragstart: string;
            dragend: string;
        };
        fromOthers: {
            /**
             * TODO 以下的事件，针对DOM自身没被拖动。  而是其他元素，被拖到了DOM之上来。
             */
            dragenter: string;
            dragleave: string;
            dragover: string;
            /**
             * 一些关于【drop】的坑
             * 1.想要触发drop事件的话，必须
             *            1.1 在dragover事件中使用event.preventDefault();阻止默认事件，才能触发drop事件
             *            1.2 参考资料：HTML5拖放API Drag and Drop - Leechikit的专栏 - SegmentFault 思否 - https://segmentfault.com/a/1190000010127530
             */
            drop: string;
        };
        __dataTransfer__dropEffect_Enum: {
            move: string;
            copy: string;
            link: string;
            none: string;
        };
        __dataTransfer__effectAllowed_Enum: {
            none: string;
            copy: string;
            copyLink: string;
            copyMove: string;
            link: string;
            linkMove: string;
            move: string;
            all: string;
            uninitialized: string;
        };
    };
    static Touch: {
        touchstart: string;
        touchmove: string;
        touchend: string;
        touchcancel: string;
    };
    static Window: {
        abort: string;
        afterprint: string;
        beforeprint: string;
        beforeunload: string;
        blur: string;
        canplay: string;
        canplaythrough: string;
        change: string;
        click: string;
        compassneedscalibration: string;
        contextmenu: string;
        dblclick: string;
        devicelight: string;
        devicemotion: string;
        deviceorientation: string;
        drag: string;
        dragend: string;
        dragenter: string;
        dragleave: string;
        dragover: string;
        dragstart: string;
        drop: string;
        durationchange: string;
        emptied: string;
        ended: string;
        error: string;
        focus: string;
        hashchange: string;
        input: string;
        invalid: string;
        keydown: string;
        keypress: string;
        keyup: string;
        load: string;
        loadeddata: string;
        loadedmetadata: string;
        loadstart: string;
        message: string;
        mousedown: string;
        mouseenter: string;
        mouseleave: string;
        mousemove: string;
        mouseout: string;
        mouseover: string;
        mouseup: string;
        mousewheel: string;
        MSGestureChange: string;
        MSGestureDoubleTap: string;
        MSGestureEnd: string;
        MSGestureHold: string;
        MSGestureStart: string;
        MSGestureTap: string;
        MSInertiaStart: string;
        MSPointerCancel: string;
        MSPointerDown: string;
        MSPointerEnter: string;
        MSPointerLeave: string;
        MSPointerMove: string;
        MSPointerOut: string;
        MSPointerOver: string;
        MSPointerUp: string;
        offline: string;
        online: string;
        orientationchange: string;
        pagehide: string;
        pageshow: string;
        pause: string;
        play: string;
        playing: string;
        popstate: string;
        progress: string;
        ratechange: string;
        readystatechange: string;
        reset: string;
        resize: string;
        scroll: string;
        seeked: string;
        seeking: string;
        select: string;
        stalled: string;
        storage: string;
        submit: string;
        suspend: string;
        timeupdate: string;
        unload: string;
        volumechange: string;
        vrdisplayactivate: string;
        vrdisplayblur: string;
        vrdisplayconnect: string;
        vrdisplaydeactivate: string;
        vrdisplaydisconnect: string;
        vrdisplayfocus: string;
        vrdisplaypointerrestricted: string;
        vrdisplaypointerunrestricted: string;
        vrdisplaypresentchange: string;
        waiting: string;
    };
}
export {};
//# sourceMappingURL=dom-events.d.ts.map