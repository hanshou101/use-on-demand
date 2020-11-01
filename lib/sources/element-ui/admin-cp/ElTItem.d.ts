/**
 * 两个参数，一个必传参数对象，一个可选参数对象
 *
 * 回显表格，分为以下几类
 * 1.普通文本
 * 2.勾选框
 * 3.枚举字段
 * 4.国际化多语言显示
 * 5.图片
 * 6.自定义（？）
 */
interface Require {
    name: string;
    label: string;
}
declare type Default_valueFunction_RtnType = string;
interface Optional<RtnT = Default_valueFunction_RtnType> {
    width?: number;
    minWidth?: number;
    showOverflowTooltip?: boolean;
    valueFunction?: RowTransformFn<RtnT>;
    i18nKey?: string;
}
interface ElementTableColumnAttrs {
    fixed: 'right' | 'left';
    align: 'center' | 'right' | 'left';
}
export declare namespace xX_Father_ElTItem {
    abstract class Base<RtnT = Default_valueFunction_RtnType> {
        label: string;
        prop: string;
        name: string;
        width?: number;
        minWidth: number;
        showOverflowTooltip?: boolean;
        valueFunction?: RowTransformFn<RtnT>;
        protected constructor(require: Require | null, optional?: Optional<RtnT>);
    }
    class Text extends Base {
        readonly type = "text";
        constructor(require: Require, optional?: Optional);
    }
    class Selection extends Base {
        readonly type = "selection";
        selectableFunction?: SelectableFn;
        constructor(optional?: {
            selectableFunction?: SelectableFn;
        });
    }
    class EnumTag<T extends any> extends Base {
        readonly type = "enumTag";
        selectOption: T;
        colorTrans?: (typeNum: string) => string;
        constructor(require: Require & {
            selectOption: T;
        }, optional?: Optional & {
            colorTrans?: (typeNum: string) => string;
        });
    }
    class I18NDisplay extends Base {
        readonly type = "langTag";
        constructor(require: Require, optional?: Optional);
    }
    class Image<RtnT = string> extends Base<RtnT> {
        readonly type = "image";
        constructor(require: Require, optional?: Optional<RtnT>);
    }
    class ImageList<RtnT = string[]> extends Base<RtnT> {
        readonly type = "imageList";
        constructor(require: Require, optional?: Optional<RtnT>);
    }
    class Custom extends Base {
        readonly type: undefined;
        elementTableColumnAttrs?: ElementTableColumnAttrs;
        constructor(require: Require, optional?: Optional & {
            elementTableColumnAttrs?: ElementTableColumnAttrs;
        });
    }
    class DetailInfo extends Base {
        readonly type = "detailInfo";
        pairs: DetailInfoPair[];
        leftEm?: number;
        constructor(require: Require & {
            pairs: DetailInfoPair[];
        }, optional?: Optional & {
            leftEm?: number;
        });
    }
}
export {};
//# sourceMappingURL=ElTItem.d.ts.map