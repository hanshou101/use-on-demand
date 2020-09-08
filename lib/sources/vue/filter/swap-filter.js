var SwapFilter_Helper = /** @class */ (function () {
    function SwapFilter_Helper() {
    }
    SwapFilter_Helper.init = function (vue) {
        var filterKeys = Object.keys(SwapFilter_Helper._Filter);
        // 批量绑定。
        filterKeys.forEach(function (key) {
            vue.filter(key, SwapFilter_Helper._Filter[key]);
        });
        return this._Filter;
    };
    SwapFilter_Helper._Filter = {
    // numberFormat  : Util.numberFormat,
    // splitFormat   : Util.splitFormat,
    // timeFormat    : Util.timeFormat,
    // retainDecimals: Util.retainDecimals,
    // fixD          : Util.fixD,
    // addZero       : Util.addZero,
    // addCommom     : Util.addCommom
    };
    return SwapFilter_Helper;
}());
export { SwapFilter_Helper };
//# sourceMappingURL=swap-filter.js.map