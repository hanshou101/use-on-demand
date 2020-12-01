export class WxConfig {
  static readonly grant_type        = 'client_credential';
  static readonly app_id            = 'wx40242555cdea689c';
  static readonly app_secret        = 'cd804a0c78b894c3a020d920cd76dce1';
  static readonly wx_proxy_base_url = 'https://api.weixin.qq.com/cgi-bin';         // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=AppSecret
  static readonly wx_page           = 'http://www.geeksuper.top/web-mobile/';     // TIP 微信，必须要这个狗日的页面。
  static readonly noncestr          = 'testWxShare';

}
