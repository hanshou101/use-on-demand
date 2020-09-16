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
interface Optional<T = Default_valueFunction_RtnType> {
    width?: number;
    minWidth?: number;
    showOverflowTooltip?: boolean;
    valueFunction?: RowTransformFn<T>;
    i18nKey?: string;
}
interface ElementTableColumnAttrs {
    fixed: 'right' | 'left';
    align: 'center' | 'right' | 'left';
}
export declare namespace xX_Father_ElTItem {
    abstract class Base<T = Default_valueFunction_RtnType> {
        label: string;
        prop: string;
        name: string;
        width?: number;
        minWidth: number;
        showOverflowTooltip?: boolean;
        valueFunction?: RowTransformFn<T>;
        protected constructor(require: Require | null, optional?: Optional<T>);
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
    class EnumTag<SOption> extends Base {
        readonly type = "enumTag";
        selectOption: SOption;
        colorTrans?: (typeNum: string) => string;
        constructor(require: Require & {
            selectOption: SOption;
        }, optional?: Optional & {
            colorTrans?: (typeNum: string) => string;
        });
    }
    class I18NDisplay extends Base {
        readonly type = "langTag";
        constructor(require: Require, optional?: Optional);
    }
    class Image<T = string> extends Base<T> {
        readonly type = "image";
        constructor(require: Require, optional?: Optional<T>);
    }
    class ImageList<T = Array<string>> extends Base<T> {
        readonly type = "imageList";
        constructor(require: Require, optional?: Optional<T>);
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
        pairs: Array<DetailInfoPair>;
        leftEm?: number;
        constructor(require: Require & {
            pairs: Array<DetailInfoPair>;
        }, optional?: Optional & {
            leftEm?: number;
        });
    }
}
export {};
//# sourceMappingURL=ElTItem.d.ts.map