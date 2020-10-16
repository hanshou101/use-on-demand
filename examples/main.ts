import Vue           from 'vue';
import App           from './App.vue';
import { AppRouter } from './router';
// import { AppI18n }   from './i18n';

import 'element-ui/lib/theme-chalk/index.css';		// Element-UI的CSS。


// import HelloWorld from '../packages/to-build';
// import Cp, {HelloWorld} from 'test-vue-cli-4';


// console.log('Cp', Cp);
// console.log('HelloWorld', HelloWorld);

Vue.config.productionTip = false;


// Vue.use(Cp);

new Vue({
	render: h => h(App),
	router: AppRouter,
	// i18n  : AppI18n,
}).$mount('#app');
