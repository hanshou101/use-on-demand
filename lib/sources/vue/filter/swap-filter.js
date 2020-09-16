var xX_SwapFilter_Helper = /** @class */ (function () {
    function xX_SwapFilter_Helper() {
    }
    xX_SwapFilter_Helper.init = function (vue) {
        var filterKeys = Object.keys(xX_SwapFilter_Helper._Filter);
        // 批量绑定。
        filterKeys.forEach(function (key) {
            vue.filter(key, xX_SwapFilter_Helper._Filter[key]);
        });
        return this._Filter;
    };
    xX_SwapFilter_Helper._Filter = {
    // numberFormat  : Util.numberFormat,
    // splitFormat   : Util.splitFormat,
    // timeFormat    : Util.timeFormat,
    // retainDecimals: Util.retainDecimals,
    // fixD          : Util.fixD,
    // addZero       : Util.addZero,
    // addCommom     : Util.addCommom
    };
    return xX_SwapFilter_Helper;
}());
export { xX_SwapFilter_Helper };
//# sourceMappingURL=swap-filter.js.map