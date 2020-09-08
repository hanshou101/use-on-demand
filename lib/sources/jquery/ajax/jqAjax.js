// TIP——————————————————————————————jQuery补充说明————————————————————————————————————
var Method_Enum;
(function (Method_Enum) {
    Method_Enum["GET"] = "GET";
    Method_Enum["POST"] = "POST";
})(Method_Enum || (Method_Enum = {}));
/**
 * 四种ContentType，参考资料：
 *        HttpRequest中常见的四种ContentType【转载】 - 宗炳煌 - 博客园 - https://www.cnblogs.com/xiaozong/p/5732332.html
 */
var ContentType_Enum;
(function (ContentType_Enum) {
    ContentType_Enum["json"] = "application/json";
    ContentType_Enum["urlencoded"] = "application/x-www-form-urlencoded";
    ContentType_Enum["form"] = "multipart/form-data";
    ContentType_Enum["xml"] = "text/xml";
})(ContentType_Enum || (ContentType_Enum = {}));
var AjaxConfig = {
    timeout: 10 * 1000,
    async: true,
    dataType: 'json',
    cache_HtmlGet: false,
    defaultSuccess: function (resolve) {
        return function (result, status, xhr) {
            resolve(result);
        };
    },
    defaultError: function (reject) {
        return function (xhr, status, errorThrown) {
            console.log(xhr, status, errorThrown);
            alert("\u7F51\u7EDC\u9519\u8BEF\uFF1A" + xhr.readyState + " - " + xhr.status + " - " + xhr.statusText + " - " + xhr.responseText + " | " + status + " - " + errorThrown); // TODO 给出提示
            reject(errorThrown);
        };
    },
    defaultComplete: function () {
        return function (xhr, status) {
            // 这一段，并不需要特别设置。（await/async的try/catch/finally，可以自行处理）
        };
    },
};
// TIP——————————————————————————————————jQuery导入——————————————————————————————————————
import jquery from 'jquery';
var $ = jquery;
// TIP——————————————————————————————————正式逻辑————————————————————————————————————————
var JqAjax = /** @class */ (function () {
    function JqAjax() {
    }
    /**
     * GET请求
     * 参考资料：jQuery封装的AJAX - 葵花点穴手 - CSDN博客 - https://blog.csdn.net/weixin_42248745/article/details/80640830
     */
    JqAjax.get = function (url, params) {
        if (params === void 0) { params = {}; }
        var query = '';
        var paris = Object.entries(params);
        if (paris.length > 0) {
            query += '?';
            paris.forEach(function (pair) {
                var key = pair[0];
                var value = pair[1];
                if (typeof value !== 'string') {
                    value = JSON.stringify(value);
                }
                query += key + "=" + value + "&";
            });
            query = query.substr(0, query.length - 1);
        }
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: Method_Enum.GET,
                url: url + query,
                contentType: ContentType_Enum.urlencoded,
                // TIP————————————————————————————————常规代码————————————————————————————————————
                dataType: AjaxConfig.dataType,
                async: AjaxConfig.async,
                timeout: AjaxConfig.timeout,
                cache: AjaxConfig.cache_HtmlGet,
                //
                success: AjaxConfig.defaultSuccess(resolve),
                error: AjaxConfig.defaultError(reject),
                complete: AjaxConfig.defaultComplete(),
            });
        });
    };
    // 表单POST请求 & 文件POST请求
    JqAjax.postForm = function (url, form) {
        // IE11，只支持FormData的append方法；不支持FormData的set方法。   参考资料：ie11兼容问题汇总及解决方案 - jingyuandi的博客 - CSDN博客 - https://blog.csdn.net/jingyuandi/article/details/80570298
        var formData = new FormData();
        Object.entries(form).forEach(function (pair) {
            var key = pair[0];
            var value = pair[1];
            if (!(value instanceof Blob)) { // Blob以外格式，转化为字符串
                value = JSON.stringify(value);
            }
            formData.append(key, value);
        });
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: Method_Enum.POST,
                url: url,
                contentType: ContentType_Enum.form,
                data: formData,
                // TIP————————————————————————————————常规代码————————————————————————————————————
                dataType: AjaxConfig.dataType,
                async: AjaxConfig.async,
                timeout: AjaxConfig.timeout,
                //
                success: AjaxConfig.defaultSuccess(resolve),
                error: AjaxConfig.defaultError(reject),
                complete: AjaxConfig.defaultComplete(),
            });
        });
    };
    // JSON  POST请求
    JqAjax.postJson = function (url, data) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: Method_Enum.POST,
                url: url,
                contentType: ContentType_Enum.json,
                data: JSON.stringify(data),
                // TIP————————————————————————————————常规代码————————————————————————————————————
                dataType: AjaxConfig.dataType,
                async: AjaxConfig.async,
                timeout: AjaxConfig.timeout,
                //
                success: AjaxConfig.defaultSuccess(resolve),
                error: AjaxConfig.defaultError(reject),
                complete: AjaxConfig.defaultComplete(),
            });
        });
    };
    return JqAjax;
}());
export { JqAjax };
//# sourceMappingURL=jqAjax.js.map