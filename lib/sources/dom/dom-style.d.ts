interface MyAbsolutePosition {
    top: number;
    left: number;
}
export declare class xX_DomStyle_Helper {
    /**
     * 获取元素的css属性值
     */
    static getDomStyle(ele: HTMLElement, // 元素
    cssAttribute: string): string | number | undefined;
    /**
     * 【浏览器窗口】，内部内容区域，宽高
     */
    static getDocumentWidthHeight(): {
        width: number;
        height: number;
    };
    /**
     * 获取元素距【浏览器文档最顶部、最左边】的距离
     */
    static get_AbsoluteOffset_Position(ele: HTMLElement): MyAbsolutePosition;
    /**
     *  获取以下距离：
     *        1.【元素底部】，到【Window可见区域  底部】的距离
     *        2.【元素右侧】，到【Window可见区域  右侧】的距离。
     */
    static get_eB2wB_eR2wR(e: HTMLElement): {
        eB2wB: number;
        eR2wR: number;
        domAttr: {
            posit: MyAbsolutePosition;
            oHeight: number;
            oWidth: number;
        };
        wAttr: {
            visibleH: number;
            visibleW: number;
        };
    };
    /**
     * 兼容性：获取浏览器滚动条距离顶部的位置
     */
    static getScrollTop(): number;
    /**
     * 获取兄弟节点
     */
    static getSiblingsDoms(ele: HTMLElement): Array<HTMLElement>;
    /**
     * 兼容性：判断两个元素是否是包含关系。（无限层级）
     *        1.无限个层级，都有效，
     */
    static isContains_otherEle(ele: HTMLElement, // 父级元素
    _childEle: Node): boolean;
    /**
     * 修复，Android下【软键盘】弹出时，导致的【VH不准确】的问题。
     */
    static fix_AndroidKeyboard_errorVH(timeout?: number): void;
    /**
     * 浏览器，是否支持【某个CSS属性】
     */
    isSupport_CssProperty(key: string): string | undefined;
}
export {};
//# sourceMappingURL=dom-style.d.ts.map