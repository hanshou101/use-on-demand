/**
 * 表单校验的总配置
 */
export interface xX_MyEl_FormItem_Rule_Config {
  [key: string]: xX_MyEl_RuleItem[];
}//
type MyElForm_TriggerType = 'blur' | 'change';   //

type validatorCB_Success = () => void;
type validatorCB_Failure = (err: Error) => void;   //
type MyElForm_validatorType = (rule: object, formValue: any, callback: (validatorCB_Success | validatorCB_Failure)) => void;  //



/**
 * 表单校验的Item
 */
export class xX_MyEl_RuleItem {
  // propName: string;
  public required: boolean;
  public message: string;
  public trigger: MyElForm_TriggerType;//
  public validator?: MyElForm_validatorType;//
  constructor(/*propName: string,*/
              message: string,
              required: boolean             = true,
              trigger: MyElForm_TriggerType = 'blur',
              __validator?: MyElForm_validatorType,   // 注意，没有默认值
  ) {
    // 必填
    // this.propName = propName;
    this.message  = message;
    // 可选
    this.required = required;
    this.trigger  = trigger;

    // 没有默认值的可选
    if (__validator) {
      this.validator = __validator;
    }
  }
}
