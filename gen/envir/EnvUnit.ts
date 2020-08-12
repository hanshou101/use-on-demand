import {ClientApi_AndWs_EnvEnum, Domain_EnvEnum, EnvName_EnvEnum, SsrApi_EnvEnum} from './EnvEnum';


// import {stCookie as cookie}                                      from '../assets/js/cookie/cookie';

const isDev    = process.env.NODE_ENV === 'development';
const isClient = process.client;

// 服务端，或者【https】网站的客户端，使用https协议。（WARN 此处，必须建立在，接口本身支持https的情况下）
// const needSecureProtocol = !isClient || location.protocol.includes('https');

// 目前，仅域名，设置自动适配。（服务端，https；客户端，自动判断）
const secureDomain = !isClient || location.protocol.includes('https');

// const isDev = false;

/*


        function getTigermexConfig(): ApiConfig {
          let host, domain, mainDomain, swapsDomain;
          try {
            host = process.client ? cookie.getCookie('host') : '服务端无document';
          } catch (err) {
            console.error(err);
          }
          // domain = window.location.host.slice(-8)
          domain      = 'tigermex.com';                 // 生产环境  主要基本域名
          mainDomain  = 'https://www.tigermex.com';     // 生产环境  主站网址
          swapsDomain = 'https://swap.tigermex.com';    // 生产环境  合约站网址

          const ssr_originCoinUrl = '1234567';
          const originCoinUrl     = '7654321';

          const ssr_baseUrl  = 'https://api.tigermex.com/';       // 生产环境  （服务端）主站api
          const ssr_swapsUrl = 'https://api.tigermex.com/';       // 生产环境  （服务端）合约站api

          return {
            // cookie domain,change this to save cookie
            domain      : domain,
            mainDomain  : mainDomain,
            swapsDomain : swapsDomain,
            // api URL,change this to get Data
            // baseUrl: 'https://api.ginfexapp.vip/v1/',
            // swapsUrl: 'https://api.ginfexapp.vip/v1/',
            // webSocketUrl: 'wss://api.ginfexapp.vip/v1/ifcontract/realTime'
            // baseUrl: host ? 'https://' + host + '/v1/' : 'https://api.ginfexapp.vip/v1/',
            // swapsUrl: host ? 'https://' + host + '/v1' : 'https://api.ginfexapp.vip/v1/',
            // webSocketUrl: host ? 'wss://' + host + '/v1/ifcontract/realTime' : 'wss://api.ginfexapp.vip/v1/ifcontract/realTime'
            ssr_baseUrl,
            ssr_swapsUrl,
            ssr_originCoinUrl,
            baseUrl     : isDev ? '/tigermex/proxyBaseUrl' : ssr_baseUrl,   // 生产环境 （客户端）主站api
            swapsUrl    : isDev ? '/tigermex/proxySwapUrl' : ssr_swapsUrl,  // 生产环境 （客户端）合约站api
            originCoinUrl,
            //
            webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime',         // 生产环境  合约站websocket地址
            // swapsUrl: 'http://192.168.3.216:9095/'
            // 如果是合约云则为true
            isYun       : true
          };
        }


*/


export class EnvUnit {
  constructor(
    public readonly Env_Name: EnvName_EnvEnum,                      // 【环境名】标识符
    public readonly Env_Domain: Domain_EnvEnum,                     // 域名
    public readonly Env_SsrApi: SsrApi_EnvEnum,                     // 服务端接口
    public readonly Env_ClientApi_AndWs: ClientApi_AndWs_EnvEnum,    // 客户端接口
  ) {
  }

  /**
   * 此处【域名】：
   *        1.WARN 【http/https】敏感
   *        2.
   */
  private getDomain(): EnvNS.Domain_EnvType {
    /**
     *        1.服务端默认https        （其实，没有用到）
     *        2.客户端自动适配
     *        3.注意，后面是带冒号的。
     */
    const domainProto = isClient ? location.protocol : 'https:';

    switch (this.Env_Domain) {
      case Domain_EnvEnum.localhost:
        return {
          domain     : 'localhost',// TIP 不需要区分 http(s)
          mainDomain : `${domainProto}//localhost:8889`,             // TIP 已自动适应
          swapsDomain: `${domainProto}//localhost:33008`,            // TIP 已自动适应
          cdnPath    : '/',
        };
      case Domain_EnvEnum.test232:
        return {
          domain     : '47.75.150.232',// TIP 不需要区分 http(s)
          mainDomain : `${domainProto}//47.75.150.232:8889`,         // TIP 已自动适应
          swapsDomain: `${domainProto}//47.75.150.232:33008`,        // TIP 已自动适应
          cdnPath    : '/',
        };
      case Domain_EnvEnum.pre_bgex:
        return {
          domain     : 'bgex.com',// TIP 不需要区分 http(s)
          mainDomain : `${domainProto}//pre-www.bgex.com`,              // TIP 已自动适应
          swapsDomain: `${domainProto}//pre-swap.bgex.com`,              // TIP 已自动适应
          cdnPath    : 'https://pre-swapst.yuegouba.cn/',
        };
      case Domain_EnvEnum.std_bgex:
        return {
          domain     : 'bgex.com',// TIP 不需要区分 http(s)
          mainDomain : `${domainProto}//www.bgex.com`,              // TIP 已自动适应
          swapsDomain: `${domainProto}//swap.bgex.com`,              // TIP 已自动适应
          cdnPath    : 'https://swapst.yuegouba.cn/',
        };
      case Domain_EnvEnum.huaxue:
        return {
          domain     : 'bgex.info',// TIP 不需要区分 http(s)
          mainDomain : `${domainProto}//test-www.bgex.info`,         // TIP 已自动适应
          swapsDomain: `${domainProto}//test-swap.bgex.info`,         // TIP 已自动适应
          cdnPath    : '/',
        };
      default: {
        throw new Error('未预计的分支');
      }
    }
  }

  /**
   * 此处【SSR-Api】
   *        1.【http/https】，只要协议存在，就可以随意使用
   */
  private getSsrApi(): EnvNS.SsrApi_EnvType {
    switch (this.Env_SsrApi) {
      case SsrApi_EnvEnum.tigermex:
        return {
          ssr_baseUrl      : 'https://api.tigermex.com',    // TIP 已经是了
          ssr_swapsUrl     : 'https://api.tigermex.com',    // TIP 已经是了
          ssr_originCoinUrl: 'http://47.75.150.232:33007',                                                        // FIXME 这里，有问题！！！
        };
      case SsrApi_EnvEnum.mybts:
        return {
          ssr_baseUrl      : 'http://co.mybts.info/fe-ex-api',          // WARN 第三方没有提供https
          ssr_swapsUrl     : 'http://co.mybts.info/fe-cov2-api',        // WARN 第三方没有提供https
          ssr_originCoinUrl: 'http://47.75.150.232:33007',                                                        // FIXME 这里，有问题！！！
        };
      case SsrApi_EnvEnum.test232_proxy:
        return {
          ssr_baseUrl      : 'http://47.75.150.232:33007/fe-ex-api',                                              // FIXME 这里，有问题！！！
          ssr_swapsUrl     : 'http://47.75.150.232:33007/fe-cov2-api',                                            // FIXME 这里，有问题！！！
          ssr_originCoinUrl: 'http://47.75.150.232:33007',                                                        // FIXME 这里，有问题！！！
        };
      case SsrApi_EnvEnum.huaxue:
        return {
          ssr_baseUrl      : 'http://devswapapi.bgex.info', // TIP 已经是了
          ssr_swapsUrl     : 'http://devswapapi.bgex.info', // TIP 已经是了
          ssr_originCoinUrl: 'http://test-api.bgex.info',     // TIP 已经是了
        };
      case SsrApi_EnvEnum.pre_bgex:
        return {
          ssr_baseUrl      : 'https://swapapi.yuegouba.cn',          // TIP 已经是了
          ssr_swapsUrl     : 'https://swapapi.yuegouba.cn',          // TIP 已经是了
          ssr_originCoinUrl: 'https://web-api.yuegouba.cn',           // TIP 已经是了
        };
      case SsrApi_EnvEnum.std_bgex:
        return {
          ssr_baseUrl      : 'https://swapapi.yuegouba.cn',          // TIP 已经是了
          ssr_swapsUrl     : 'https://swapapi.yuegouba.cn',          // TIP 已经是了
          ssr_originCoinUrl: 'https://web-api.yuegouba.cn',           // TIP 已经是了
        };
      default: {
        throw new Error('未预计的分支');
      }
    }
  }

  /**
   * 此处【Client-Api】
   *        1.【http/https】，受到域名制约
   *                1.非安全域名，可以访问  http/https 接口
   *                2.https安全域名，仅允许访问  https 接口
   *                3.WARN 综上所述，尽量，全部都走   https 协议
   */
  private getClientApi_AndWs(): EnvNS.ClientApi_AndWs_EnvType {
    switch (this.Env_ClientApi_AndWs) {
      case ClientApi_AndWs_EnvEnum.localhost_proxy:
        return {
          baseUrl      : '/huaxue/proxyBaseUrl',       // WARN 纯本地，无影响
          swapsUrl     : '/huaxue/proxySwapUrl',       // WARN 纯本地，无影响
          originCoinUrl: '/bg/proxyOriginBaseUrl',    // WARN 纯本地，无影响
          //
          webSocketUrl : 'ws://devswapws.bgex.info/realTime',   // TIP 已经是了
        };
      case ClientApi_AndWs_EnvEnum.tigermex:
        return {
          baseUrl      : 'https://api.tigermex.com',              // TIP 已经是了
          swapsUrl     : 'https://api.tigermex.com',              // TIP 已经是了
          originCoinUrl: 'http://47.75.150.232:33007',                                                            // FIXME 这里，有问题！！！
          //
          webSocketUrl : 'wss://api.tigermex.com/wsswap/realTime',// TIP 已经是了
        };
      case ClientApi_AndWs_EnvEnum.mybts:
        return {
          baseUrl      : 'http://co.mybts.info/fe-ex-api',        // WARN 第三方没有提供https
          swapsUrl     : 'http://co.mybts.info/fe-cov2-api',      // WARN 第三方没有提供https
          originCoinUrl: 'http://47.75.150.232:33007',            // WARN 第三方没有提供https
          //
          webSocketUrl : 'ws://ws3.mybts.info/wsswap/realTime',   // WARN 第三方没有提供https
        };
      case ClientApi_AndWs_EnvEnum.test232_proxy:
        return {
          baseUrl      : 'http://47.75.150.232:33007/fe-ex-api',  // WARN 第三方没有提供https
          swapsUrl     : 'http://47.75.150.232:33007/fe-cov2-api',// WARN 第三方没有提供https
          originCoinUrl: 'http://47.75.150.232:33007',            // WARN 第三方没有提供https
          //
          webSocketUrl : 'wss://swapws.huaxue-edu.cn/realTime',   // TIP 已经是了
        };
      case ClientApi_AndWs_EnvEnum.huaxue:
        return {
          baseUrl      : 'http://devswapapi.bgex.info',         // TIP 已经是了
          swapsUrl     : 'http://devswapapi.bgex.info',         // TIP 已经是了
          originCoinUrl: 'http://test-api.bgex.info',             // TIP 已经是了
          //
          webSocketUrl : 'ws://devswapws.bgex.info/realTime',   // TIP 已经是了
        };
      case ClientApi_AndWs_EnvEnum.pre_bgex:
        return {
          baseUrl      : 'https://swapapi.yuegouba.cn',         // TIP 已经是了
          swapsUrl     : 'https://swapapi.yuegouba.cn',         // TIP 已经是了
          originCoinUrl: 'https://web-api.yuegouba.cn',             // TIP 已经是了
          //
          webSocketUrl : 'wss://swapws.aiweishan.cn/realTime',   // TIP 已经是了
        };
      case ClientApi_AndWs_EnvEnum.std_bgex:
        return {
          baseUrl      : 'https://swapapi.yuegouba.cn',         // TIP 已经是了
          swapsUrl     : 'https://swapapi.yuegouba.cn',         // TIP 已经是了
          originCoinUrl: 'https://web-api.yuegouba.cn',             // TIP 已经是了
          //
          webSocketUrl : 'wss://swapws.bgex.com/realTime',   // TIP 已经是了
        };
      default: {
        throw new Error('未预计的分支');
      }
    }
  }

  public getConfig(): EnvNS.CombineEnvType {
    return {
      ...this.getDomain(),
      ...this.getSsrApi(),
      ...this.getClientApi_AndWs(),
      envName: this.Env_Name,
      isYun  : true,
    };
  }
}
