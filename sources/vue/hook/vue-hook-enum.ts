/**
 * 参考资料：
 *        1.[【生命周期图示】 Vue 实例 — Vue.js](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)
 */
export enum VHookE {
  beforeCreate  = 'hook:beforeCreate',
  created       = 'hook:created',
  beforeMount   = 'hook:beforeMount',
  mounted       = 'hook:mounted',
  beforeUpdate  = 'hook:beforeUpdate',
  updated       = 'hook:updated',
  beforeDestroy = 'hook:beforeDestroy',
  destroyed     = 'hook:destroyed',
}
