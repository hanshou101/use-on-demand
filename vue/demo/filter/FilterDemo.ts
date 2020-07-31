import Vue from 'vue';

const Filter = {
  // numberFormat  : Util.numberFormat,
  // splitFormat   : Util.splitFormat,
  // timeFormat    : Util.timeFormat,
  // retainDecimals: Util.retainDecimals,
  // fixD          : Util.fixD,
  // addZero       : Util.addZero,
  // addCommom     : Util.addCommom
};


type KeysType = keyof typeof Filter;
const filterKeys = Object.keys(Filter) as Array<KeysType>;
filterKeys.forEach(key => {
  Vue.filter(key, Filter[key]);
});
export default Filter;
