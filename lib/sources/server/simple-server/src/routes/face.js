import { __awaiter, __generator } from "tslib";
import e from 'express';
import formidable from 'formidable'; // TIP 此处，用于【Post-FormData】的解析。
import { wx_getToken_apiHandler } from '../sdk/weixin/wx_getToken';
import { wx_getTicket } from '../sdk/weixin/wx_getTicket';
import { fpp_beauty } from '../sdk/facepp/fpp_beauty';
import { fpp_faceMerge } from '../sdk/facepp/fpp_faceMerge';
import { xxin_getToken } from '../sdk/xiangxin/xxin_getToken';
var router = e.Router();
// TIP ——————————————————————————————————————网络接口——————————————————————————
// TIP 获取首页
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
// TIP 另一个首页
router.get('/1', function (req, res, next) {
    res.sendfile('public/tui.image-editor/examples/example02-useApiDirect.html');
    // res.render('index', { title: 'Express' });
});
// TIP 返回Cocos游戏页面。
router.get('/web-mobile', function (req, res, next) {
    res.sendfile('public/web-mobile/index.html');
    // res.render('index', { title: 'Express' });
});
// TIP 返回百度接口。
router.get('/baidu-test', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var baidu_result_promise, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baidu_result_promise = require('../sdk/baidu/face/doc_kid_AipBodyAnalysisClient').result_promise;
                    return [4 /*yield*/, baidu_result_promise];
                case 1:
                    value = _a.sent();
                    // 返回
                    res.json(value);
                    return [2 /*return*/];
            }
        });
    });
});
// TIP 返回图像模型。
router.get('/2', function (req, res, next) {
    res.sendfile('public/graphic_model/belong_Python_Demo.html');
});
// TIP 返回赛车手游戏页面。
router.get('/mbaex-face-swap', function (req, res, next) {
    res.sendfile('public/mbaex-face-swap.html');
    // res.render('index', { title: 'Express' });
});
// TIP 获取【微信】的【Token】。
router.get('/token', wx_getToken_apiHandler);
// TIP 获取【微信】的【Ticket】。
router.get('/ticket/getticket', wx_getTicket);
// TIP 获取【Face++】的【凭证】。
// 【Post】
// TIP 获取【Face++】的【美颜接口】。
router.post('/beauty', fpp_beauty);
// TIP Face++的【人脸融合】接口
router.post('/face-merge', fpp_faceMerge);
// TIP 上传【base64字符流】，然后由服务器解析成图片，最后以二进制流的方式返回客户端。
router.post('/download_image', function (req, res, next) {
    // 解析【POST-FormData】
    // 既可以获得【参数列表】，也可以获得【上传文件】。
    var formUtil = new formidable.IncomingForm();
    formUtil.parse(req, function (err, fields, files) {
        // console.log("获取，请求中所携带的fields", fields)
        // console.log('获取，请求中所携带的files', files)
        // 看了一下TypeScript的API，可以直接读取属性。
        // var api_key = fields['api_key']                  // FIXME 由服务器端，存储。
        // var api_secret = fields['api_secret']            // FIXME 由服务器端，存储。
        var image_base64 = fields.image_base64;
    });
});
// TIP 获取【相芯科技】的Token。
router.get('/xiangxin', xxin_getToken);
// module.exports = router;
export { router as faceRouter, };
//# sourceMappingURL=face.js.map