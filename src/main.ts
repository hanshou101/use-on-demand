import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';       // TIP 通过导入这句，开启【Element-UI】相关的类型检查。

Vue.config.productionTip = false;

Vue.use(ElementUI);                 // TIP 通过导入这句，开启【Element-UI】相关的类型检查。

new Vue({
  render: h => h(App),
}).$mount('#app');
