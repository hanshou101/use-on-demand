import request from "request";
import { WxConfig } from "./wxConfig";
// var method = req.method.toUpperCase();       // TIP 方法名，大写。
var wx_access_token_json = null;
var wx_access_token_lastUpdateTime = new Date().getTime(); // TIP 服务器启动时，则自动记录当前时间。
var expireTime = (7200 - 500) * 1000; // TIP 暂定为7200秒。（再减去500秒，因为考虑到延时）
// 获取Token
function wx_getToken_apiHandler(req, res, next) {
    console.log('获得的子path为：', req.path);
    console.log('获得的host主机名为：', req.host);
    console.log('获取get请求的全部参数？', req.query);
    console.log('获取原始originalUrl？', req.originalUrl); // TIP 这个，就是你所需要的。原始子URL。
    if (wx_access_token_json // token已存在。
        &&
            (new Date().getTime() - wx_access_token_lastUpdateTime < expireTime) // 且，token还处于有效时期之内。
    ) {
        console.log('满足条件：有Token，且没有过期，则直接返回');
        console.log('距离过期时间，还有', (wx_access_token_lastUpdateTime + expireTime - new Date().getTime()) / 1000, '秒');
        res.json(wx_access_token_json);
    }
    else {
        // 重新获取，微信token。
        console.log('此时，没有token，或者token已经过期，尝试重新获取token。');
        // TIP 收到桥接服务器的网络请求之后，向微信服务器，发送Token请求。
        request(/*options*/ {
            headers: { "Connection": "close" },
            // url: wx_proxy_base_url + req.originalUrl,
            url: WxConfig.wx_proxy_base_url + req.originalUrl + ("?grant_type=" + WxConfig.grant_type + "&appid=" + WxConfig.app_id + "&secret=" + WxConfig.app_secret),
            method: 'GET',
            json: true,
        }, function callback(error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log('------接口数据------', data);
                // TIP 此时，需要记录token，以及token更新的时间。
                wx_access_token_lastUpdateTime = new Date().getTime();
                wx_access_token_json = data;
                // expireTime = data.expires_in     // 过期时间，暂时可以写死。
                res.json(data);
            }
        });
    }
}
export { wx_getToken_apiHandler };
//# sourceMappingURL=wx_getToken.js.map