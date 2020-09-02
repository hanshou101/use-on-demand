import axios from 'sources/ts/ts-types/module____axios/axios';

// declare module 'axios' {
//   export interface AxiosResponse<T = any> extends Promise<T> {}
// }

declare module 'axios' {
  /**
   * WARN 此处，为了修复【官方axios库】，错误的Axios返回类型
   *
   * 0.参考资料：[How to use Axios with TypeScript when using response interceptors (AxiosResponse issue) · Issue #1510 · axios/axios](https://github.com/axios/axios/issues/1510#issuecomment-525382535)
   *
   */
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;                         //
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;               //
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;            //
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;              //
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;  //
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;   //
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>; //

    // TIP 调用自身
    // TIP 调用自身
    // TIP 调用自身
    <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;               //
  }


  export interface AxiosRequestConfig {
    bzInfo?: {
      bzId: keyof AWatKeys_Type,           // 每个axios调用的方法，独一无二ID
    };
  }
}
