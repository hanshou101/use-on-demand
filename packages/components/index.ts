import HelloWorldCfg        from './HelloWorld';
import VideoJSCfg           from './VideoJS';
import Live2D_Config_Dialog from './Live2D_Config_Dialog';
import MyFormEasy           from '../cp-element-ui/MyFormEasy';
import MyTableEasy          from '../cp-element-ui/MyTableEasy';

const install = function(Vue: VueConstructor_Type, opts = {}) {
	Vue.use(HelloWorldCfg);
	Vue.use(VideoJSCfg);
	Vue.use(Live2D_Config_Dialog);
	Vue.use(MyFormEasy);
	Vue.use(MyTableEasy);
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
};
