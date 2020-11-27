export enum xX_BaseVarType {
	Array     = '[object Array]',
	String    = '[object String]',
	Number    = '[object Number]',
	Boolean   = '[object Boolean]',
	Null      = '[object Null]',
	RegExp    = '[object RegExp]',
	Undefined = '[object Undefined]',
}

export enum xX_Zepto_TypeDetectE {
	boolean  = 'boolean',
	number   = 'number',
	string   = 'string',
	function = 'function',
	array    = 'array',
	date     = 'date',
	regexp   = 'regexp',
	object   = 'object',
	error    = 'error',
}

namespace FlagJsonNS {
	export interface Cfg {
		readonly superDeep?: boolean;									// 是否非常深入。深入到连【数组】的索引 0、1 ，都要拆开？
		readonly needRemainValue?: boolean;						// 是否同时，保留【Value值】的显示。（如果只需要key，不需要value，则可以保持内存的节省）
	}

	export interface Data {
		prevKey?: string;
		resultMap?: IndexedObj;
	}
}


const class2type: IndexedObj<xX_Zepto_TypeDetectE> = {};
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name, i) {
	class2type['[object ' + name + ']'] = name.toLowerCase() as xX_Zepto_TypeDetectE;
});
const toString = class2type.toString;

export class xX_SObject_Helper {
	/**
	 * 获取【普通变量】的【具体类型】。
	 *        Array、String、Number、Boolean、Null、RegExp、Undefined
	 */
	public static getVar_BaseType(varAny: any): xX_BaseVarType {
		const toString = Object.prototype.toString;
		return toString.call(varAny) as xX_BaseVarType;
	}

	/**
	 * 从【Zepto】库中，抽取出来的【类型判断】
	 * 				0.参考资料：
	 * 									源码讲解：https://juejin.cn/post/6844903494852296711
	 * 									源码查看：https://sourcegraph.com/github.com/madrobby/zepto@master/-/blob/src/zepto.js#L67:1
	 */
	public static typeDetect_judgeType_inZeptoLib(obj: any): xX_Zepto_TypeDetectE {
		return obj == null
			? String(obj) as xX_Zepto_TypeDetectE
			: (class2type[toString.call(obj)] || 'object');
	}

	/**
	 * 将一个【JSON对象】的所有key，展开为 全部由【a.b.c】组成的数组形式。
	 * @return 返回一个Map，key为多节，value为【叶子末梢】值。
	 */
	public static flatJson_toKeyChain(
		json: IndexedObj,
		__cfg: FlagJsonNS.Cfg   = {},
		__data: FlagJsonNS.Data = {},
	): IndexedObj {
		const cfg  = {
			// 默认项
			superDeep      : true,						// 默认很深入。
			needRemainValue: true,						// 默认保留值的显示。
			// 用户传入项
			...__cfg,
		} as NoUndefinedField<FlagJsonNS.Cfg>;
		const data = {
			// 默认项
			prevKey  : '',
			resultMap: {} as IndexedObj,
			// 用户传入项
			...__data,
		} as NoUndefinedField<FlagJsonNS.Data>;

		Object.keys(json).forEach(newKey => {
			// 拼接成【a.b】。（a可能已是多节。）
			const thisKey = `${data.prevKey ? `${data.prevKey}.` : ''}${newKey}`;

			const v = json[newKey];

			// 如果仍是【对象】或【数组】。
			[
				xX_Zepto_TypeDetectE.object,
				cfg.superDeep ? xX_Zepto_TypeDetectE.array : null,													// 是否深入到【数组】的索引？？？
			].filter(v => !!v)
			 .includes(this.typeDetect_judgeType_inZeptoLib(v))
				? this.flatJson_toKeyChain(v, cfg, {
					prevKey  : thisKey,
					resultMap: data.resultMap,
				})
				: (data.resultMap[thisKey] = cfg.needRemainValue ? v : undefined);
		});
		return data.resultMap;
	}

	/**
	 * 根据【已知value】，搜索【对应的key】
	 *        1.可能有多个，所以是数组
	 */
	public findKey_byValue_inObj(
		byValue: any,
		inObj: IndexedObj,
	): Array<string> {
		const keyArray = [];
		for (const key in inObj) {
			if (inObj.hasOwnProperty(key)) {    // 日常判断
				if (inObj[key] == byValue) {        // 如果相等
					keyArray.push(key);               // 存入
				}
			}
		}
		return keyArray;
	}

}
