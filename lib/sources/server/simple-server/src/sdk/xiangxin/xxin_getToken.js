import request from "request";
import urlencode from 'urlencode';
import { createHash } from "crypto";
import { XxinConfig } from "./xxinConfig";
function xxin_getToken(req, res, next) {
    var encode_API_Key = urlencode(XxinConfig.raw_API_Key);
    var encode_API_Secret = urlencode(XxinConfig.raw_API_Secret);
    var params_field = "test";
    var params_map = {
        params: params_field,
        Key: XxinConfig.raw_API_Key
    };
    var signature_field = getXiangXin_Signature(params_map, XxinConfig.raw_API_Secret);
    console.log("服务端获取的签名", signature_field);
    var url = XxinConfig.tokenApi + "?params=" + params_field + "&Key=" + encode_API_Key + "&Signature=" + signature_field;
    console.log('请求url', url);
    request(/*options*/ {
        // TIP 这里，估计网上资料的初衷，是为了避免大量【close_wait】的问题。
        url: url /* + signature_field*/,
        method: 'GET'
    }, function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('------接口数据------', data);
            console.log('此时，已经获取到了TICKET的数据。');
            res.json(JSON.parse(data));
        }
    });
}
// 简单按照相芯文档说明，签名
function getXiangXin_Signature(params, secrect) {
    var keys = Object.keys(params).sort(); //按参数排序
    var sign_str = '';
    keys.forEach(function (value, index) {
        sign_str += value + params[value];
    });
    sign_str += secrect; //连接secrect
    return createHash('sha1').update(sign_str).digest('hex'); //返回被签名串的sha1值
}
export { xxin_getToken, };
//# sourceMappingURL=xxin_getToken.js.map