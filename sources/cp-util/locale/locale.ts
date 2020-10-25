// import defaultLang from 'element-ui/src/locale/lang/zh-CN';

import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';

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
		Prompt                             : '提示',
		Create_Success                     : '新建成功！',
		Update_Success                     : '更新成功！',
		Delete_Success                     : '删除成功！',
		Delete_Prompt                      : '请选择需要删除的列表项!',
		Delete_Confirm                     : '确定要删除吗？',
	},
	element: {
		multi_lang_plus: {
			Alert_Title          : '翻译结果仅供参考',
			Alert_Description    : '系统语言为英语时,请先输入英语再翻译;系统语言为简体中文时,请先输入简体中文再翻译',
			Translate_Button_Text: '自动翻译5种语言',

			Please_Input_The_Field_To_Be_Translate: '请输入待翻译字段',
			Please_Input_Simplified_Chinese       : '请输入中文待翻译字段',
			Please_Input_English                  : '请输入英文待翻译字段',
			Please_Input_Traditional_English      : '请输入繁体中文待翻译字段',
			Please_Input_Korean                   : '请输入韩语待翻译字段',
			Please_Input_Japanese                 : '请输入日语待翻译字段',

			Translate_Success: '翻译成功',
			Translate_Failure: '翻译失败',
		},
	},
};
import Vue                          from 'vue';
import deepmerge                    from 'deepmerge';
import { Format }                   from './format';

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
			throw new Error(xX_ExceptionError_Helper.throwError_andLog(`内置国际化的key不存在！ ${property}`));
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
