import { __extends } from "tslib";
/**
 * 下拉选项的配置类
 */
var MyFormItem_SelectOptionConf = /** @class */ (function () {
    function MyFormItem_SelectOptionConf(enumOptions) {
        this.mustParseInt_toFitBackend = false; // TODO 是否必须转化为Int（原因是，后台有时用Int做枚举，有时用String做枚举；  回显时需要注意；）
        this.enumOptions = enumOptions;
    } //
    MyFormItem_SelectOptionConf.prototype.setParseInt = function (____mustParseInt_toFitBackend) {
        this.mustParseInt_toFitBackend = ____mustParseInt_toFitBackend;
        return this;
    };
    return MyFormItem_SelectOptionConf;
}());
export { MyFormItem_SelectOptionConf };
// TIP 颜色枚举
export var data_elTagColorFilter = {
    0: 'danger',
    1: 'success',
    2: 'info',
    3: 'primary',
    4: 'warning',
};
/**
 * 表单Item类
 */
var MyEl_FormItem = /** @class */ (function () {
    function MyEl_FormItem(prop_AND_bindValue, label, myCategory, // 不填则默认text
    placeholder, // 不填则默认''
    // TODO // 不填则：默认无选项，且回显时，不转化为Int（保留字符串的样子）
    selectOptionConf) {
        if (myCategory === void 0) { myCategory = 'text'; }
        if (placeholder === void 0) { placeholder = ''; }
        if (selectOptionConf === void 0) { selectOptionConf = new MyFormItem_SelectOptionConf({ test: '测试专用' }).setParseInt(false); }
        // 必填
        this.prop_AND_bindValue = prop_AND_bindValue;
        this.label = label;
        // 可选
        this.myCategory = myCategory;
        this.placeholder = placeholder;
        this.selectOptionConf = selectOptionConf;
    }
    return MyEl_FormItem;
}());
export { MyEl_FormItem };
var MyEl_FormItem__inDialog = /** @class */ (function (_super) {
    __extends(MyEl_FormItem__inDialog, _super);
    function MyEl_FormItem__inDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = {}; //
        return _this;
    }
    MyEl_FormItem__inDialog.prototype.setDialogConfig = function (__config) {
        // TODO 此处，逐条地进行判断；防止出现，属性被【无意中undefined】覆盖的情况。
        for (var key in __config) { // 遍历属性
            if (__config.hasOwnProperty(key)) { // 判断属性是否存
                if (typeof __config[key] !== 'undefined') { // TODO 此处，特别注意，强行把（有意、无意）的undefined值，都排除了出去
                    this.config[key] = __config[key];
                }
            }
        }
        if (__config.disableItem) {
            this.config.disableItem = __config.disableItem;
        }
        if (__config.notRenderItem) {
            this.config.notRenderItem = __config.notRenderItem;
        }
        return this;
    };
    return MyEl_FormItem__inDialog;
}(MyEl_FormItem));
export { MyEl_FormItem__inDialog };
/**
 * 表单校验的Item
 */
var MyEl_RuleItem = /** @class */ (function () {
    function MyEl_RuleItem(/*propName: string,*/ message, required, trigger, __validator) {
        if (required === void 0) { required = true; }
        if (trigger === void 0) { trigger = 'blur'; }
        // 必填
        // this.propName = propName;
        this.message = message;
        // 可选
        this.required = required;
        this.trigger = trigger;
        // 没有默认值的可选
        if (__validator) {
            this.validator = __validator;
        }
    }
    return MyEl_RuleItem;
}());
export { MyEl_RuleItem };
/**
 * 表格的Column配置
 */
var MyElement_TableCol = /** @class */ (function () {
    function MyElement_TableCol(prop, label, min_width, myCategory, // 不填则默认text
    // FIXME 可能要绑在，某个实体类上面，以此获得泛型？？？
    selectOptionEnum, // 不填则默认{}
    // TODO 此处，尝试一种新的转值方式
    // text_transformerFunc: (text: string) => string    // 默认原样返回。
    //                                                             = (text) => text,
    rowTransformerFunc) {
        if (myCategory === void 0) { myCategory = 'text'; }
        if (rowTransformerFunc === void 0) { rowTransformerFunc = function (row, fieldProp) { return row[fieldProp]; }; }
        // 必填
        this.prop = prop;
        this.label = label;
        this['min-width'] = min_width;
        // 可选
        this.myCategory = myCategory;
        if (selectOptionEnum) {
            this.selectOptionEnum = selectOptionEnum; // 有传入的情况下，才赋值
        }
        // TODO 此处，尝试一种新的转值方式
        // this.text_transformerFunc = text_transformerFunc;     // 有默认值
        this.rowTransformerFunc = rowTransformerFunc; // 设计？？？
    }
    return MyElement_TableCol;
}());
export { MyElement_TableCol };
/**
 * El卡片的配置类
 *
 * TODO 具体使用方式：查看  PlayerDetail_Page.vue 文件。
 */
var MyEl_Cards = /** @class */ (function () {
    function MyEl_Cards(array) {
        this.array = array;
        this.array = array;
    }
    return MyEl_Cards;
}()); //
export { MyEl_Cards };
var MyEl_OneCard = /** @class */ (function () {
    function MyEl_OneCard(cardTitle, rows) {
        this.cardTitle = cardTitle;
        this.rows = rows;
        this.cardTitle = cardTitle;
        this.rows = rows;
    }
    return MyEl_OneCard;
}()); //
export { MyEl_OneCard };
var MyEl_OneCol = /** @class */ (function () {
    function MyEl_OneCol(leftLabel, rightProp) {
        this.leftLabel = leftLabel;
        this.rightProp = rightProp;
        this.leftLabel = leftLabel;
        this.rightProp = rightProp;
    }
    return MyEl_OneCol;
}());
export { MyEl_OneCol };
// interface MyEl_CardBatch {
//
// }
var conf = {
    array: [{ cardTitle: '基本信息', row: [[{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }], [{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }]] }, {
            cardTitle: '基本信息',
            row: [[{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }], [{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }]],
        }],
};
//# sourceMappingURL=MyElementUtils.js.map