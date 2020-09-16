
export class xX_SwapFilter_Helper {
  private static _Filter = {
    // numberFormat  : Util.numberFormat,
    // splitFormat   : Util.splitFormat,
    // timeFormat    : Util.timeFormat,
    // retainDecimals: Util.retainDecimals,
    // fixD          : Util.fixD,
    // addZero       : Util.addZero,
    // addCommom     : Util.addCommom
  };

  public static init(vue: VueConstructor_Type) {
    type KeysType = keyof typeof xX_SwapFilter_Helper._Filter;
    const filterKeys = Object.keys(xX_SwapFilter_Helper._Filter) as Array<KeysType>;

    // 批量绑定。
    filterKeys.forEach((key) => {
      vue.filter(key, xX_SwapFilter_Helper._Filter[key]);
    });
    return this._Filter;
  }

}
