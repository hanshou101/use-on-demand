import Vue from 'vue';
var TestE;
(function (TestE) {
    TestE[TestE["A"] = 0] = "A";
    TestE[TestE["B"] = 1] = "B";
})(TestE || (TestE = {}));
// WARN 以下这种用法，对于【const enum】会报错。
// console.log(BetterEnumE[0]);
//
var GlobalEnums = {
    TestE: TestE,
};
Vue.prototype.$Enums = GlobalEnums;
//# sourceMappingURL=BindDemo_Enum.js.map