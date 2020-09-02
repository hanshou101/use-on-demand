// tslint:disable-next-line:no-namespace
export var Father_ElTItem;
(function (Father_ElTItem) {
    // 基类
    class Base {
        constructor(require, optional) {
            this.minWidth = 110; // 最小宽度
            if (require) {
                const { name, label } = require;
                this.prop = name;
                this.name = name;
                this.label = label;
            }
            if (optional) {
                const { width, minWidth, showOverflowTooltip, valueFunction } = optional;
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
    }
    Father_ElTItem.Base = Base;
    // 普通文本
    class Text extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.type = 'text'; // 该属性，不能使用static。否则Vue将不会取到。
        }
    }
    Father_ElTItem.Text = Text;
    // 行首复选框
    class Selection extends Base {
        constructor(optional) {
            super(null);
            this.type = 'selection';
            if (optional != undefined) {
                const { selectableFunction } = optional;
                if (selectableFunction !== undefined) {
                    this.selectableFunction = selectableFunction;
                }
            }
        }
    }
    Father_ElTItem.Selection = Selection;
    // 枚举展示
    class EnumTag extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.type = 'enumTag';
            if (require) {
                const { selectOption } = require;
                this.selectOption = selectOption;
            }
            if (optional != undefined) {
                const { colorTrans } = optional;
                if (colorTrans != undefined) {
                    console.log('colorTrans初始化了');
                    this.colorTrans = colorTrans;
                }
            }
        }
    }
    Father_ElTItem.EnumTag = EnumTag;
    // 多语言国际化展示
    class I18NDisplay extends Base {
        constructor(require, optional) {
            super(require, optional);
            // public readonly type = 'i18nDisplay';
            this.type = 'langTag'; // 此处，type的名称，略有改变
        }
    }
    Father_ElTItem.I18NDisplay = I18NDisplay;
    // 图片
    class Image extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.type = 'image';
        }
    }
    Father_ElTItem.Image = Image;
    // 图片列表（一组）
    class ImageList extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.type = 'imageList';
        }
    }
    Father_ElTItem.ImageList = ImageList;
    // 自定义插槽
    class Custom extends Base {
        constructor(require, optional) {
            super(require, optional);
            this.type = undefined; // 临时这样标记
            if (optional) {
                const { minWidth, elementTableColumnAttrs } = optional;
                this.minWidth = minWidth != undefined ? minWidth : 180; // 对于宽度，额外处理一下
                if (elementTableColumnAttrs != undefined) {
                    this.elementTableColumnAttrs = elementTableColumnAttrs;
                }
            }
        }
    }
    Father_ElTItem.Custom = Custom;
    // 详情多行字段展示
    class DetailInfo extends Base {
        // public rightEm?: number;     // 后来发现，似乎用不到
        constructor(require, optional) {
            super({ ...require /*,name: require.name || '',       // 无name则默认空字符串*/ }, optional);
            this.type = 'detailInfo';
            this.pairs = require.pairs;
            if (!optional || optional.minWidth == undefined) {
                this.minWidth = 300; // 给一个默认宽度
            }
            if (optional) {
                const { leftEm /*rightEm*/ } = optional;
                if (leftEm != undefined) {
                    this.leftEm = leftEm;
                }
                /*
                if (rightEm != undefined) {
                  this.rightEm = rightEm;
                }
                */
            }
        }
    }
    Father_ElTItem.DetailInfo = DetailInfo;
})(Father_ElTItem || (Father_ElTItem = {}));
//# sourceMappingURL=ElTItem.js.map