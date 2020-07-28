import {EnvName_EnvEnum} from '~/config/EnvEnum';

declare global {

  namespace EnvNS {
    interface Domain_EnvType {
      domain: string;
      mainDomain: string;
      swapsDomain: string;
      cdnPath: string,
    }


    interface SsrApi_EnvType {
      ssr_baseUrl: string;
      ssr_swapsUrl: string;
      ssr_originCoinUrl: string;
    }

    interface ClientApi_AndWs_EnvType {
      baseUrl: string;
      swapsUrl: string;
      originCoinUrl: string;
      webSocketUrl: string;
    }

    interface Name_EnvType {
      envName: EnvName_EnvEnum;
    }

    type CombineEnvType = Domain_EnvType & SsrApi_EnvType & ClientApi_AndWs_EnvType & Name_EnvType & {
      isYun: true;
      testUrl?: string;
    }
  }

}
