/**
 * 下拉选项的配置类
 */
export class xX_MyFormItem_SelectOptionConf<SOption> {
	public enumOptions: SOption;      // FIXME 可能要绑在，某个实体类上面，以此获得泛型？？？
	public mustParseInt_toFitBackend: boolean = false;   // TODO 是否必须转化为Int（原因是，后台有时用Int做枚举，有时用String做枚举；  回显时需要注意；）

	constructor(enumOptions: SOption) {      // FIXME 可能要绑在，某个实体类上面，以此获得泛型？？？
		this.enumOptions = enumOptions;
	}//
	public setParseInt(____mustParseInt_toFitBackend: boolean): xX_MyFormItem_SelectOptionConf<SOption> {
		this.mustParseInt_toFitBackend = ____mustParseInt_toFitBackend;
		return this;
	}
}

// TIP 颜色枚举
export const xX_data_elTagColorFilter: IndexedObj = {
	0: 'danger',
	1: 'success',
	2: 'info',
	3: 'primary',
	4: 'warning',
};

/**
 * 表单Item类
 */
export abstract class xX_MyEl_FormItem<SOption> {
	public myCategory: MyFormItem_Category;
	// prop: string;               // 表单校验时，检索指向的字段
	public prop_AND_bindValue: string;          // 绑定到哪个值
	public label: string;
	public placeholder: string;       // 极少数情况下，出现的替换字段？
	// [key: string]: string;

	public selectOptionConf: xX_MyFormItem_SelectOptionConf<SOption>;

	constructor(prop_AND_bindValue: string,
							label: string,
							myCategory: MyFormItem_Category = 'text',   // 不填则默认text
							placeholder: string             = '',                   // 不填则默认''

							// TODO // 不填则：默认无选项，且回显时，不转化为Int（保留字符串的样子）
							selectOptionConf                = new xX_MyFormItem_SelectOptionConf<SOption>({ test: '测试专用' } as any).setParseInt(false),
	) {
		// 必填
		this.prop_AND_bindValue = prop_AND_bindValue;
		this.label              = label;

		// 可选
		this.myCategory       = myCategory;
		this.placeholder      = placeholder;
		this.selectOptionConf = selectOptionConf;
	}
}

/**
 * 适用于Dialog的表单子类。
 */
export interface xX_MyDialogFormItem_Conf extends Object {
	disableItem?: boolean;
	notRenderItem?: boolean; //
	[key: string]: any;
} //
export abstract class xX_MyEl_FormItem__inDialog<SOption> extends xX_MyEl_FormItem<SOption> {
	public config: xX_MyDialogFormItem_Conf = {};   //
	public setDialogConfig(__config: xX_MyDialogFormItem_Conf): this {
		// TODO 此处，逐条地进行判断；防止出现，属性被【无意中undefined】覆盖的情况。
		for (const key in __config) { // 遍历属性
			if (Object.prototype.hasOwnProperty.call(__config, key)) {   // 判断属性是否存
				if (typeof __config[key] !== 'undefined') {                    // TODO 此处，特别注意，强行把（有意、无意）的undefined值，都排除了出去
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
 * 表单校验的总配置
 */
export interface xX_MyEl_FormItem_Rule_Config {
	[key: string]: Array<xX_MyEl_RuleItem>;
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


/**
 * 表格的Column配置
 */
export class xX_MyElement_TableCol<SOption> {
	public myCategory: MyTableCol_Category;
	public label: string;    // 显示的表头
	public prop: string;     // 从listData中取变量的变量名
	public 'min-width': string;

	public selectOptionEnum?: SOption;       // FIXME 可能要绑在，某个实体类上面，以此获得泛型？？？

	// TODO 此处，尝试一种新的转值方式
	// public text_transformerFunc: (text: string) => string;
	public rowTransformerFunc: (row: any, fieldProp: string) => string;

	constructor(prop: string,
							label: string,
							min_width: string,
							myCategory: MyTableCol_Category            = 'text',   // 不填则默认text
							// FIXME 可能要绑在，某个实体类上面，以此获得泛型？？？
							selectOptionEnum?: SOption,                 // 不填则默认{}

							// TODO 此处，尝试一种新的转值方式
							// text_transformerFunc: (text: string) => string    // 默认原样返回。
							//                                                             = (text) => text,
							rowTransformerFunc: Origin__RowTransformFn = (row, fieldProp) => row[fieldProp],                    // 此处，之前设计的时候考虑比较简答；但现在去改过去的代码又来不及了，所以使用比较简单的适配方案。
	) {
		// 必填
		this.prop         = prop;
		this.label        = label;
		this['min-width'] = min_width;

		// 可选
		this.myCategory = myCategory;
		if (selectOptionEnum) {
			this.selectOptionEnum = selectOptionEnum;   // 有传入的情况下，才赋值
		}

		// TODO 此处，尝试一种新的转值方式
		// this.text_transformerFunc = text_transformerFunc;     // 有默认值
		this.rowTransformerFunc = rowTransformerFunc;       // 设计？？？
	}
}

/**
 * El卡片的配置类
 *
 * TODO 具体使用方式：查看  PlayerDetail_Page.vue 文件。
 */
export class xX_MyEl_Cards {
	constructor(public array: Array<xX_MyEl_OneCard>) {
		this.array = array;
	}
}//

export class xX_MyEl_OneCard {
	constructor(public cardTitle: string, public  rows: Array<MyEl_OneRow>) {
		this.cardTitle = cardTitle;
		this.rows      = rows;
	}
}//

type  MyEl_OneRow = Array<xX_MyEl_OneCol>;//

export class xX_MyEl_OneCol {
	constructor(public leftLabel: string, public rightProp: string) {
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
		row      : [[{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }], [{ col_left: '玩家ID', col_right: '字段名' }, { col_left: '玩家ID', col_right: '字段名' }]],
	}],
};
