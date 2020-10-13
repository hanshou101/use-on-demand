import HelloWorldCfg from './hello-world';
import VideoJSCfg    from './video-js';

const install = function(Vue: VueConstructor_Type, opts = {}) {
	Vue.use(HelloWorldCfg);
	Vue.use(VideoJSCfg);
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
};
