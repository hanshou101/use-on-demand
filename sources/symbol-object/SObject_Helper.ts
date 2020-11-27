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
		prevKey               = '',
		resultMap: IndexedObj = {},
	): IndexedObj {
		Object.keys(json).forEach(newKey => {
			// 拼接成【a.b】。（a可能已是多节。）
			const thisKey = `${prevKey ? `${prevKey}.` : ''}${newKey}`;

			// 如果仍是【对象】或【数组】。
			[
				xX_Zepto_TypeDetectE.object,
				xX_Zepto_TypeDetectE.array,
			].includes(this.typeDetect_judgeType_inZeptoLib(json[newKey]))
				? this.flatJson_toKeyChain(json[newKey], thisKey, resultMap)
				: (resultMap[thisKey] = null);
		});
		return resultMap;
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
