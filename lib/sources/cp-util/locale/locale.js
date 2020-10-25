// import defaultLang from 'element-ui/src/locale/lang/zh-CN';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';
var defaultLang = {
    dialog: {
        Confirm: '确认',
        Cancel: '取消',
        Create: '新建',
        Upload_Img: '上传图片',
        Click_Upload: '点击上传',
    },
    table: {
        Operation: '操作',
    },
    form: {
        Time_Picker_Start_Time: '开始时间',
        Time_Picker_End_Time: '结束时间',
    },
    message: {
        Please_Wait_All_Pics_Upload_Success: '请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！',
        Prompt: '提示',
        Create_Success: '新建成功！',
        Update_Success: '更新成功！',
        Delete_Success: '删除成功！',
        Delete_Prompt: '请选择需要删除的列表项!',
        Delete_Confirm: '确定要删除吗？',
    },
    element: {
        multi_lang_plus: {
            Alert_Title: '翻译结果仅供参考',
            Alert_Description: '系统语言为英语时,请先输入英语再翻译;系统语言为简体中文时,请先输入简体中文再翻译',
            Translate_Button_Text: '自动翻译5种语言',
            Please_Input_The_Field_To_Be_Translate: '请输入待翻译字段',
            Please_Input_Simplified_Chinese: '请输入中文待翻译字段',
            Please_Input_English: '请输入英文待翻译字段',
            Please_Input_Traditional_English: '请输入繁体中文待翻译字段',
            Please_Input_Korean: '请输入韩语待翻译字段',
            Please_Input_Japanese: '请输入日语待翻译字段',
            Translate_Success: '翻译成功',
            Translate_Failure: '翻译失败',
        },
    },
};
import Vue from 'vue';
import deepmerge from 'deepmerge';
import { Format } from './format';
var format = Format(Vue);
var lang = defaultLang;
var merged = false;
/**
 * 为了兼容，外部【i18n】方案
 */
var i18nHandler = function () {
    // @ts-ignore
    var vuei18n = Object.getPrototypeOf(this || Vue).$t; // 【vue-i18n】的实现
    // @ts-ignore
    if (typeof vuei18n === 'function' && !!Vue.locale) {
        if (!merged) {
            merged = true;
            // @ts-ignore
            Vue.locale(
            // @ts-ignore
            Vue.config.lang, 
            // @ts-ignore
            deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true }));
        }
        // @ts-ignore
        return vuei18n.apply(this, arguments);
    }
};
export var t = function (path) {
    var options = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        options[_i - 1] = arguments[_i];
    }
    // @ts-ignore
    var value = i18nHandler.apply(this, arguments);
    if (value !== null && value !== undefined)
        return value;
    var array = path.split('.');
    var current = lang; // 尝试找到【本地语言包】
    for (var i = 0, j = array.length; i < j; i++) {
        var property = array[i];
        // @ts-ignore
        value = current[property];
        if (!value) {
            throw new Error(xX_ExceptionError_Helper.throwError_andLog("\u5185\u7F6E\u56FD\u9645\u5316\u7684key\u4E0D\u5B58\u5728\uFF01 " + property));
        }
        if (i === j - 1)
            return format(value, options); // 如果字符串，需要格式化 （如 【xxx year yyy month】这种）
        if (!value)
            return '';
        current = value;
    }
    return '';
};
export var use = function (l) {
    lang = l || lang;
};
export var i18n = function (fn) {
    i18nHandler = fn || i18nHandler;
};
export default { use: use, t: t, i18n: i18n };
//# sourceMappingURL=locale.js.map