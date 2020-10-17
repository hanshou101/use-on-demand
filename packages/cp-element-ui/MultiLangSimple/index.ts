import cp from './MultiLangSimple.vue';

const cpName = 'MultiLangSimple';
cp.install   = Vue => Vue.component(cpName, cp);

/**
 * 经过了【多组件按需引入】的简化。
 */
export default cp;
