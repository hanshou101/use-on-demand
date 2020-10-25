import { __assign } from "tslib";
import { ClientApi_AndWs_EnvEnum, Domain_EnvEnum, SsrApi_EnvEnum } from './EnvEnum';
import { xX_ExceptionError_Helper } from '../../exception-error/ExceptionError_Helper';
// import {stCookie as cookie}                                      from '../assets/js/cookie/cookie';
var isDev = process.env.NODE_ENV === 'development';
var isClient = process.client;
// 服务端，或者【https】网站的客户端，使用https协议。（WARN 此处，必须建立在，接口本身支持https的情况下）
// const needSecureProtocol = !isClient || location.protocol.includes('https');
// 目前，仅域名，设置自动适配。（服务端，https；客户端，自动判断）
var secureDomain = !isClient || location.protocol.includes('https');
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
var EnvUnit = /** @class */ (function () {
    function EnvUnit(Env_Name, // 【环境名】标识符
    Env_Domain, // 域名
    Env_SsrApi, // 服务端接口
    Env_ClientApi_AndWs) {
        this.Env_Name = Env_Name;
        this.Env_Domain = Env_Domain;
        this.Env_SsrApi = Env_SsrApi;
        this.Env_ClientApi_AndWs = Env_ClientApi_AndWs;
    }
    /**
     * 此处【域名】：
     *        1.WARN 【http/https】敏感
     *        2.
     */
    EnvUnit.prototype.getDomain = function () {
        /**
         *        1.服务端默认https        （其实，没有用到）
         *        2.客户端自动适配
         *        3.注意，后面是带冒号的。
         */
        var domainProto = isClient ? location.protocol : 'https:';
        switch (this.Env_Domain) {
            case Domain_EnvEnum.localhost:
                return {
                    domain: 'localhost',
                    mainDomain: domainProto + "//localhost:8889",
                    swapsDomain: domainProto + "//localhost:33008",
                    cdnPath: '/',
                };
            case Domain_EnvEnum.test232:
                return {
                    domain: '47.75.150.232',
                    mainDomain: domainProto + "//47.75.150.232:8889",
                    swapsDomain: domainProto + "//47.75.150.232:33008",
                    cdnPath: '/',
                };
            case Domain_EnvEnum.pre_bgex:
                return {
                    domain: 'bgex.com',
                    mainDomain: domainProto + "//pre-www.bgex.com",
                    swapsDomain: domainProto + "//pre-swap.bgex.com",
                    cdnPath: 'https://pre-swapst.yuegouba.cn/',
                };
            case Domain_EnvEnum.std_bgex:
                return {
                    domain: 'bgex.com',
                    mainDomain: domainProto + "//www.bgex.com",
                    swapsDomain: domainProto + "//swap.bgex.com",
                    cdnPath: 'https://swapst.yuegouba.cn/',
                };
            case Domain_EnvEnum.huaxue:
                return {
                    domain: 'bgex.info',
                    mainDomain: domainProto + "//test-www.bgex.info",
                    swapsDomain: domainProto + "//test-swap.bgex.info",
                    cdnPath: '/',
                };
            default: {
                throw new Error(xX_ExceptionError_Helper.throwError_andLog('未预计的分支'));
            }
        }
    };
    /**
     * 此处【SSR-Api】
     *        1.【http/https】，只要协议存在，就可以随意使用
     */
    EnvUnit.prototype.getSsrApi = function () {
        switch (this.Env_SsrApi) {
            case SsrApi_EnvEnum.tigermex:
                return {
                    ssr_baseUrl: 'https://api.tigermex.com',
                    ssr_swapsUrl: 'https://api.tigermex.com',
                    ssr_originCoinUrl: 'http://47.75.150.232:33007',
                };
            case SsrApi_EnvEnum.mybts:
                return {
                    ssr_baseUrl: 'http://co.mybts.info/fe-ex-api',
                    ssr_swapsUrl: 'http://co.mybts.info/fe-cov2-api',
                    ssr_originCoinUrl: 'http://47.75.150.232:33007',
                };
            case SsrApi_EnvEnum.test232_proxy:
                return {
                    ssr_baseUrl: 'http://47.75.150.232:33007/fe-ex-api',
                    ssr_swapsUrl: 'http://47.75.150.232:33007/fe-cov2-api',
                    ssr_originCoinUrl: 'http://47.75.150.232:33007',
                };
            case SsrApi_EnvEnum.huaxue:
                return {
                    ssr_baseUrl: 'http://devswapapi.bgex.info',
                    ssr_swapsUrl: 'http://devswapapi.bgex.info',
                    ssr_originCoinUrl: 'http://test-api.bgex.info',
                };
            case SsrApi_EnvEnum.pre_bgex:
                return {
                    ssr_baseUrl: 'https://swapapi.yuegouba.cn',
                    ssr_swapsUrl: 'https://swapapi.yuegouba.cn',
                    ssr_originCoinUrl: 'https://web-api.yuegouba.cn',
                };
            case SsrApi_EnvEnum.std_bgex:
                return {
                    ssr_baseUrl: 'https://swapapi.yuegouba.cn',
                    ssr_swapsUrl: 'https://swapapi.yuegouba.cn',
                    ssr_originCoinUrl: 'https://web-api.yuegouba.cn',
                };
            default: {
                throw new Error(xX_ExceptionError_Helper.throwError_andLog('未预计的分支'));
            }
        }
    };
    /**
     * 此处【Client-Api】
     *        1.【http/https】，受到域名制约
     *                1.非安全域名，可以访问  http/https 接口
     *                2.https安全域名，仅允许访问  https 接口
     *                3.WARN 综上所述，尽量，全部都走   https 协议
     */
    EnvUnit.prototype.getClientApi_AndWs = function () {
        switch (this.Env_ClientApi_AndWs) {
            case ClientApi_AndWs_EnvEnum.localhost_proxy:
                return {
                    baseUrl: '/huaxue/proxyBaseUrl',
                    swapsUrl: '/huaxue/proxySwapUrl',
                    originCoinUrl: '/bg/proxyOriginBaseUrl',
                    //
                    webSocketUrl: 'ws://devswapws.bgex.info/realTime',
                };
            case ClientApi_AndWs_EnvEnum.tigermex:
                return {
                    baseUrl: 'https://api.tigermex.com',
                    swapsUrl: 'https://api.tigermex.com',
                    originCoinUrl: 'http://47.75.150.232:33007',
                    //
                    webSocketUrl: 'wss://api.tigermex.com/wsswap/realTime',
                };
            case ClientApi_AndWs_EnvEnum.mybts:
                return {
                    baseUrl: 'http://co.mybts.info/fe-ex-api',
                    swapsUrl: 'http://co.mybts.info/fe-cov2-api',
                    originCoinUrl: 'http://47.75.150.232:33007',
                    //
                    webSocketUrl: 'ws://ws3.mybts.info/wsswap/realTime',
                };
            case ClientApi_AndWs_EnvEnum.test232_proxy:
                return {
                    baseUrl: 'http://47.75.150.232:33007/fe-ex-api',
                    swapsUrl: 'http://47.75.150.232:33007/fe-cov2-api',
                    originCoinUrl: 'http://47.75.150.232:33007',
                    //
                    webSocketUrl: 'wss://swapws.huaxue-edu.cn/realTime',
                };
            case ClientApi_AndWs_EnvEnum.huaxue:
                return {
                    baseUrl: 'http://devswapapi.bgex.info',
                    swapsUrl: 'http://devswapapi.bgex.info',
                    originCoinUrl: 'http://test-api.bgex.info',
                    //
                    webSocketUrl: 'ws://devswapws.bgex.info/realTime',
                };
            case ClientApi_AndWs_EnvEnum.pre_bgex:
                return {
                    baseUrl: 'https://swapapi.yuegouba.cn',
                    swapsUrl: 'https://swapapi.yuegouba.cn',
                    originCoinUrl: 'https://web-api.yuegouba.cn',
                    //
                    webSocketUrl: 'wss://swapws.aiweishan.cn/realTime',
                };
            case ClientApi_AndWs_EnvEnum.std_bgex:
                return {
                    baseUrl: 'https://swapapi.yuegouba.cn',
                    swapsUrl: 'https://swapapi.yuegouba.cn',
                    originCoinUrl: 'https://web-api.yuegouba.cn',
                    //
                    webSocketUrl: 'wss://swapws.bgex.com/realTime',
                };
            default: {
                throw new Error(xX_ExceptionError_Helper.throwError_andLog('未预计的分支'));
            }
        }
    };
    EnvUnit.prototype.getConfig = function () {
        return __assign(__assign(__assign(__assign({}, this.getDomain()), this.getSsrApi()), this.getClientApi_AndWs()), { envName: this.Env_Name, isYun: true });
    };
    return EnvUnit;
}());
export { EnvUnit };
//# sourceMappingURL=EnvUnit.js.map