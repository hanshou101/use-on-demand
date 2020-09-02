import Vue from 'vue';
import App from './App.vue';


// import HelloWorld from '../packages/to-build';
import Cp, {HelloWorld} from 'test-vue-cli-4';


console.log('Cp', Cp);
console.log('HelloWorld', HelloWorld);

Vue.config.productionTip = false;


Vue.use(Cp);

new Vue({
  render: h => h(App)
}).$mount('#app');
