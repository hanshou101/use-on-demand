import HelloWorldCfg          from './HelloWorld';
import VideoJSCfg             from './VideoJS';
import Live2D_Config_Dialog   from './Live2D_Config_Dialog';
import MyFormEasy             from '../cp-element-ui/MyFormEasy';
import MyTableEasy            from '../cp-element-ui/MyTableEasy';
import WrapDropdown           from '../cp-element-ui/WrapDropdown';
import MyCardEasy             from '../cp-element-ui/MyCardEasy';
import MultiLangSimple        from '../cp-element-ui/MultiLangSimple';
import Tinymce                from '../components/Tinymce';
import SimpleDemo_Dialog      from '../components/SimpleDemo_Dialog';
import ElementUI_ListDemo     from '../components/ElementUI_ListDemo';
import Tinymce_EditorImage    from '../components/Tinymce_EditorImage';
import UploadSingleImg        from '../cp-element-ui/UploadSingleImg';
import Count_Input            from '../cp-element-ui/Count_Input';
import ElTableItem_DetailInfo from '../cp-element-ui/ElTableItem_DetailInfo';
import StatisticalCard        from '../cp-element-ui/StatisticalCard';
import MultiLangPlus          from '../cp-element-ui/MultiLangPlus';

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
	Vue.use(Tinymce_EditorImage);
	Vue.use(UploadSingleImg);
	Vue.use(Count_Input);
	Vue.use(ElTableItem_DetailInfo);
	Vue.use(StatisticalCard);
	Vue.use(MultiLangPlus);
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

export default {
	install,
};
