// import {xX_CkKeys}     from '~/assets/js/_enum/CEnum';

import {NuxtConfig} from '@nuxt/types';

type CKeys = {
  // [key in keyof typeof xX_CkKeys]?: string | undefined;
}

declare global {
  /**
   * 1.将【两个类型】，合并为【一个类型】。
   */
  interface Simple_SsrReq extends CKeys {
    token?: string;
    news?: string;
    instrument_id?: string;
    locale?: string;
  }

  type NuxtJs_Configuration_Type = NuxtConfig;
  type NuxtJs_Module_Type = NonNullable<NuxtConfig['buildModules']>[number];

}
