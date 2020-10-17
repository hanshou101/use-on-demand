import { actionTree, getAccessorType, getterTree, mutationTree } from 'typed-vuex';
import Vue                                                       from 'vue';
import Vuex, { Store }                                           from 'vuex';
import { useAccessor }                                           from 'typed-vuex';


const state     = () => ({
	language: 'zh',
});    // 暂时是空的
const mutations = mutationTree(state, {});   // 暂时是空的
const getters   = getterTree(state, {
	language: (state, getters1) => {
		return state.language;
	},
});     // 暂时是空的

const actions = actionTree({
	state,
	getters,
	mutations,
}, {});

const __modules = {
	// dic,
};

const storeCfg = {
	actions,
	mutations,
	state,
	getters,
	modules: __modules,
};

Vue.use(Vuex);

export const AppStore = new Vuex.Store(storeCfg);

const accessor          = useAccessor(AppStore, storeCfg);
Vue.prototype.$accessor = accessor;
