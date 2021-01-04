// TIP—————————————————————————————————————————————系统依赖——————————————————————————————————————
import { Router } from 'express';

// TIP————————————————————————————————————————————类型声明——————————————————————————————————————
declare global {
	type MyManifest_ReturnType<T> = (() => T);
	type MyManifest_ReturnType_requireVuexStore<T> = /*((vuexStore_instance: Store<any>) => T)*/(() => T);
}

// TIP—————————————————————————————————————————————模板配置接口————————————————————————————————
// 配置项：常规后台管理系统
interface CommonAdminSystem_Interface {
	// TODO 此处，本来使用的是 public static来确保全局共用一个指向。  后来，因为挂载到window上，采取了【类实例】的方式。

	// // TIP Axios网络配置的抽象结构——————
	// // Axios框架：http/https请求相关配置
	// axiosConfig: MyManifest_ReturnType<MyNetAxios_Config>;
	//
	// // TIP I18N国际化配置的抽象结构——————
	// // I18N国际化：自定义语言包
	// i18nConfig: MyManifest_ReturnType<My_i18n_Config>;//
	//
	// // TIP Router路由配置的抽象结构——————
	// // Router路由配置
	// routerConfig: MyManifest_ReturnType<My_Router_Config>;
	//
	// // TIP Store数据配置的抽象结构——————
	// // Store-Vuex的框架
	// vuexStoreConfig: MyManifest_ReturnType_requireVuexStore<MyVuexStore_Config<MyBase_StateTypes>>;//
}


// TIP—————————————————————————————————————————————配置清单基类——————————————————————————————————
declare global {
	namespace ServerApp {
		// 配置项：服务器后台
		interface ExpressServer_Cfg {
			// TIP————————————————————————————————————————服务器端口————————————————————————————————————
			readonly  port: {
				readonly http: number | string;
				readonly https: number | string;
			};
			// TIP————————————————————————————————————————HTTPS证书————————————————————————————————————
			readonly  cert: {
				readonly privateKey: string;
				readonly certificate: string;
			};

			// TIP————————————————————————————————————————页面模板&静态资源————————————————————————————————————
			readonly  view: {
				readonly viewsPath: string;
				readonly viewsEngine: 'jade';
				readonly staticPaths: string[];
			};

			// TIP————————————————————————————————————————路由表————————————————————————————————————
			readonly  route: {
				readonly map: Array<{ baseUrl: string, router: Router }>;
			};
			// TIP————————————————————————————————————————全局错误回调——————————————————————————————————
		}

		/*
		export abstract class Cfg implements ExpressServer_Cfg{
			//
			public abstract readonly _HTTP_PORT : number|string;
			public abstract readonly _HTTPS_PORT : number|string;
			//
			public abstract readonly privateKey : string;
			public abstract readonly certificate : string;
			//
			public abstract readonly viewsPath : string;
			public abstract readonly viewsEngine : 'jade';
			public abstract readonly staticPaths : string[];
			//
			public abstract readonly routesMap : Array<{baseUrl : string, router : Router}>;
			//
		}
		*/

		/*
		declare global {
			interface Window {
				$$MyManifest: MyManifest;
			}
		}
		*/
	}
}
