/**
 * 表单校验的总配置
 */
export interface xX_MyEl_FormItem_Rule_Config {
    [key: string]: xX_MyEl_RuleItem[];
}
declare type MyElForm_TriggerType = 'blur' | 'change';
declare type validatorCB_Success = () => void;
declare type validatorCB_Failure = (err: Error) => void;
declare type MyElForm_validatorType = (rule: object, formValue: any, callback: (validatorCB_Success | validatorCB_Failure)) => void;
/**
 * 表单校验的Item
 */
export declare class xX_MyEl_RuleItem {
    required: boolean;
    message: string;
    trigger: MyElForm_TriggerType;
    validator?: MyElForm_validatorType;
    constructor(/*propName: string,*/ message: string, required?: boolean, trigger?: MyElForm_TriggerType, __validator?: MyElForm_validatorType);
}
export {};
//# sourceMappingURL=ElRuleItem.d.ts.map