import Vue from 'vue';

enum TestE {
  A,
  B,
}

//

const GlobalEnums = {
  TestE: TestE,
};

Vue.prototype.$Enums = GlobalEnums;

declare global {
  type GlobalEnums_Type = typeof GlobalEnums;
}
