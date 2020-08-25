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
export declare class DomEvt_Helper {
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
export declare class BrowserEventMap {
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
        keypress: string;
        keydown: string;
        keyup: string;
        /**
         * 参考资料：
         *          键盘按钮keyCode大全，keyCode列表对照表 - 如果声音记得 - 博客园 - https://www.cnblogs.com/jf-guo/p/5235136.html
         */
        KeyCode_MAP: {
            0: number;
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
            6: number;
            7: number;
            8: number;
            9: number;
            A: number;
            B: number;
            C: number;
            D: number;
            E: number;
            F: number;
            G: number;
            H: number;
            I: number;
            J: number;
            K: number;
            L: number;
            M: number;
            N: number;
            O: number;
            P: number;
            Q: number;
            R: number;
            S: number;
            T: number;
            U: number;
            V: number;
            W: number;
            X: number;
            Y: number;
            Z: number;
            F1: number;
            F2: number;
            F3: number;
            F4: number;
            F5: number;
            F6: number;
            F7: number;
            F8: number;
            F9: number;
            F10: number;
            F11: number;
            F12: number;
            BackSpace: number;
            Tab: number;
            Enter: number;
            Caps_Lock: number;
            Control: number;
            Shift: number;
            Alt: number;
            Left_Arrow: number;
            Up_Arrow: number;
            Right_Arrow: number;
            Down_Arrow: number;
            Insert: number;
            Delete: number;
            Num_Lock: number;
        };
        /**
         * 参考资料：
         *          浅谈JavaScript中按键事件的e.keyCode || e.which || e.charCode - 筱葭的博客 - CSDN博客 - https://blog.csdn.net/zhouziyu2011/article/details/53978293
         */
        getKeyCode(__e: Event): number;
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