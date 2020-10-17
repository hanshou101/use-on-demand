import cp from './MyCardEasy.vue';

const cpName = 'MyCardEasy';
cp.install   = Vue => Vue.component(cpName, cp);

/**
 * 经过了【多组件按需引入】的简化。
 */
export default cp;
