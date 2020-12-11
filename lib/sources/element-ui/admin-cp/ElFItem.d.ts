import { ElUploadInternalFileDetail } from 'element-ui/types/upload';
declare namespace Old {
    /**
     * 下拉选项的配置类
     */
    class xX_MyFormItem_SelectOptionConf<T extends any> {
        enumOptions: T;
        mustParseInt_toFitBackend: boolean;
        constructor(enumOptions: T);
        setParseInt(____mustParseInt_toFitBackend: boolean): xX_MyFormItem_SelectOptionConf<T>;
    }
    /**
     * 适用于Dialog的表单子类。
     */
    interface xX_MyDialogFormItem_Conf extends Object {
        disableItem?: boolean;
        notRenderItem?: boolean;
        [key: string]: any;
    }
}
/**
 * 两个参数，一个必传参数对象，一个可选参数对象
 *
 * 提交表单，分为以下几类
 * 1.普通文本
 * 2.数字
 * 3.单选
 * 4.正数
 * 5.步进
 * 6.下拉选项map
 * 7.下拉选项array
 * 8.日期时间
 * 9.日期时间范围
 * 10.日期时间范围按钮
 * 11.自定义（？）
 * 12.上传图片
 * 13.多语言国际化输入
 * 14.多语言国际化富文本
 * 15.级联选择器
 */
interface Require {
    name: string;
    label: string;
}
interface Optional {
    placeholder?: string;
    render?: boolean;
    disabled?: boolean;
    labelWidth?: string;
    i18nKey?: string;
}
declare type TranslateKey = 'translate' | 'translate_2' | 'translate_3' | 'translate_4' | 'translate_5';
interface HasPrependAppend {
    prepend?: string;
    append?: string;
}
declare type Date_or_Time_Range_Types = 'dateRange' | 'paymentDateRange' | 'auditDateRange' | 'updateDateRange';
export declare namespace xX_Father_ElFItem {
    export abstract class Base {
        readonly myCategory: MyFormItem_Category;
        label: string;
        prop_AND_bindValue: string;
        name: string;
        config: Old.xX_MyDialogFormItem_Conf;
        placeholder?: string;
        labelWidth?: string;
        protected constructor(require: Require, optional?: Optional);
        protected add_prepend_and_append(item: HasPrependAppend, optional?: Optional & {
            prepend?: string;
            append?: string;
        }): void;
    }
    export class Text extends Base implements HasPrependAppend {
        readonly myCategory = "text";
        prepend?: string;
        append?: string;
        constructor(require: Require, optional?: Optional & HasPrependAppend);
    }
    export class TextArea extends Base {
        readonly myCategory = "textarea";
        constructor(require: Require, optional?: Optional);
    }
    abstract class Base__Translate extends Base {
        protected constructor(require: Require, optional?: Optional);
    }
    export class I18N_PureText_SingleLineInput extends Base__Translate {
        readonly myCategory = "lang_input";
        constructor(require: Require & {
            name: TranslateKey;
        }, optional?: Optional);
    }
    /**
     * TIP 【纯文本】多语言输入：多行
     *        1.参照【WelfareHammer_Order_CreateDialog】。
     */
    export class I18N_PureText_TextArea extends Base__Translate {
        readonly myCategory = "lang_inputTextarea";
        constructor(require: Require & {
            name: TranslateKey;
        }, optional?: Optional);
    }
    export class Single_RichText_Tinymce extends Base__Translate {
        readonly myCategory = "lang_single_tinymce";
        constructor(require: Require, optional?: Optional);
    }
    export class I18N_RichText_UEditor extends Base__Translate {
        readonly myCategory = "lang_ueditor";
        constructor(require: Require & {
            name: TranslateKey;
        }, optional?: Optional);
    }
    export class Password extends Base {
        readonly myCategory = "password";
        constructor(require: Require, optional?: Optional);
    }
    export class Number extends Base implements HasPrependAppend {
        readonly myCategory = "number";
        prepend?: string;
        append?: string;
        constructor(require: Require, optional?: Optional & HasPrependAppend);
    }
    export class NumberRange extends Base {
        readonly myCategory = "number_range";
        leftProp: string;
        rightProp: string;
        inputType: 'number';
        constructor(require: Require & {
            leftProp: string;
            rightProp: string;
        }, optional?: Optional & {
            inputType?: 'number';
        });
    }
    export class UploadImg extends Base {
        readonly myCategory = "upload_img";
        uploadSingleImageSuccess_ExtraCb?: (res: any, file: ElUploadInternalFileDetail) => void;
        maxSize: number;
        constructor(require: Require, optional?: Optional & {
            uploadSingleImageSuccess_ExtraCb?: (res: any, file: ElUploadInternalFileDetail) => void;
            maxSize?: number;
        });
    }
    export class Options<T extends any> extends Base {
        readonly myCategory = "options";
        selectOptionConf: Old.xX_MyFormItem_SelectOptionConf<T>;
        constructor(require: Require & {
            selectOptionConf: {
                option: T;
                needParseInt: boolean;
            };
        }, optional?: Optional);
    }
    export class SingleTime extends Base {
        readonly myCategory = "time";
        format: string;
        constructor(require: Require, optional?: Optional & {
            format?: 'HH:mm:ss' | 'HH:mm';
        });
    }
    export class SingleDate extends Base {
        readonly myCategory = "single_date";
        format: string;
        constructor(require: Require, optional?: Optional & {
            format?: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss';
        });
    }
    export class TimeRange extends Base {
        readonly myCategory = "time_range";
        format: string;
        constructor(require: Require, optional?: Optional & {
            format?: 'HH:mm:ss' | 'HH:mm';
        });
    }
    export class DateRange extends Base {
        readonly myCategory = "date_time";
        format: string;
        constructor(require: Require & {
            name: Date_or_Time_Range_Types;
        }, optional?: Optional & {
            format?: 'yyyy-MM-dd';
        });
    }
    export class DateTimeRange extends Base {
        readonly myCategory = "date_time_range";
        constructor(require: Require, optional?: Optional);
    }
    export class DateTimeRangeBtn extends Base {
        readonly myCategory = "date_time_range_btn";
        constructor(require: Require, optional?: Optional);
    }
    export {};
}
export {};
//# sourceMappingURL=ElFItem.d.ts.map