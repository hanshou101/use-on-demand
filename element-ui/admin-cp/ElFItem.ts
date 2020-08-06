import {ElUploadInternalFileDetail}                         from 'element-ui/types/upload';
import {MyDialogFormItem_Conf, MyFormItem_SelectOptionConf} from './MyElementUtils';

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
// 无论如何，都必传的字段
interface Require {
  // 所占用字段（和prop等值。一般用于  取值、唯一key、slot插槽 等）
  name: string;
  // 当前列标题
  label: string;
}

// 可以选填的字段
interface Optional {
  // 输入提示
  placeholder?: string;
  // 是否渲染显示
  render?: boolean;
  // 是否禁用
  disabled?: boolean;

  // Label宽度
  labelWidth?: string;

  // ——————————以前Table的
  // 国际化字段所用的键。（例子：table.username）
  i18nKey?: string;
}

type TranslateKey = 'translate' | 'translate_2' | 'translate_3' | 'translate_4' | 'translate_5';

interface HasPrependAppend {
  // 输入框的前置内容
  prepend?: string;
  // 输入框的后置内容
  append?: string;
}

// 此处，将常见的几种拆分字段，列举出供选
type Date_or_Time_Range_Types = 'dateRange' | 'paymentDateRange' | 'auditDateRange' | 'updateDateRange';

// tslint:disable-next-line:no-namespace
export namespace ElFItem {
  export abstract class Base {
    public readonly myCategory!: MyFormItem_Category;

    public label!: string;          // 显示的表头
    public prop_AND_bindValue!: string;           // 从listData中取变量的变量名
    public name!: string;           // 和prop保持一致？？？
    public config: MyDialogFormItem_Conf = {
      notRenderItem: false,           // 会渲染
      disableItem  : false,             // 不禁止
    };
    public placeholder?: string;    // 输入提示
    // Label宽度
    labelWidth?: string;

    protected constructor(require: Require, optional?: Optional) {                      // 处理通用逻辑
      if (require) {
        const {name, label}     = require;
        this.prop_AND_bindValue = name;
        this.name               = name;
        this.label              = label;
      }
      if (optional) {
        const {placeholder, render, disabled, labelWidth} = optional;
        this.placeholder                                  = placeholder != undefined ? placeholder : this.placeholder;
        this.config                                       = {
          notRenderItem: render != undefined ? (!render) : this.config.notRenderItem,
          disableItem  : disabled != undefined ? disabled : this.config.disableItem,
        };
        if (labelWidth) {
          console.warn('目前，仅仅【number_range】实现了  单个条目的labelWidth');
          this.labelWidth = labelWidth;   // 不设置默认值
        }
      }
    }


    protected add_prepend_and_append(item: HasPrependAppend, optional?: Optional & {
      // 输入框的前置内容
      prepend?: string;
      // 输入框的后置内容
      append?: string;
    }) {
      if (optional != undefined) {
        const {prepend, append} = optional;
        item.prepend            = prepend != undefined ? prepend : item.prepend;
        item.append             = append != undefined ? append : item.append;
      }
    }

  }

  export class Text extends Base implements HasPrependAppend {
    public readonly myCategory = 'text';  // 该属性，不能使用static。否则Vue将不会取到。
    public prepend ?: string;
    public append ?: string;

    constructor(require: Require, optional?: Optional & HasPrependAppend) {
      super(require, optional);
      if (optional != undefined) {
        this.add_prepend_and_append(this, optional);      // 处理 prepend、append。
      }
    }
  }

  export class TextArea extends Base {
    public readonly myCategory = 'textarea';  // 该属性，不能使用static。否则Vue将不会取到。

    constructor(require: Require, optional?: Optional) {
      super(require, optional);
    }
  }

  // 抽象基类
  abstract class Base__Translate extends Base {
    protected constructor(require: Require, optional?: Optional) {
      super(require, optional);
      console.log('——————————————————————注意——————————————————————————');
      console.log('1.使用【国际化的FormItem】时，注意一定要在    【ruleForm】里面，放入【translate】变量！！！否则无法激活  【双向绑定】');
      console.log('2.如果需要【回显】，在  updateCallback 方法里，需要加入  【fetch】模式的combine_MultiLangPlus方法逻辑');
      console.log('3.如果需要【新增】，在  createCallback 方法里，需要加入  【upload】模式的combine_MultiLangPlus方法逻辑');
      console.log('4.如果需要【编辑】，在  createCallback 方法里，需要加入  【upload】模式的combine_MultiLangPlus方法逻辑');
    }
  }

  // TIP 【纯文本】多语言输入：单行
  export class I18N_PureText_SingleLineInput extends Base__Translate {
    public readonly myCategory = 'lang_input';  // 该属性，不能使用static。否则Vue将不会取到。

    constructor(require: Require & {
      name: TranslateKey,
    }, optional?: Optional) {
      super(require, optional);
    }
  }

  /**
   * TIP 【纯文本】多语言输入：多行
   *        1.参照【WelfareHammer_Order_CreateDialog】。
   */
  export class I18N_PureText_TextArea extends Base__Translate {
    public readonly myCategory = 'lang_inputTextarea';  // 该属性，不能使用static。否则Vue将不会取到。

    constructor(require: Require & {
      name: TranslateKey,
    }, optional?: Optional) {
      super(require, optional);
    }
  }

  // TIP 【富文本】多语言输入：UEditor
  export class I18N_RichText_UEditor extends Base__Translate {
    public readonly myCategory = 'lang_ueditor';  // 该属性，不能使用static。否则Vue将不会取到。

    constructor(require: Require & {
      name: TranslateKey,
    }, optional?: Optional) {
      super(require, optional);
    }
  }


  export class Password extends Base {
    public readonly myCategory = 'password';  // 该属性，不能使用static。否则Vue将不会取到。

    constructor(require: Require, optional?: Optional) {
      super(require, optional);
    }
  }

  export class Number extends Base implements HasPrependAppend {
    public readonly myCategory = 'number';  // 该属性，不能使用static。否则Vue将不会取到。
    public prepend ?: string;
    public append ?: string;

    constructor(require: Require, optional?: Optional & HasPrependAppend) {
      super(require, optional);
      if (optional != undefined) {
        console.log('开始添加append');
        this.add_prepend_and_append(this, optional);      // 处理 prepend、append。
      }
    }
  }

  export class NumberRange extends Base {
    public readonly myCategory = 'number_range';

    // 复杂版本
    // public left!: { require: Require, optional?: Optional };
    // public right!: { require: Require, optional?: Optional };

    // 简单版本
    public leftProp!: string;
    public rightProp!: string;

    public inputType!: 'number';

    constructor(
      require: Require & {
        // 开始值保存的变量
        // left: { require: Require, optional?: Optional },
        // 结束值保存的变量
        // right: { require: Require, optional?: Optional },

        // 开始值保存的变量
        leftProp: string,
        // 结束值保存的变量
        rightProp: string,
      },
      optional?: Optional & {
        inputType?: 'number';
      }) {
      super(require, optional);
      this.leftProp  = require.leftProp;
      this.rightProp = require.rightProp;
      if (optional != undefined) {
        if (optional.inputType != undefined) {
          this.inputType = optional.inputType;
        }
      }
    }
  }

  export class UploadImg extends Base {
    public readonly myCategory = 'upload_img';  // 该属性，不能使用static。否则Vue将不会取到。
    public uploadSingleImageSuccess_ExtraCb?: (res: any, file: ElUploadInternalFileDetail) => void;
    public maxSize: number     = 5242880;           // 初始值（5MB）

    constructor(require: Require,
                optional?: Optional & {
                  // 额外的回调。（基本逻辑，已经内聚封装完毕；此处是额外的回调封装）
                  uploadSingleImageSuccess_ExtraCb?: (res: any, file: ElUploadInternalFileDetail) => void,
                  maxSize?: number,
                }) {
      super(require, optional);
      if (optional) {
        const {uploadSingleImageSuccess_ExtraCb, maxSize} = optional;
        if (uploadSingleImageSuccess_ExtraCb != undefined) {
          this.uploadSingleImageSuccess_ExtraCb = uploadSingleImageSuccess_ExtraCb;
        }
        if (maxSize != undefined) {
          this.maxSize = maxSize;
        }
      }
    }
  }

  export class Options extends Base {
    public readonly myCategory = 'options';
    public selectOptionConf!: MyFormItem_SelectOptionConf;

    constructor(require: Require & {
                  // 下拉框的候选项，一般写在common.ts里面
                  selectOptionConf: {
                    // 候选项
                    option: MySelectOption_Single;
                    // 是否进行parseInt转换
                    needParseInt: boolean;
                  },
                },
                optional?: Optional) {
      super(require, optional);
      if (require) {
        const {selectOptionConf} = require;
        this.selectOptionConf    = new MyFormItem_SelectOptionConf(selectOptionConf.option).setParseInt(selectOptionConf.needParseInt);
      }
    }
  }

  export class SingleTime extends Base {
    public readonly myCategory = 'time';
    public format: string      = 'HH:mm:ss';         // 默认值

    constructor(require: Require, optional?: Optional & {
      // 时间格式
      format?: 'HH:mm:ss' | 'HH:mm',
    }) {
      super(require, optional);
      if (optional != undefined) {
        const {format} = optional;
        if (format != undefined) {
          this.format = format;
        }
      }
    }
  }

  export class SingleDate extends Base {
    public readonly myCategory = 'single_date';
    public format: string      = 'yyyy-MM-dd';         // 默认值

    constructor(require: Require, optional?: Optional & {
      // 时间格式
      format?: 'yyyy-MM-dd' | 'yyyy-MM-dd HH:mm:ss',
    }) {
      super(require, optional);
      if (optional != undefined) {
        const {format} = optional;
        if (format != undefined) {
          this.format = format;
        }
      }
    }
  }

  export class TimeRange extends Base {
    public readonly myCategory = 'time_range';
    public format: string      = 'HH:mm:ss';         // 默认值

    constructor(require: Require, optional?: Optional & {
      // 时间格式
      format?: 'HH:mm:ss' | 'HH:mm',
    }) {
      super(require, optional);
      if (optional != undefined) {
        const {format} = optional;
        if (format != undefined) {
          this.format = format;
        }
      }
    }
  }

  export class DateRange extends Base {
    public readonly myCategory = 'date_time';   // FIXME 此处，应该是【 date_range 】最为贴切；date_time这个带误导性的名称 是为了兼容以前的书写错误
    public format: string      = 'yyyy-MM-dd';         // 默认值

    constructor(require: Require & {
      // 此处，将常见的几种拆分字段，列举出供选
      name: Date_or_Time_Range_Types,
    }, optional?: Optional & {
      // 时间格式
      format?: 'yyyy-MM-dd',
    }) {
      super(require, optional);
      if (optional != undefined) {
        const {format} = optional;
        if (format != undefined) {
          this.format = format;
        }
      }
    }
  }

  export class DateTimeRange extends Base {
    public readonly myCategory = 'date_time_range';

    constructor(require: Require, optional?: Optional) {
      super(require, optional);
    }
  }

  export class DateTimeRangeBtn extends Base {
    public readonly myCategory = 'date_time_range_btn';

    constructor(require: Require, optional?: Optional) {
      super(require, optional);
    }
  }

}
