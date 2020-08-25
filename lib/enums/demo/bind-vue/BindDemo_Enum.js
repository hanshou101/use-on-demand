import Vue from 'vue';
var TestE;
(function (TestE) {
    TestE[TestE["A"] = 0] = "A";
    TestE[TestE["B"] = 1] = "B";
})(TestE || (TestE = {}));
//
const GlobalEnums = {
    TestE: TestE,
};
Vue.prototype.$Enums = GlobalEnums;
//# sourceMappingURL=BindDemo_Enum.js.map