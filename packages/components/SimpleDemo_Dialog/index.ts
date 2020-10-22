import cp from './SimpleDemo_Dialog.vue';

const cpName = 'SimpleDemo_Dialog';
cp.install   = Vue => Vue.component(cpName, cp);

/**
 * 经过了【多组件按需引入】的简化。
 */
export default cp;
