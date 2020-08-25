/**
 * 参考资料：
 *        1.[【生命周期图示】 Vue 实例 — Vue.js](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
 */
export var VHookE;
(function (VHookE) {
    VHookE["beforeCreate"] = "hook:beforeCreate";
    VHookE["created"] = "hook:created";
    VHookE["beforeMount"] = "hook:beforeMount";
    VHookE["mounted"] = "hook:mounted";
    VHookE["beforeUpdate"] = "hook:beforeUpdate";
    VHookE["updated"] = "hook:updated";
    VHookE["beforeDestroy"] = "hook:beforeDestroy";
    VHookE["destroyed"] = "hook:destroyed";
})(VHookE || (VHookE = {}));
//# sourceMappingURL=vue-hook-enum.js.map