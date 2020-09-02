/**
 * 下拉选项的配置类
 */
export declare class MyFormItem_SelectOptionConf<SOption> {
    enumOptions: SOption;
    mustParseInt_toFitBackend: boolean;
    constructor(enumOptions: SOption);
    setParseInt(____mustParseInt_toFitBackend: boolean): MyFormItem_SelectOptionConf<SOption>;
}
export declare const data_elTagColorFilter: IndexedObj;
/**
 * 表单Item类
 */
export declare abstract class MyEl_FormItem<SOption> {
    myCategory: MyFormItem_Category;
    prop_AND_bindValue: string;
    label: string;
    placeholder: string;
    selectOptionConf: MyFormItem_SelectOptionConf<SOption>;
    constructor(prop_AND_bindValue: string, label: string, myCategory?: MyFormItem_Category, // 不填则默认text
    placeholder?: string, // 不填则默认''
    selectOptionConf?: MyFormItem_SelectOptionConf<SOption>);
}
/**
 * 适用于Dialog的表单子类。
 */
export interface MyDialogFormItem_Conf extends Object {
    disableItem?: boolean;
    notRenderItem?: boolean;
    [key: string]: any;
}
export declare abstract class MyEl_FormItem__inDialog<SOption> extends MyEl_FormItem<SOption> {
    config: MyDialogFormItem_Conf;
    setDialogConfig(__config: MyDialogFormItem_Conf): this;
}
/**
 * 表单校验的总配置
 */
export interface MyEl_FormItem_Rule_Config {
    [key: string]: Array<MyEl_RuleItem>;
}
declare type MyElForm_TriggerType = 'blur' | 'change';
declare type validatorCB_Success = () => void;
declare type validatorCB_Failure = (err: Error) => void;
declare type MyElForm_validatorType = (rule: object, formValue: any, callback: (validatorCB_Success | validatorCB_Failure)) => void;
/**
 * 表单校验的Item
 */
export declare class MyEl_RuleItem {
    required: boolean;
    message: string;
    trigger: MyElForm_TriggerType;
    validator?: MyElForm_validatorType;
    constructor(/*propName: string,*/ message: string, required?: boolean, trigger?: MyElForm_TriggerType, __validator?: MyElForm_validatorType);
}
/**
 * 表格的Column配置
 */
export declare class MyElement_TableCol<SOption> {
    myCategory: MyTableCol_Category;
    label: string;
    prop: string;
    'min-width': string;
    selectOptionEnum?: SOption;
    rowTransformerFunc: (row: any, fieldProp: string) => string;
    constructor(prop: string, label: string, min_width: string, myCategory?: MyTableCol_Category, // 不填则默认text
    selectOptionEnum?: SOption, // 不填则默认{}
    rowTransformerFunc?: Origin__RowTransformFn);
}
/**
 * El卡片的配置类
 *
 * TODO 具体使用方式：查看  PlayerDetail_Page.vue 文件。
 */
export declare class MyEl_Cards {
    array: Array<MyEl_OneCard>;
    constructor(array: Array<MyEl_OneCard>);
}
export declare class MyEl_OneCard {
    cardTitle: string;
    rows: Array<MyEl_OneRow>;
    constructor(cardTitle: string, rows: Array<MyEl_OneRow>);
}
declare type MyEl_OneRow = Array<MyEl_OneCol>;
export declare class MyEl_OneCol {
    leftLabel: string;
    rightProp: string;
    constructor(leftLabel: string, rightProp: string);
}
export {};
//# sourceMappingURL=MyElementUtils.d.ts.map