import { MyFormItem_SelectOptionConf } from './MyElementUtils';
// tslint:disable-next-line:no-namespace
export var Father_ElFItem;
(function (Father_ElFItem) {
    class Base {
        constructor(require, optional) {
            this.config = {
                notRenderItem: false,
                disableItem: false,
            };
            if (require) {
                const { name, label } = require;
                this.prop_AND_bindValue = name;
                this.name = name;
                this.label = label;
            }
            if (optional) {
                const { placeholder, render, disabled, labelWidth } = optional;
                this.placeholder = placeholder != undefined ? placeholder : this.placeholder;
                this.config = {
                    notRenderItem: render != undefined ? (!render) : this.config.notRenderItem,
                    disableItem: disabled != undefined ? disabled : this.config.disableItem,
                };
                if (labelWidth) {
                    console.warn('目前，仅仅【number_range】实现了  单个条目的labelWidth');
                    this.labelWidth = labelWidth; // 不设置默认值
                }
            }
        }
        add_prepend_and_append(item, optional) {
            if (optional != undefined) {
                const { prepend, append } = optional;
                item.prepend = prepend != undefined ? prepend : item.prepend;
                item.append = append != undefined ? append : item.append;
            }
        }
    }
    Father_ElFItem.Base = Base;
    class Text extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'text'; // 该属性，不能使用static。否则Vue将不会取到。
            if (optional != undefined) {
                this.add_prepend_and_append(this, optional); // 处理 prepend、append。
            }
        }
    }
    Father_ElFItem.Text = Text;
    class TextArea extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'textarea'; // 该属性，不能使用static。否则Vue将不会取到。
        }
    }
    Father_ElFItem.TextArea = TextArea;
    // 抽象基类
    class Base__Translate extends Base {
        constructor(require, optional) {
            super(require, optional);
            console.log('——————————————————————注意——————————————————————————');
            console.log('1.使用【国际化的FormItem】时，注意一定要在    【ruleForm】里面，放入【translate】变量！！！否则无法激活  【双向绑定】');
            console.log('2.如果需要【回显】，在  updateCallback 方法里，需要加入  【fetch】模式的combine_MultiLangPlus方法逻辑');
            console.log('3.如果需要【新增】，在  createCallback 方法里，需要加入  【upload】模式的combine_MultiLangPlus方法逻辑');
            console.log('4.如果需要【编辑】，在  createCallback 方法里，需要加入  【upload】模式的combine_MultiLangPlus方法逻辑');
        }
    }
    // TIP 【纯文本】多语言输入：单行
    class I18N_PureText_SingleLineInput extends Base__Translate {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'lang_input'; // 该属性，不能使用static。否则Vue将不会取到。
        }
    }
    Father_ElFItem.I18N_PureText_SingleLineInput = I18N_PureText_SingleLineInput;
    /**
     * TIP 【纯文本】多语言输入：多行
     *        1.参照【WelfareHammer_Order_CreateDialog】。
     */
    class I18N_PureText_TextArea extends Base__Translate {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'lang_inputTextarea'; // 该属性，不能使用static。否则Vue将不会取到。
        }
    }
    Father_ElFItem.I18N_PureText_TextArea = I18N_PureText_TextArea;
    // TIP 【富文本】多语言输入：UEditor
    class I18N_RichText_UEditor extends Base__Translate {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'lang_ueditor'; // 该属性，不能使用static。否则Vue将不会取到。
        }
    }
    Father_ElFItem.I18N_RichText_UEditor = I18N_RichText_UEditor;
    class Password extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'password'; // 该属性，不能使用static。否则Vue将不会取到。
        }
    }
    Father_ElFItem.Password = Password;
    class Number extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'number'; // 该属性，不能使用static。否则Vue将不会取到。
            if (optional != undefined) {
                console.log('开始添加append');
                this.add_prepend_and_append(this, optional); // 处理 prepend、append。
            }
        }
    }
    Father_ElFItem.Number = Number;
    class NumberRange extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'number_range';
            this.leftProp = require.leftProp;
            this.rightProp = require.rightProp;
            if (optional != undefined) {
                if (optional.inputType != undefined) {
                    this.inputType = optional.inputType;
                }
            }
        }
    }
    Father_ElFItem.NumberRange = NumberRange;
    class UploadImg extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'upload_img'; // 该属性，不能使用static。否则Vue将不会取到。
            this.maxSize = 5242880; // 初始值（5MB）
            if (optional) {
                const { uploadSingleImageSuccess_ExtraCb, maxSize } = optional;
                if (uploadSingleImageSuccess_ExtraCb != undefined) {
                    this.uploadSingleImageSuccess_ExtraCb = uploadSingleImageSuccess_ExtraCb;
                }
                if (maxSize != undefined) {
                    this.maxSize = maxSize;
                }
            }
        }
    }
    Father_ElFItem.UploadImg = UploadImg;
    class Options extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'options';
            if (require) {
                const { selectOptionConf } = require;
                this.selectOptionConf = new MyFormItem_SelectOptionConf(selectOptionConf.option).setParseInt(selectOptionConf.needParseInt);
            }
        }
    }
    Father_ElFItem.Options = Options;
    class SingleTime extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'time';
            this.format = 'HH:mm:ss'; // 默认值
            if (optional != undefined) {
                const { format } = optional;
                if (format != undefined) {
                    this.format = format;
                }
            }
        }
    }
    Father_ElFItem.SingleTime = SingleTime;
    class SingleDate extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'single_date';
            this.format = 'yyyy-MM-dd'; // 默认值
            if (optional != undefined) {
                const { format } = optional;
                if (format != undefined) {
                    this.format = format;
                }
            }
        }
    }
    Father_ElFItem.SingleDate = SingleDate;
    class TimeRange extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'time_range';
            this.format = 'HH:mm:ss'; // 默认值
            if (optional != undefined) {
                const { format } = optional;
                if (format != undefined) {
                    this.format = format;
                }
            }
        }
    }
    Father_ElFItem.TimeRange = TimeRange;
    class DateRange extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'date_time'; // FIXME 此处，应该是【 date_range 】最为贴切；date_time这个带误导性的名称 是为了兼容以前的书写错误
            this.format = 'yyyy-MM-dd'; // 默认值
            if (optional != undefined) {
                const { format } = optional;
                if (format != undefined) {
                    this.format = format;
                }
            }
        }
    }
    Father_ElFItem.DateRange = DateRange;
    class DateTimeRange extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'date_time_range';
        }
    }
    Father_ElFItem.DateTimeRange = DateTimeRange;
    class DateTimeRangeBtn extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.myCategory = 'date_time_range_btn';
        }
    }
    Father_ElFItem.DateTimeRangeBtn = DateTimeRangeBtn;
})(Father_ElFItem || (Father_ElFItem = {}));
//# sourceMappingURL=ElFItem.js.map