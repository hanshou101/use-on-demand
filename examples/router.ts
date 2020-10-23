import VueRouter from 'vue-router';
import Vue       from 'vue';

Vue.use(VueRouter);

type Enhanced_RouteConfig_Type = RouteConfig_Type & {
	intro: string;
	children?: Array<Enhanced_RouteConfig_Type>;
}

const _routes: Array<Enhanced_RouteConfig_Type> = [
	// 基础测试页
	{
		intro    : '基础测试页',
		name     : 'base-demo',
		path     : 'base-demo',
		component: () => import('./views/BaseDemo.vue'),
	},
	// Webgl容器页
	{
		intro    : 'Webgl容器页',
		name     : 'webgl-container',
		path     : 'webgl-container',
		component: () => import('./views/WebglContainer.vue'),
		children : [
			// 基本课程
			{
				intro    : '基本课程',
				name     : 'webgl-course',
				path     : 'webgl-course',
				component: () => import('../packages/components/webgl-demos/Course.vue'),
			},
			//  迷你城市
			{
				intro    : '迷你城市',
				name     : 'mini-city',
				path     : 'mini-city',
				component: () => import('../packages/components/webgl-demos/ThreeJS_MiniCity.vue'),
			},
			//  德扑桌面
			{
				intro    : '德扑桌面',
				name     : 'depu-table',
				path     : 'depu-table',
				component: () => import('../packages/components/webgl-demos/DepuTable.vue'),
			},
			//  OnePiece
			{
				intro    : 'OnePiece',
				name     : 'one-piece-demo',
				path     : 'one-piece-demo',
				component: () => import('../packages/components/webgl-demos/OnePieceDemo.vue'),
			},
			//  波浪球
			{
				intro    : '波浪球',
				name     : 'wave-ball',
				path     : 'wave-ball',
				component: () => import('../packages/components/webgl-demos/WaveBall.vue'),
			},
		],
	},
	//  视频播放器
	{
		intro    : '视频播放器',
		name     : 'video-js',
		path     : 'video-js',
		component: () => import('./views/VideoJSDemo.vue'),
	},
	//  Live2D配置对话框
	{
		intro    : 'Live2D配置对话框',
		name     : 'live-2d-config-dialog-demo',
		path     : 'live-2d-config-dialog-demo',
		component: () => import('./views/Live2D_Config_Dialog_Demo.vue'),
	},
	// ElementUI-列表测试
	{
		intro    : 'ElementUI-列表测试',
		name     : 'element-ui-list-demo',
		path     : 'element-ui-list-demo',
		component: () => import('../packages/components/ElementUI_ListDemo/ElementUI_ListDemo.vue'),
	},
];

export const AppRouter = new VueRouter({
	routes: _routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0,
		};
	},
});

export function flatRoute_toArr() {
	const arr: Array<Enhanced_RouteConfig_Type> = [];

	function flat(routeArr: Array<Enhanced_RouteConfig_Type>) {
		routeArr.forEach(cfg => {
			if (cfg.children) {
				flat(cfg.children);
			} else {
				arr.push(cfg);
			}
		});
	}

	flat(_routes);
	return arr;
}
