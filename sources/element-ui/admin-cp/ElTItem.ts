/**
 * 两个参数，一个必传参数对象，一个可选参数对象
 *
 * 回显表格，分为以下几类
 * 1.普通文本
 * 2.勾选框
 * 3.枚举字段
 * 4.国际化多语言显示
 * 5.图片
 * 6.自定义（？）
 */
// 无论如何，都必传的字段
interface Require {
  // 所占用字段（和prop等值。一般用于  取值、唯一key、slot插槽 等）
  name: string;
  // 当前列标题
  label: string;
}

// valueFunction，这个值转化，所采用的默认T泛型类型。
type Default_valueFunction_RtnType = string;

// 可以选填的字段
interface Optional<RtnT = Default_valueFunction_RtnType> {
  width?: number;
  // 最小宽度。（最终宽度 = 最小宽度 + 平分剩余宽度）
  minWidth?: number;

  // 是否当内容过长时，自动隐藏
  showOverflowTooltip?: boolean;

  // 传入[row,item]，返回string
  valueFunction?: RowTransformFn<RtnT>;
  // 国际化字段所用的键。（例子：table.username）
  i18nKey?: string;
}

interface ElementTableColumnAttrs {
  // 固定在一行的位置。（right、left）
  fixed: 'right' | 'left',
  // 内部内容排布方向。（left、right、center）
  align: 'center' | 'right' | 'left',
}

// tslint:disable-next-line:no-namespace
export namespace xX_Father_ElTItem {

  // 基类
  export abstract class Base<RtnT = Default_valueFunction_RtnType> {
    public label!: string;          // 显示的表头
    public prop!: string;           // 从listData中取变量的变量名
    public name!: string;           // 和prop保持一致？？？
    public width?: number;          // 指定固定宽度
    public minWidth: number = 110;  // 最小宽度
    public showOverflowTooltip?: boolean;         // 是否当内容过长时，自动隐藏

    public valueFunction?: RowTransformFn<RtnT>;     // 数值转化函数

    protected constructor(require: Require | null, optional?: Optional<RtnT>) {
      if (require) {
        const {name, label} = require;
        this.prop           = name;
        this.name           = name;
        this.label          = label;
      }
      if (optional) {
        const {width, minWidth, showOverflowTooltip, valueFunction} = optional;
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

  // 普通文本
  export class Text extends Base {
    public readonly type = 'text';  // 该属性，不能使用static。否则Vue将不会取到。

    constructor(require: Require, optional?: Optional) {
      super(require, optional);
    }
  }

  // 行首复选框
  export class Selection extends Base {
    public readonly type = 'selection';
    public selectableFunction?: SelectableFn;       // 根据Row判断，当前行是否可被【CheckBox】选中。

    constructor(optional?: {
      selectableFunction?: SelectableFn,
    }) {
      super(null);
      if (optional != undefined) {
        const {selectableFunction} = optional;
        if (selectableFunction !== undefined) {
          this.selectableFunction = selectableFunction;
        }
      }
    }
  }

  // 枚举展示
  export class EnumTag<T extends any> extends Base {
    public readonly type = 'enumTag';
    public selectOption!: T;

    public colorTrans?: (typeNum: string) => string;

    constructor(
      require: Require & {
        // 下拉框的候选项，一般写在common.ts里面
        selectOption: T,
      },
      optional?: Optional & {
        // 颜色转化
        colorTrans?: (typeNum: string) => string;
      }) {
      super(require, optional);
      if (require) {
        const {selectOption} = require;
        this.selectOption    = selectOption;
      }
      if (optional != undefined) {
        const {colorTrans} = optional;
        if (colorTrans != undefined) {
          console.log('colorTrans初始化了');
          this.colorTrans = colorTrans;
        }
      }
    }
  }

  // 多语言国际化展示
  export class I18NDisplay extends Base {
    // public readonly type = 'i18nDisplay';
    public readonly type = 'langTag';                       // 此处，type的名称，略有改变

    constructor(require: Require, optional?: Optional) {
      super(require, optional);
    }
  }

  // 图片
  export class Image<RtnT = string> extends Base<RtnT> {
    public readonly type = 'image';

    constructor(require: Require, optional?: Optional<RtnT>) {
      super(require, optional);
    }
  }

  // 图片列表（一组）
  export class ImageList<RtnT = string[]> extends Base<RtnT> {
    public readonly type = 'imageList';

    constructor(require: Require, optional?: Optional<RtnT>) {
      super(require, optional);
    }
  }

  // 自定义插槽
  export class Custom extends Base {
    public readonly type = undefined;      // 临时这样标记
    public elementTableColumnAttrs?: ElementTableColumnAttrs;

    constructor(require: Require, optional?: Optional & {
      // 用于[el-table-column]的组件props
      elementTableColumnAttrs?: ElementTableColumnAttrs,
    }) {
      super(require, optional);
      if (optional) {
        const {minWidth, elementTableColumnAttrs} = optional;
        this.minWidth                             = minWidth != undefined ? minWidth : 180;             // 对于宽度，额外处理一下
        if (elementTableColumnAttrs != undefined) {
          this.elementTableColumnAttrs = elementTableColumnAttrs;
        }
      }
    }
  }


  // 详情多行字段展示
  export class DetailInfo extends Base {
    public readonly type = 'detailInfo';
    public pairs !: DetailInfoPair[];
    public leftEm?: number;

    // public rightEm?: number;     // 后来发现，似乎用不到

    constructor(require: Require /*| { label: string; name?: string }*/ & {
      pairs: DetailInfoPair[],
    }, optional?: Optional & {
      // 左侧Label宽度
      leftEm?: number;
      // // 右侧Label宽度
      // rightEm?: number;
    }) {
      super({...require/*,name: require.name || '',       // 无name则默认空字符串*/}, optional);
      this.pairs = require.pairs;

      if (!optional || optional.minWidth == undefined) {
        this.minWidth = 300;                                      // 给一个默认宽度
      }

      if (optional) {
        const {leftEm, /*rightEm*/} = optional;
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
}
