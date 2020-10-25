var xX_ExceptionError_Helper = /** @class */ (function () {
    function xX_ExceptionError_Helper() {
    }
    xX_ExceptionError_Helper.throwError_andLog = function (err) {
        console.error(err);
        throw new Error(err);
        // @ts-ignore
        return err;
    };
    return xX_ExceptionError_Helper;
}());
export { xX_ExceptionError_Helper };
//# sourceMappingURL=ExceptionError_Helper.js.map