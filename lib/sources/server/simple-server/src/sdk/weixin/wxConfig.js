var WxConfig = /** @class */ (function () {
    function WxConfig() {
    }
    WxConfig.grant_type = 'client_credential';
    WxConfig.app_id = 'wx40242555cdea689c';
    WxConfig.app_secret = 'cd804a0c78b894c3a020d920cd76dce1';
    WxConfig.wx_proxy_base_url = 'https://api.weixin.qq.com/cgi-bin'; // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=AppSecret
    WxConfig.wx_page = 'http://www.geeksuper.top/web-mobile/'; // TIP 微信，必须要这个狗日的页面。
    WxConfig.noncestr = 'testWxShare';
    return WxConfig;
}());
export { WxConfig };
//# sourceMappingURL=wxConfig.js.map