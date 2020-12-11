import { __assign } from "tslib";
import formidable from 'formidable';
import request from 'request';
import { FppConfig } from './fppConfig';
function fpp_beauty(req, res, next) {
    // TIP 此处，加上该接口的超时时间。（比如5分钟。）
    // 设置所有HTTP请求的超时时间
    req.setTimeout(5 * 60 * 1000, function () {
        console.log('请求超时');
    });
    // 设置所有HTTP请求的服务器响应超时时间
    res.setTimeout(5 * 60 * 1000, function () {
        console.log('返回超时');
    });
    // 首先，访问自身的接口。获取Token值。
    console.log('获取原始originalUrl？', req.originalUrl); // TIP 这个，就是你所需要的。原始子URL。
    // TIP 解析【POST-FormData】
    // TIP 既可以获得【参数列表】，也可以获得【上传文件】。
    var formUtil = new formidable.IncomingForm();
    formUtil.parse(req, function (err, fields, files) {
        // console.log("获取，请求中所携带的fields", fields)
        // console.log('获取，请求中所携带的files', files)
        // TIP 看了一下TypeScript的API，可以直接读取属性。
        // var api_key = fields['api_key']                  // FIXME 由服务器端，存储。
        // var api_secret = fields['api_secret']            // FIXME 由服务器端，存储。
        var image_base64 = fields['image_base64'];
        var my_params_json = {
            api_key: FppConfig.FacePP_api_key,
            api_secret: FppConfig.FacePP_api_secret,
            image_base64: image_base64,
        };
        console.log('我将要发送的数据为：', my_params_json, '\n 通过FormData形式。');
        request(/*options*/ {
            headers: {
                'Connection': 'close',
                'content-type': 'application/json',
            },
            url: 'https://api-cn.faceplusplus.com/facepp/beta/beautify',
            method: 'POST',
            json: true,
            // body: my_params_json                                            // TIP 设置上传的body（如果为POST请求的话）。
            formData: my_params_json,
        }, function callback(error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log('------接口数据------', data);
                // TIP 此时，已经获取到wx_token的JSON对象。
                res.json(__assign(__assign({}, data), { result: 'data:image/jpg;base64,' + data.result })); // TIP 返回给浏览器。
                /**
                 * { "time_used": 560, "result":"", "request_id": 123 }
                 */
            }
            else {
                console.log('返回的整体为：', response, '\n', '显示错误码：', error, '  显示状态码：', response.statusCode);
            }
        });
    });
    // res.body(req.body)      // TIP 原样返回，试一下？
}
export { fpp_beauty, };
//# sourceMappingURL=fpp_beauty.js.map