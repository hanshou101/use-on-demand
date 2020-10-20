// import defaultLang from 'element-ui/src/locale/lang/zh-CN';

const defaultLang = {																					// 默认国际化语言
	dialog : {
		Confirm     : '确认',
		Cancel      : '取消',
		Create      : '新建',
		Upload_Img  : '上传图片',
		Click_Upload: '点击上传',
	},
	table  : {
		Operation: '操作',
	},
	form   : {
		Time_Picker_Start_Time: '开始时间',
		Time_Picker_End_Time  : '结束时间',
	},
	message: {
		Please_Wait_All_Pics_Upload_Success: '请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！',
	},
};
import Vue        from 'vue';
import deepmerge  from 'deepmerge';
import { Format } from './format';

const format     = Format(Vue);
let lang: object = defaultLang;
let merged       = false;

/**
 * 为了兼容，外部【i18n】方案
 */
let i18nHandler: Function = function() {
	// @ts-ignore
	const vuei18n: Function = Object.getPrototypeOf(this || Vue).$t;  // 【vue-i18n】的实现
	// @ts-ignore
	if (typeof vuei18n === 'function' && !!Vue.locale) {
		if (!merged) {
			merged = true;
			// @ts-ignore
			Vue.locale(
				// @ts-ignore
				Vue.config.lang,
				// @ts-ignore
				deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true }),
			);
		}
		// @ts-ignore
		return vuei18n.apply(this, arguments);
	}
};

export const t = function(path: string, ...options: Array<any>) {
	// @ts-ignore
	let value = i18nHandler.apply(this, arguments);
	if (value !== null && value !== undefined) return value;

	const array = path.split('.');
	let current = lang;																			// 尝试找到【本地语言包】

	for (let i = 0, j = array.length; i < j; i++) {
		const property = array[i];
		// @ts-ignore
		value          = current[property];
		if (!value) {
			throw new Error(`内置国际化的key不存在！ ${property}`);
		}
		if (i === j - 1) return format(value, options);					// 如果字符串，需要格式化 （如 【xxx year yyy month】这种）
		if (!value) return '';
		current = value;
	}
	return '';
};

export const use = function(l: object) {
	lang = l || lang;
};

export const i18n = function(fn: Function) {
	i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
