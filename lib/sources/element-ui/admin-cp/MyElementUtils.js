/**
 * 下拉选项的配置类
 */
export class MyFormItem_SelectOptionConf {
    constructor(enumOptions) {
        this.mustParseInt_toFitBackend = false; // TODO 是否必须转化为Int（原因是，后台有时用Int做枚举，有时用String做枚举；  回显时需要注意；）
        this.enumOptions = enumOptions;
    } //
    setParseInt(____mustParseInt_toFitBackend) {
        this.mustParseInt_toFitBackend = ____mustParseInt_toFitBackend;
        return this;
    }
}
// TIP 颜色枚举
export const data_elTagColorFilter = {
    0: 'danger',
    1: 'success',
    2: 'info',
    3: 'primary',
    4: 'warning',
};
/**
 * 表单Item类
 */
export class MyEl_FormItem {
    constructor(prop_AND_bindValue, label, myCategory = 'text', // 不填则默认text
    placeholder = '', // 不填则默认''
    // TODO // 不填则：默认无选项，且回显时，不转化为Int（保留字符串的样子）
    selectOptionConf = new MyFormItem_SelectOptionConf({ test: '测试专用' }).setParseInt(false)) {
        // 必填
        this.prop_AND_bindValue = prop_AND_bindValue;
        this.label = label;
        // 可选
        this.myCategory = myCategory;
        this.placeholder = placeholder;
        this.selectOptionConf = selectOptionConf;
    }
}
export class MyEl_FormItem__inDialog extends MyEl_FormItem {
    constructor() {
        super(...arguments);
        this.config = {}; //
    }
    setDialogConfig(__config) {
        // TODO 此处，逐条地进行判断；防止出现，属性被【无意中undefined】覆盖的情况。
        for (const key in __config) { // 遍历属性
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
    }
}
/**
 * 表单校验的Item
 */
export class MyEl_RuleItem {
    constructor(/*propName: string,*/ message, required = true, trigger = 'blur', __validator) {
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
}
/**
 * 表格的Column配置
 */
export class MyElement_TableCol {
    constructor(prop, label, min_width, myCategory = 'text', // 不填则默认text
    // FIXME 可能要绑在，某个实体类上面，以此获得泛型？？？
    selectOptionEnum, // 不填则默认{}
    // TODO 此处，尝试一种新的转值方式
    // text_transformerFunc: (text: string) => string    // 默认原样返回。
    //                                                             = (text) => text,
    rowTransformerFunc = (row, fieldProp) => row[fieldProp]) {
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
}
/**
 * El卡片的配置类
 *
 * TODO 具体使用方式：查看  PlayerDetail_Page.vue 文件。
 */
export class MyEl_Cards {
    constructor(array) {
        this.array = array;
        this.array = array;
    }
} //
export class MyEl_OneCard {
    constructor(cardTitle, rows) {
        this.cardTitle = cardTitle;
        this.rows = rows;
        this.cardTitle = cardTitle;
        this.rows = rows;
    }
} //
export class MyEl_OneCol {
    constructor(leftLabel, rightProp) {
        this.leftLabel = leftLabel;
        this.rightProp = rightProp;
        this.leftLabel = leftLabel;
        this.rightProp = rightProp;
    }
}
// interface MyEl_CardBatch {
//
// }
const conf = {
    array: [{ cardTitle: '基本信息', row: [[{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }], [{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }]] }, {
            cardTitle: '基本信息',
            row: [[{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }], [{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }]],
        }],
};
//# sourceMappingURL=MyElementUtils.js.map