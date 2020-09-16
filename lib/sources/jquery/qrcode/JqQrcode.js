var xX_JqQrcode_Helper = /** @class */ (function () {
    function xX_JqQrcode_Helper() {
    }
    xX_JqQrcode_Helper.drawQrcode = function ($, qrTxt, wH, jDom) {
        var _a;
        if (!window.jQuery) {
            window.jQuery = $;
        }
        require('../lib/jquery.qrcode.min.js'); // 手动导库
        //
        // 绘制二维码
        (_a = jDom.qrcode) === null || _a === void 0 ? void 0 : _a.call(// 手动导库
        jDom, { width: wH, height: wH, text: qrTxt });
    };
    return xX_JqQrcode_Helper;
}());
export { xX_JqQrcode_Helper };
//# sourceMappingURL=JqQrcode.js.map