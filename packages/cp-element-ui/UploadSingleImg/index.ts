import cp from './UploadSingleImg.vue';

const cpName = 'UploadSingleImg';
cp.install   = Vue => Vue.component(cpName, cp);

/**
 * 经过了【多组件按需引入】的简化。
 */
export default cp;
