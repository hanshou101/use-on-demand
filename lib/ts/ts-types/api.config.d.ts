// declare global {
interface ApiConfig {
  // cookie domain,change this to save cookie
  domain: string;
  mainDomain: string;
  swapsDomain: string;
  // 供服务器渲染的时候，调用接口
  ssr_baseUrl: string;
  ssr_swapsUrl: string;
  ssr_originCoinUrl: string;
  // api URL,change this to get Data
  baseUrl: string;    // 生产环境 （客户端）主站api
  swapsUrl: string;   // 生产环境 （客户端）合约站api
  originCoinUrl: string;          // 以前的币币站，api地址
  //
  webSocketUrl: string;          // 生产环境  合约站websocket地址
  // 如果是合约云则为true
  isYun: boolean;

  // 没什么必要的值
  testUrl?: string;
}

// }
