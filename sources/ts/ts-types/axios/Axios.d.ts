// import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'ts/ts-types/axios/Axios';
// import {ac}                                               from '~/assets/js/axiosConfig';
// import AxiosClassOriginCoin                               from '~/assets/js/axiosClassOriginCoin';
// import {xX_AWatKeys}                                         from '~/assets/js/axiosWatcher_KeysEnum';

import Vue                                                from 'vue';
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {xX_AWatKeys}                                      from '../../../axios/watcher/AxiosWatcher_KeysEnum';

declare global {
  type AxiosInstanceType = AxiosInstance;
  // type AcInstanceType = (InstanceType<typeof ac> & AxiosInstanceType)       // 推断一下类型

  // type OriginCoin_Bg_InstanceType = (InstanceType<typeof AxiosClassOriginCoin> & AxiosInstanceType)


  // type ResInterceptor_ErrorType = {
  //   response?: {
  //     status: number;
  //   }
  // }

  type AxiosRequestConfig_Type = AxiosRequestConfig;
  type AxiosResponse_Type<T> = AxiosResponse<T>;

  interface AxiosWatcherMap_ItemType {
    requesting?: boolean;
  }                                         //
  type AxiosWatcherMap_Type = {
    /**
     * WARN 此处，针对Enum，in关键字，取到的实际上，是Enum的值。
     * TIP 此处，使用这种方式，可以【阴差阳错】地，保持Enum中 key和value 必须为同一个值。（不然TypeScript会报错）
     *                1.纯属阴差阳错
     */
    [value in xX_AWatKeys]: AxiosWatcherMap_ItemType;   // 酷炫的泛型
  }

}
