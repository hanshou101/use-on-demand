export class SwapFilter_Helper {
    static init(vue) {
        const filterKeys = Object.keys(SwapFilter_Helper._Filter);
        // 批量绑定。
        filterKeys.forEach((key) => {
            vue.filter(key, SwapFilter_Helper._Filter[key]);
        });
        return this._Filter;
    }
}
SwapFilter_Helper._Filter = {
// numberFormat  : Util.numberFormat,
// splitFormat   : Util.splitFormat,
// timeFormat    : Util.timeFormat,
// retainDecimals: Util.retainDecimals,
// fixD          : Util.fixD,
// addZero       : Util.addZero,
// addCommom     : Util.addCommom
};
//# sourceMappingURL=swap-filter.js.map