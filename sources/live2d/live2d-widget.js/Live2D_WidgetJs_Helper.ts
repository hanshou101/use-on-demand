// import {L2Dwidget}       from 'live2d-widget/lib/L2Dwidget.min.js';    // 这种方式，不能用import；只能用【window】方式。
// import {xX_DomScript_Helper} from '../../dom/dom-script';

import { xX_DomScript_Helper } from '../../dom/dom-script';

enum CssE {
	demo = 'demo',
}

enum CdnModeE {
	SelfPublic = 'SelfPublic',
	UnPkg      = 'UnPkg',
}

enum L2Dwidget_LoadWayE {
	DynamicLoad,
	Import,
	SrcModuleImport,
	Require,
}

interface Live2D_CfgOption {
	//
	customPathCfg?: (typeof xX_Live2D_WidgetJs_Helper)['customPathCfg'];	// 【有默认值】
	fallbackModel?: xX_Live2DModelE;				// 【有默认值】保底目标模型
	forceUseModel?: xX_Live2DModelE;					// 强行指定，目标模型
	savePref?: boolean;				// 保存【偏好】
	prefKey?: string;					// 【偏好】的LocalStorage键名
	forceLoad?: boolean;			// 强制从【本地】读取【偏好】
}

interface Live2D_Pref {
	modelE?: xX_Live2DModelE;
}

export enum xX_Live2DModelE {
	'default_demo' = '不需要传值，留一个undefined即可',      // 默认
	'chitose'      = 'chitose',                         // 西装高个的男生
	/**
	 * 原数据为；["epsilon2.1", "epsilon2_1"]。
	 *        1.目录名和文件名，不一样。
	 */
		'epsilon2_1' = 'epsilon2_1',                      // 黄色吊带裙，水红发色，小女孩
	/**
	 * 原数据为：["gantzert_felixander", "gf"]。
	 *        1.目录名和文件名，不一样。
	 */
		'gf'         = 'gf',                              // 绿色披风，带老鹰，剑士
	//
	//
	//
	'haru01'       = 'haru01',                          // 女仆装小女孩
	'haru02'       = 'haru02',                          // 学生装小女孩
	'haruto'       = 'haruto',                          // Q萌水手套装，小女孩（短发）
	'hibiki'       = 'hibiki',                          // 舰C任务，hibiki响，栗色头发，学生服
	'hijiki'       = 'hijiki',                          // 可爱，黑色猫咪
	'izumi'        = 'izumi',                           // 家居服，类似真实女友
	'koharu'       = 'koharu',                          // Q萌水手套装，小女孩（长发）
	'miku'         = 'miku',                            // 初音未来
	'nico'         = 'nico',                            // 绿色猫耳，狐尾，Q萌女孩
	'ni-j'         = 'ni-j',                            // 战术目镜，蓝色，Q萌女孩
	'nipsilon'     = 'nipsilon',                        // 粉红色，双马尾，Q萌女孩
	'nito'         = 'nito',                            // 大丸子头，粉红色短发，魔偶，Q萌女孩
	'shizuku'      = 'shizuku',                         // 【默认】形象，上课的可爱女生
	'tororo'       = 'tororo',                          // 可爱，白色猫咪
	// FIXME 【tsumiki】的远程资源包 【/assets/exp】 ，因为大小写的缘故，全都挂了。
	// FIXME 【tsumiki】的远程资源包 【/assets/exp】 ，因为大小写的缘故，全都挂了。
	// FIXME 【tsumiki】的远程资源包 【/assets/exp】 ，因为大小写的缘故，全都挂了。
	'tsumiki'      = 'tsumiki',                         // 绿色头发，短裙，酒红长袜，学生装女孩
	'Unitychan'    = 'Unitychan',                       // 黄色大马尾，Q萌女孩
	'wanko'        = 'wanko',                           // 坐在木碗里的，小白狗
	'z16'          = 'z16',                             // 类似白色护士军装，披肩发，女孩
}


export class xX_Live2D_WidgetJs_Helper {
	/**
	 * 根据【live2d-widget.js】库的不同版本，选择不同的加载方式。
	 */
	public static readonly libLoadWay: L2Dwidget_LoadWayE = L2Dwidget_LoadWayE.SrcModuleImport;
	public static readonly cdnMode: CdnModeE              = CdnModeE.UnPkg;
	public static readonly rootDom                        = '#live2d-widget';
	public static readonly defaultPrefKey                 = 'xX_Live2D_WidgetJs_Helper';

	/**
	 * Model存储空间 的【远程路径】。
	 */
	public static readonly customPathCfg = {
		modelBase: 'http://test-admin.bgex.link/',
	};

	/**
	 * 移除Demo
	 */
	public static removeDemo() {
		console.log('尝试，对Live2D的Demo，进行移除。');
		console.error('Live2D-widget.js，目前销毁功能并不完善，请谨慎使用！    建议使用【刷新】来重建。');
		const demoDom = document.querySelector(this.rootDom);
		demoDom?.remove();
	}

	/**
	 * 初始化Live2D的Demo
	 */
	public static initDemo(
		option?: Live2D_CfgOption,
	) {
		return new Promise(((resolve /* reject */) => {


			// 处理默认值
			let modelE        = option?.fallbackModel || xX_Live2DModelE.default_demo;
			let customPathCfg = option?.customPathCfg || this.customPathCfg;
			const prefKey     = option?.prefKey || this.defaultPrefKey;
			//
			if (option?.forceUseModel) {									// TIP 【1】强行指定，优先级最高
				modelE = option?.forceUseModel;
			} else if (option?.forceLoad) {								// TIP 【2】如果，从【本地】读取
				const prefObj = this.getPref_InLocal(prefKey);
				if (prefObj.modelE) {
					modelE = prefObj.modelE;		// 有则取，没有则回退。
				}
				console.log('从本地读取', prefObj);
			}


			PrivateHelper.getL2Dwidget().then((_exports) => {
				console.log('最新调用', _exports);
				const { L2Dwidget } = _exports;
				this.loadDemoCss(CssE.demo);      // 尝试加载CSS

				L2Dwidget
					.on('*', (name) => {
						console.log(
							'%c EVENT ' + '%c -> ' + name,      // 事件
							'background: #222; color: yellow', 'background: #fff; color: #000',   // 修饰的CSS
						);
					})
					.init({
						dialog : {
							// 开启对话框
							enable: true,
							script: {
								// 每空闲 10 秒钟，显示一条一言
								'every idle 10s': '$hitokoto$',
								// 当触摸到星星图案
								'hover .star'   : '星星在天上而你在我心里 (*/ω＼*)',
								// 当触摸到角色身体
								'tap body'      : '哎呀！别碰我！',
								// 当触摸到角色头部
								'tap face'      : '人家已经不是小孩子了！',
							},
						},
						model  : {
							jsonPath: modelE === xX_Live2DModelE.default_demo ? undefined : PrivateHelper.getModelUrl(modelE, customPathCfg),
						},
						display: {
							position: 'left',
						},
					});

				if (option?.savePref) {		// TIP 如果，保存【偏好】
					const prefObj: Live2D_Pref = {
						...this.getPref_InLocal(prefKey),
						modelE: modelE,
					};
					localStorage.setItem(prefKey, JSON.stringify(prefObj));
					console.log('存储到本地', prefObj);
				}

				resolve('初始化完毕');

			});

		}));

	}

	/**
	 * 绑定快捷键
	 * 				1.Ctrl + Alt + Shift + 【你自己的快捷键】。
	 * 				2.
	 *
	 */
	public static bindHotKey(
		hotKey: KeyCode_MAP_Type__Values,		// 快捷键
		callback: () => void,								// 回调
	) {
		document.onkeydown = function(_evt) {
			PrivateHelper.get_DomEvents().then(({ xX_BrowserEventMap }) => {
				const { KEYBOARD } = xX_BrowserEventMap;
				const keyCode      = KEYBOARD.getKeyCode(_evt);
				if (_evt.shiftKey
					&& _evt.altKey
					&& _evt.ctrlKey) {
					switch (keyCode) {
						case hotKey: {
							console.log('按下了live2D的快捷键');
							callback();														// 执行回调。
							break;
						}
						default: {
							console.log('其它快捷键');
						}
					}
				}
			});
		};
	}

	// ———————————————————————————————————————————————————————————————————————————
	// ———————————————————————————————————————————————————————————————————————————
	// ———————————————————————————————————————————————————————————————————————————
	// ———————————————————————————————————————————————————————————————————————————
	// ———————————————————————————————————————————————————————————————————————————

	/**
	 * CSS，加载状态表
	 */
	private static cssLoadStatus = {
		[CssE.demo]: false,
	};

	/**
	 * 加载CSS
	 */
	private static loadDemoCss(cssE: CssE) {
		if (!this.cssLoadStatus[cssE]) {      // 未加载过该CSS
			this.cssLoadStatus[cssE] = true;                // TIP 记录，该CSS已经加载
			switch (cssE) {
				case CssE.demo:
					require('./css/default-demo.less');
					break;
			}
		} else {                              // 已加载过该CSS
			console.log('该CSS已经加载过', cssE);
		}
	}

	/**
	 * 获取本地Pref存储
	 */
	private static getPref_InLocal(prefKey: string) {
		return JSON.parse<Live2D_Pref>(localStorage.getItem(prefKey) || '{}');
	}

}

//

class PrivateHelper {

	public static getModelUrl(
		modelE: xX_Live2DModelE,
		customPathCfg: typeof xX_Live2D_WidgetJs_Helper['customPathCfg'],
	) {

		switch (xX_Live2D_WidgetJs_Helper.cdnMode) {
			//
			//
			//
			case CdnModeE.SelfPublic: {                     // 从自身public目录获取
				const dirName = modelE.valueOf().toLowerCase();

				const fileName = (function() {
					switch (modelE) {
						case xX_Live2DModelE.epsilon2_1:
							return 'epsilon2.1';
						case xX_Live2DModelE.gf:
							return 'gantzert_felixander';
						default:
							return modelE.valueOf().toLowerCase();               // WARN 转化为小写字母。
					}
				})();

				// TIP 加上远程路径。
				return customPathCfg.modelBase + `live2d/model/live2d-widget-model-${dirName}/assets/${fileName}.model.json`;
			}
			//
			//
			//
			case CdnModeE.UnPkg: {                          // 从远程 Unpkg.com 网站，进行获取
				const dirName = (function() {
					switch (modelE) {
						case xX_Live2DModelE.haru01:
							return 'haru';              // 需要拼接中间目录。
						case xX_Live2DModelE.haru02:
							return 'haru';              // 需要拼接中间目录。
						default:
							return modelE.valueOf().toLowerCase();               // WARN 转化为小写字母。
					}
				})();

				const middleDir = (function() {
					switch (modelE) {
						case xX_Live2DModelE.haru01:
							return '01/';              // 需要拼接中间目录。
						case xX_Live2DModelE.haru02:
							return '02/';              // 需要拼接中间目录。
						default:
							return '';                        // 默认没有中间目录
					}
				})();

				const fileName = (function() {
					switch (modelE) {
						case xX_Live2DModelE.epsilon2_1:
							return 'Epsilon2.1';                  // 首字母大写！
						case xX_Live2DModelE.gf:
							return 'Gantzert_Felixander';
						default:
							return modelE.valueOf().toLowerCase();               // WARN 转化为小写字母。
					}
				})();

				return `https://unpkg.com/live2d-widget-model-${dirName}@latest/${middleDir}assets/${fileName}.model.json`;
			}
		}

	}

	public static getL2Dwidget() {
		switch (xX_Live2D_WidgetJs_Helper.libLoadWay) {
			case L2Dwidget_LoadWayE.DynamicLoad: {                                                // TIP 动态脚本加载
				console.log('此处注意，【public】目录，最终是落在了哪一个项目上');
				return xX_DomScript_Helper.loadJsScript_Async(
					'/L2Dwidget/3.1.5/L2Dwidget.min.js',
				).then(() => {
					return {
						L2Dwidget: (window as any).L2Dwidget as L2Dwidget_SimpleNS.L2Dwidget_Type,
					};
				});
			}
			case L2Dwidget_LoadWayE.Import: {                                                     // TIP Import方式
				return import('live2d-widget');
			}
			/**
			 * TIP 此处，官方的【发行版本】并没有给出最新的【common.js】。
			 *        1.我们可以【下载代码】，然后【手动打包】出来。
			 *        2.
			 */
			case L2Dwidget_LoadWayE.SrcModuleImport: {
				// 								上面方法，好像个别环境，会有【exports is not defined】的问题。
				return Promise.resolve(require('./3.1.5/L2Dwidget.common.js') as {
					L2Dwidget: L2Dwidget_SimpleNS.L2Dwidget_Type,
				});
				// @ts-ignore
				// return import('./3.1.5/L2Dwidget.common.js').then(exports => {
				// 	return {
				// 		L2Dwidget: exports as L2Dwidget_SimpleNS.L2Dwidget_Type,
				// 	};
				// });
			}
			case L2Dwidget_LoadWayE.Require: {
				return Promise.resolve({
					L2Dwidget: require('live2d-widget/lib/L2Dwidget.min.js') as L2Dwidget_SimpleNS.L2Dwidget_Type,
				});
			}
		}
	}

	public static get_DomEvents() {
		return import('../../dom/dom-events');
	}

}


