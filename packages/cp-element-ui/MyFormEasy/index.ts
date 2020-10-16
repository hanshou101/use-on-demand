import cp from './MyFormEasy.vue';

const cpName = 'MyFormEasy';
cp.install   = Vue => Vue.component(cpName, cp);

/**
 * 经过了【多组件按需引入】的简化。
 */
export default cp;
