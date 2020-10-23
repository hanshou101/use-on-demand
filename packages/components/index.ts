import HelloWorldCfg        from './HelloWorld';
import VideoJSCfg           from './VideoJS';
import Live2D_Config_Dialog from './Live2D_Config_Dialog';
import MyFormEasy           from '../cp-element-ui/MyFormEasy';
import MyTableEasy          from '../cp-element-ui/MyTableEasy';
import WrapDropdown         from '../cp-element-ui/WrapDropdown';
import MyCardEasy           from '../cp-element-ui/MyCardEasy';
import MultiLangSimple      from '../cp-element-ui/MultiLangSimple';
import Tinymce              from '../components/Tinymce';
import SimpleDemo_Dialog    from '../components/SimpleDemo_Dialog';
import ElementUI_ListDemo   from '../components/ElementUI_ListDemo';

const install = function(Vue: VueConstructor_Type, opts = {}) {
	Vue.use(HelloWorldCfg);
	Vue.use(VideoJSCfg);
	Vue.use(Live2D_Config_Dialog);
	Vue.use(MyFormEasy);
	Vue.use(MyTableEasy);
	Vue.use(WrapDropdown);
	Vue.use(MyCardEasy);
	Vue.use(MultiLangSimple);
	Vue.use(Tinymce);
	Vue.use(SimpleDemo_Dialog);
	Vue.use(ElementUI_ListDemo);
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
};
