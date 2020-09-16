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
export declare class xX_JqAjax {
    /**
     * GET请求
     * 参考资料：jQuery封装的AJAX - 葵花点穴手 - CSDN博客 - https://blog.csdn.net/weixin_42248745/article/details/80640830
     */
    static get<T>(url: string, params?: {}): Promise<BaseBean<T>>;
    static postForm<T>(url: string, form: OriginFormType): Promise<BaseBean<T>>;
    static postJson<T>(url: string, data: {}): Promise<BaseBean<T>>;
}
//# sourceMappingURL=jqAjax.d.ts.map