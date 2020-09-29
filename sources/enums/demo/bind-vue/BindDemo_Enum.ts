import Vue from 'vue';

enum TestE {
	A,
	B,
}

const enum BetterEnumE {
	AAA,
	BBB,
}

// WARN 以下这种用法，对于【const enum】会报错。
// console.log(BetterEnumE[0]);

//

const GlobalEnums = {
	TestE: TestE,
};

Vue.prototype.$Enums = GlobalEnums;

declare global {
	type GlobalEnums_Type = typeof GlobalEnums;
}
