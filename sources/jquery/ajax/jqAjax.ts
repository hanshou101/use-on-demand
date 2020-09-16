// TIP——————————————————————————————类型声明——————————————————————————————————————————
declare global {
  interface OriginFormType {
    [key: string]: string | number | object | Blob;
  }

  interface BaseBean<T = any> {
    data: T;
    errcode: number;
    errmsg: number;
  }
}

// TIP——————————————————————————————jQuery补充说明————————————————————————————————————

enum Method_Enum {
  GET  = 'GET',
  POST = 'POST',
}

declare namespace JqAjax_NS {
  export type SuccessTextStatus = 'success' | 'notmodified' | 'nocontent';
  export type ErrorTextStatus = 'timeout' | 'error' | 'abort' | 'parsererror';
  export  type TextStatus = SuccessTextStatus | ErrorTextStatus;
}

/**
 * 四种ContentType，参考资料：
 *        HttpRequest中常见的四种ContentType【转载】 - 宗炳煌 - 博客园 - https://www.cnblogs.com/xiaozong/p/5732332.html
 */
enum ContentType_Enum {
  json       = 'application/json',
  urlencoded = 'application/x-www-form-urlencoded',
  form       = 'multipart/form-data',
  xml        = 'text/xml',
}

const AjaxConfig = {
  timeout : 10 * 1000,     // 本地超时时间
  async   : true,         // 异步
  dataType: 'json',       // 期望服务器返回的数据格式

  cache_HtmlGet: false,       // TIP 是否缓存（官方文档：只针对GET请求获取的Html页面。  实际操作：任何GET请求都会受cache设置影响）

  defaultSuccess : function (resolve: (value?: any) => void) {                                      // 成功回调
    return function (result: any, status: JqAjax_NS.SuccessTextStatus, xhr: JQuery.jqXHR) {
      resolve(result);
    };
  },
  defaultError   : function (reject: (reason?: any) => void) {                                      // 错误回调
    return function (xhr: JQuery.jqXHR, status: JqAjax_NS.ErrorTextStatus, errorThrown: string) {
      console.log(xhr, status, errorThrown);
      alert(`网络错误：${xhr.readyState} - ${xhr.status} - ${xhr.statusText} - ${xhr.responseText} | ${status} - ${errorThrown}`); // TODO 给出提示
      reject(errorThrown);
    };
  },
  defaultComplete: function () {                                                                    // 所有完成
    return function (xhr: JQuery.jqXHR, status: JqAjax_NS.TextStatus) {
      // 这一段，并不需要特别设置。（await/async的try/catch/finally，可以自行处理）
    };
  },
};

// TIP——————————————————————————————————jQuery导入——————————————————————————————————————

import jquery from 'jquery';

const $: JQueryStatic = jquery;

// TIP——————————————————————————————————正式逻辑————————————————————————————————————————

export class xX_JqAjax {

  /**
   * GET请求
   * 参考资料：jQuery封装的AJAX - 葵花点穴手 - CSDN博客 - https://blog.csdn.net/weixin_42248745/article/details/80640830
   */
  public static get<T>(url: string, params = {}): Promise<BaseBean<T>> {

    let query   = '';
    const paris = Object.entries(params);
    if (paris.length > 0) {
      query += '?';
      paris.forEach((pair) => {
        const key = pair[0];
        let value = pair[1];
        if (typeof value !== 'string') {
          value = JSON.stringify(value);
        }
        query += `${key}=${value}&`;
      });
      query = query.substr(0, query.length - 1);
    }


    return new Promise<BaseBean<T>>((resolve, reject) => {
      $.ajax({
        type       : Method_Enum.GET,
        url        : url + query,
        contentType: ContentType_Enum.urlencoded,
        // TIP————————————————————————————————常规代码————————————————————————————————————
        dataType   : AjaxConfig.dataType,
        async      : AjaxConfig.async,
        timeout    : AjaxConfig.timeout,
        cache      : AjaxConfig.cache_HtmlGet,
        //
        success    : AjaxConfig.defaultSuccess(resolve),
        error      : AjaxConfig.defaultError(reject),
        complete   : AjaxConfig.defaultComplete(),
      });
    });
  }

  // 表单POST请求 & 文件POST请求
  public static postForm<T>(url: string, form: OriginFormType): Promise<BaseBean<T>> {

    // IE11，只支持FormData的append方法；不支持FormData的set方法。   参考资料：ie11兼容问题汇总及解决方案 - jingyuandi的博客 - CSDN博客 - https://blog.csdn.net/jingyuandi/article/details/80570298
    const formData = new FormData();
    Object.entries(form).forEach((pair) => {
      const key = pair[0];
      let value = pair[1];
      if (!(value instanceof Blob)) {         // Blob以外格式，转化为字符串
        value = JSON.stringify(value);
      }
      formData.append(key, value);
    });

    return new Promise<BaseBean<T>>((resolve, reject) => {
      $.ajax({
        type       : Method_Enum.POST,
        url        : url,
        contentType: ContentType_Enum.form,
        data       : formData,
        // TIP————————————————————————————————常规代码————————————————————————————————————
        dataType   : AjaxConfig.dataType,
        async      : AjaxConfig.async,
        timeout    : AjaxConfig.timeout,
        //
        success    : AjaxConfig.defaultSuccess(resolve),
        error      : AjaxConfig.defaultError(reject),
        complete   : AjaxConfig.defaultComplete(),
      });
    });
  }

  // JSON  POST请求
  public static postJson<T>(url: string, data: {}): Promise<BaseBean<T>> {
    return new Promise<BaseBean<T>>((resolve, reject) => {
      $.ajax({
        type       : Method_Enum.POST,
        url        : url,
        contentType: ContentType_Enum.json,
        data       : JSON.stringify(data),        // 此处，需要先序列化
        // TIP————————————————————————————————常规代码————————————————————————————————————
        dataType   : AjaxConfig.dataType,
        async      : AjaxConfig.async,
        timeout    : AjaxConfig.timeout,
        //
        success    : AjaxConfig.defaultSuccess(resolve),
        error      : AjaxConfig.defaultError(reject),
        complete   : AjaxConfig.defaultComplete(),
      });
    });
  }

}
