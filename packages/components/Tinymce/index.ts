import cp from './Tinymce.vue';

const cpName = 'Tinymce';
cp.install   = Vue => Vue.component(cpName, cp);

/**
 * 经过了【多组件按需引入】的简化。
 */
export default cp;
