import { __extends } from "tslib";
import { MyFormItem_SelectOptionConf } from './MyElementUtils';
// tslint:disable-next-line:no-namespace
export var Father_ElFItem;
(function (Father_ElFItem) {
    var Base = /** @class */ (function () {
        function Base(require, optional) {
            this.config = {
                notRenderItem: false,
                disableItem: false,
            };
            if (require) {
                var name_1 = require.name, label = require.label;
                this.prop_AND_bindValue = name_1;
                this.name = name_1;
                this.label = label;
            }
            if (optional) {
                var placeholder = optional.placeholder, render = optional.render, disabled = optional.disabled, labelWidth = optional.labelWidth;
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
        Base.prototype.add_prepend_and_append = function (item, optional) {
            if (optional != undefined) {
                var prepend = optional.prepend, append = optional.append;
                item.prepend = prepend != undefined ? prepend : item.prepend;
                item.append = append != undefined ? append : item.append;
            }
        };
        return Base;
    }());
    Father_ElFItem.Base = Base;
    var Text = /** @class */ (function (_super) {
        __extends(Text, _super);
        function Text(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'text'; // 该属性，不能使用static。否则Vue将不会取到。
            if (optional != undefined) {
                _this.add_prepend_and_append(_this, optional); // 处理 prepend、append。
            }
            return _this;
        }
        return Text;
    }(Base));
    Father_ElFItem.Text = Text;
    var TextArea = /** @class */ (function (_super) {
        __extends(TextArea, _super);
        function TextArea(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'textarea'; // 该属性，不能使用static。否则Vue将不会取到。
            return _this;
        }
        return TextArea;
    }(Base));
    Father_ElFItem.TextArea = TextArea;
    // 抽象基类
    var Base__Translate = /** @class */ (function (_super) {
        __extends(Base__Translate, _super);
        function Base__Translate(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            console.log('——————————————————————注意——————————————————————————');
            console.log('1.使用【国际化的FormItem】时，注意一定要在    【ruleForm】里面，放入【translate】变量！！！否则无法激活  【双向绑定】');
            console.log('2.如果需要【回显】，在  updateCallback 方法里，需要加入  【fetch】模式的combine_MultiLangPlus方法逻辑');
            console.log('3.如果需要【新增】，在  createCallback 方法里，需要加入  【upload】模式的combine_MultiLangPlus方法逻辑');
            console.log('4.如果需要【编辑】，在  createCallback 方法里，需要加入  【upload】模式的combine_MultiLangPlus方法逻辑');
            return _this;
        }
        return Base__Translate;
    }(Base));
    // TIP 【纯文本】多语言输入：单行
    var I18N_PureText_SingleLineInput = /** @class */ (function (_super) {
        __extends(I18N_PureText_SingleLineInput, _super);
        function I18N_PureText_SingleLineInput(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'lang_input'; // 该属性，不能使用static。否则Vue将不会取到。
            return _this;
        }
        return I18N_PureText_SingleLineInput;
    }(Base__Translate));
    Father_ElFItem.I18N_PureText_SingleLineInput = I18N_PureText_SingleLineInput;
    /**
     * TIP 【纯文本】多语言输入：多行
     *        1.参照【WelfareHammer_Order_CreateDialog】。
     */
    var I18N_PureText_TextArea = /** @class */ (function (_super) {
        __extends(I18N_PureText_TextArea, _super);
        function I18N_PureText_TextArea(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'lang_inputTextarea'; // 该属性，不能使用static。否则Vue将不会取到。
            return _this;
        }
        return I18N_PureText_TextArea;
    }(Base__Translate));
    Father_ElFItem.I18N_PureText_TextArea = I18N_PureText_TextArea;
    // TIP 【富文本】多语言输入：UEditor
    var I18N_RichText_UEditor = /** @class */ (function (_super) {
        __extends(I18N_RichText_UEditor, _super);
        function I18N_RichText_UEditor(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'lang_ueditor'; // 该属性，不能使用static。否则Vue将不会取到。
            return _this;
        }
        return I18N_RichText_UEditor;
    }(Base__Translate));
    Father_ElFItem.I18N_RichText_UEditor = I18N_RichText_UEditor;
    var Password = /** @class */ (function (_super) {
        __extends(Password, _super);
        function Password(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'password'; // 该属性，不能使用static。否则Vue将不会取到。
            return _this;
        }
        return Password;
    }(Base));
    Father_ElFItem.Password = Password;
    var Number = /** @class */ (function (_super) {
        __extends(Number, _super);
        function Number(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'number'; // 该属性，不能使用static。否则Vue将不会取到。
            if (optional != undefined) {
                console.log('开始添加append');
                _this.add_prepend_and_append(_this, optional); // 处理 prepend、append。
            }
            return _this;
        }
        return Number;
    }(Base));
    Father_ElFItem.Number = Number;
    var NumberRange = /** @class */ (function (_super) {
        __extends(NumberRange, _super);
        function NumberRange(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'number_range';
            _this.leftProp = require.leftProp;
            _this.rightProp = require.rightProp;
            if (optional != undefined) {
                if (optional.inputType != undefined) {
                    _this.inputType = optional.inputType;
                }
            }
            return _this;
        }
        return NumberRange;
    }(Base));
    Father_ElFItem.NumberRange = NumberRange;
    var UploadImg = /** @class */ (function (_super) {
        __extends(UploadImg, _super);
        function UploadImg(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'upload_img'; // 该属性，不能使用static。否则Vue将不会取到。
            _this.maxSize = 5242880; // 初始值（5MB）
            if (optional) {
                var uploadSingleImageSuccess_ExtraCb = optional.uploadSingleImageSuccess_ExtraCb, maxSize = optional.maxSize;
                if (uploadSingleImageSuccess_ExtraCb != undefined) {
                    _this.uploadSingleImageSuccess_ExtraCb = uploadSingleImageSuccess_ExtraCb;
                }
                if (maxSize != undefined) {
                    _this.maxSize = maxSize;
                }
            }
            return _this;
        }
        return UploadImg;
    }(Base));
    Father_ElFItem.UploadImg = UploadImg;
    var Options = /** @class */ (function (_super) {
        __extends(Options, _super);
        function Options(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'options';
            if (require) {
                var selectOptionConf = require.selectOptionConf;
                _this.selectOptionConf = new MyFormItem_SelectOptionConf(selectOptionConf.option).setParseInt(selectOptionConf.needParseInt);
            }
            return _this;
        }
        return Options;
    }(Base));
    Father_ElFItem.Options = Options;
    var SingleTime = /** @class */ (function (_super) {
        __extends(SingleTime, _super);
        function SingleTime(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'time';
            _this.format = 'HH:mm:ss'; // 默认值
            if (optional != undefined) {
                var format = optional.format;
                if (format != undefined) {
                    _this.format = format;
                }
            }
            return _this;
        }
        return SingleTime;
    }(Base));
    Father_ElFItem.SingleTime = SingleTime;
    var SingleDate = /** @class */ (function (_super) {
        __extends(SingleDate, _super);
        function SingleDate(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'single_date';
            _this.format = 'yyyy-MM-dd'; // 默认值
            if (optional != undefined) {
                var format = optional.format;
                if (format != undefined) {
                    _this.format = format;
                }
            }
            return _this;
        }
        return SingleDate;
    }(Base));
    Father_ElFItem.SingleDate = SingleDate;
    var TimeRange = /** @class */ (function (_super) {
        __extends(TimeRange, _super);
        function TimeRange(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'time_range';
            _this.format = 'HH:mm:ss'; // 默认值
            if (optional != undefined) {
                var format = optional.format;
                if (format != undefined) {
                    _this.format = format;
                }
            }
            return _this;
        }
        return TimeRange;
    }(Base));
    Father_ElFItem.TimeRange = TimeRange;
    var DateRange = /** @class */ (function (_super) {
        __extends(DateRange, _super);
        function DateRange(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'date_time'; // FIXME 此处，应该是【 date_range 】最为贴切；date_time这个带误导性的名称 是为了兼容以前的书写错误
            _this.format = 'yyyy-MM-dd'; // 默认值
            if (optional != undefined) {
                var format = optional.format;
                if (format != undefined) {
                    _this.format = format;
                }
            }
            return _this;
        }
        return DateRange;
    }(Base));
    Father_ElFItem.DateRange = DateRange;
    var DateTimeRange = /** @class */ (function (_super) {
        __extends(DateTimeRange, _super);
        function DateTimeRange(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'date_time_range';
            return _this;
        }
        return DateTimeRange;
    }(Base));
    Father_ElFItem.DateTimeRange = DateTimeRange;
    var DateTimeRangeBtn = /** @class */ (function (_super) {
        __extends(DateTimeRangeBtn, _super);
        function DateTimeRangeBtn(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.myCategory = 'date_time_range_btn';
            return _this;
        }
        return DateTimeRangeBtn;
    }(Base));
    Father_ElFItem.DateTimeRangeBtn = DateTimeRangeBtn;
})(Father_ElFItem || (Father_ElFItem = {}));
//# sourceMappingURL=ElFItem.js.map