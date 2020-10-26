import { __assign, __extends } from "tslib";
// tslint:disable-next-line:no-namespace
export var xX_Father_ElTItem;
(function (xX_Father_ElTItem) {
    // 基类
    var Base = /** @class */ (function () {
        function Base(require, optional) {
            this.minWidth = 110; // 最小宽度
            if (require) {
                var name_1 = require.name, label = require.label;
                this.prop = name_1;
                this.name = name_1;
                this.label = label;
            }
            if (optional) {
                var width = optional.width, minWidth = optional.minWidth, showOverflowTooltip = optional.showOverflowTooltip, valueFunction = optional.valueFunction;
                if (width != undefined) {
                    this.width = width;
                }
                if (minWidth != undefined) {
                    this.minWidth = minWidth;
                }
                if (showOverflowTooltip != undefined) {
                    this.showOverflowTooltip = showOverflowTooltip;
                }
                if (valueFunction != undefined) {
                    this.valueFunction = valueFunction;
                }
            }
        }
        return Base;
    }());
    xX_Father_ElTItem.Base = Base;
    // 普通文本
    var Text = /** @class */ (function (_super) {
        __extends(Text, _super);
        function Text(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.type = 'text'; // 该属性，不能使用static。否则Vue将不会取到。
            return _this;
        }
        return Text;
    }(Base));
    xX_Father_ElTItem.Text = Text;
    // 行首复选框
    var Selection = /** @class */ (function (_super) {
        __extends(Selection, _super);
        function Selection(optional) {
            var _this = _super.call(this, null) || this;
            _this.type = 'selection';
            if (optional != undefined) {
                var selectableFunction = optional.selectableFunction;
                if (selectableFunction !== undefined) {
                    _this.selectableFunction = selectableFunction;
                }
            }
            return _this;
        }
        return Selection;
    }(Base));
    xX_Father_ElTItem.Selection = Selection;
    // 枚举展示
    var EnumTag = /** @class */ (function (_super) {
        __extends(EnumTag, _super);
        function EnumTag(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.type = 'enumTag';
            if (require) {
                var selectOption = require.selectOption;
                _this.selectOption = selectOption;
            }
            if (optional != undefined) {
                var colorTrans = optional.colorTrans;
                if (colorTrans != undefined) {
                    console.log('colorTrans初始化了');
                    _this.colorTrans = colorTrans;
                }
            }
            return _this;
        }
        return EnumTag;
    }(Base));
    xX_Father_ElTItem.EnumTag = EnumTag;
    // 多语言国际化展示
    var I18NDisplay = /** @class */ (function (_super) {
        __extends(I18NDisplay, _super);
        function I18NDisplay(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            // public readonly type = 'i18nDisplay';
            _this.type = 'langTag'; // 此处，type的名称，略有改变
            return _this;
        }
        return I18NDisplay;
    }(Base));
    xX_Father_ElTItem.I18NDisplay = I18NDisplay;
    // 图片
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.type = 'image';
            return _this;
        }
        return Image;
    }(Base));
    xX_Father_ElTItem.Image = Image;
    // 图片列表（一组）
    var ImageList = /** @class */ (function (_super) {
        __extends(ImageList, _super);
        function ImageList(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.type = 'imageList';
            return _this;
        }
        return ImageList;
    }(Base));
    xX_Father_ElTItem.ImageList = ImageList;
    // 自定义插槽
    var Custom = /** @class */ (function (_super) {
        __extends(Custom, _super);
        function Custom(require, optional) {
            var _this = _super.call(this, require, optional) || this;
            _this.type = undefined; // 临时这样标记
            if (optional) {
                var minWidth = optional.minWidth, elementTableColumnAttrs = optional.elementTableColumnAttrs;
                _this.minWidth = minWidth != undefined ? minWidth : 180; // 对于宽度，额外处理一下
                if (elementTableColumnAttrs != undefined) {
                    _this.elementTableColumnAttrs = elementTableColumnAttrs;
                }
            }
            return _this;
        }
        return Custom;
    }(Base));
    xX_Father_ElTItem.Custom = Custom;
    // 详情多行字段展示
    var DetailInfo = /** @class */ (function (_super) {
        __extends(DetailInfo, _super);
        // public rightEm?: number;     // 后来发现，似乎用不到
        function DetailInfo(require, optional) {
            var _this = _super.call(this, __assign({}, require /*,name: require.name || '',       // 无name则默认空字符串*/), optional) || this;
            _this.type = 'detailInfo';
            _this.pairs = require.pairs;
            if (!optional || optional.minWidth == undefined) {
                _this.minWidth = 300; // 给一个默认宽度
            }
            if (optional) {
                var leftEm = optional.leftEm;
                if (leftEm != undefined) {
                    _this.leftEm = leftEm;
                }
                /*
                if (rightEm != undefined) {
                  this.rightEm = rightEm;
                }
                */
            }
            return _this;
        }
        return DetailInfo;
    }(Base));
    xX_Father_ElTItem.DetailInfo = DetailInfo;
})(xX_Father_ElTItem || (xX_Father_ElTItem = {}));
//# sourceMappingURL=ElTItem.js.map