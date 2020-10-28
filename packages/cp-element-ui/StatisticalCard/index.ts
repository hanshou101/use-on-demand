import cp from './StatisticalCard.vue';

const cpName = 'StatisticalCard';
cp.install   = Vue => Vue.component(cpName, cp);

/**
 * 经过了【多组件按需引入】的简化。
 */
export default cp;
