var xX_Fix_WxRedirec_Util = /** @class */ (function () {
    function xX_Fix_WxRedirec_Util() {
    }
    xX_Fix_WxRedirec_Util.check_isRedirctByWx = function () {
        var hash = location.hash;
        var wxQuery = location.search;
        console.log('进行判断', hash, wxQuery);
        if (wxQuery.includes('from=singlemessage')
            || wxQuery.includes('isappinstalled')) {
            alert('欢迎从微信分享进入产品页，请确认进入重定向');
            var newUrl = location.protocol + "//" + location.host + "/" + hash;
            console.log(newUrl);
            location.href = newUrl;
        }
    };
    return xX_Fix_WxRedirec_Util;
}());
export { xX_Fix_WxRedirec_Util };
//# sourceMappingURL=Fix_WxRedirec_Util.js.map