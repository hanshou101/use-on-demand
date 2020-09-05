export const isClient = !process?.server;   // WARN 此处，兼容【nuxt.js】和【非nuxt.js】环境。

export enum LogE {
	bgTokenAbout          = 'bgTokenAbout',
	KlinePerformance      = 'KlinePerformance',
	KlineCycleLife        = 'KlineCycleLife',
	tradingViewDraw       = 'tradingViewDraw',
	indexPage             = 'indexPage',
	baseConfig            = 'baseConfig',
	axiosBase             = 'axiosBase',
	storeBase             = 'storeBase',
	axiosWatcher          = 'axiosWatcher',
	qrcodeCp              = 'qrcodeCp',
	cookieUtil            = 'cookieUtil',
	pluginBxUi            = 'pluginBxUi',
	wasm                  = 'wasm',
	BgNavHeader           = 'BgNavHeader',
	createContractAccount = 'createContractAccount',
	positLine             = 'positLine',
	positCp               = 'positCp',
	leverageInfo          = 'leverageInfo',
	chatroom              = 'chatroom',
	directive             = 'directive',
	directiveDrag         = 'directiveDrag',
	contractArea          = 'contractArea',
	transferWindow        = 'transferWindow',
	loadScript            = 'loadScript',
	sentry                = 'sentry',

	decorator             = 'decorator',
	versionCheck          = 'versionCheck',
}

/**
 * console日志工具
 */
export class DebugU {
	public static separator = '//';

	private static readonly allowKeys: Array<LogE> = [
		// LogE.positLine,
		LogE.tradingViewDraw,
		LogE.chatroom,
		LogE.transferWindow,
		LogE.loadScript,
		// LogE.axiosBase,
		LogE.sentry,
		// LogE.KlineCycleLife,
		//
		// LogE.decorator,
		// LogE.versionCheck,
	];

	public static l(logEnum: LogE, ...args: Array<any>) {
		if (this.allowKeys.includes(logEnum)) {
			// console.log(`%c${logEnum} // ${args}%c 123`, 'background: #f33; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff', 'background: #3f3; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff');
			console.log(logEnum, this.separator, ...args);
		}
	} //
	public static e(logEnum: LogE, ...args: Array<any>) {
		if (this.allowKeys.includes(logEnum)) {
			console.error(logEnum, this.separator, ...args);
		}
	}//

	public static pic(logEnum: LogE, imgUrl: string = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png') {
		console.log('%c ', `
        padding           :50px 300px;
        line-height       :100px;
        background-size   :contain;
        background-repeat :no-repeat;
        background-image:url(${imgUrl})
    `);
	}

	public realLog(
		message?: any,
		...optionalParams: Array<any>   // WHY 此处，【optionalParams】始终为一个长度为1的数组？  这里面唯一的子数组，才是真正盛放参数的数组？
	) {
		console.log(`【特别注意】JSON格式不会包括函数、正则、Date对象。`);
		const trueRestParams = optionalParams[0];
		if (trueRestParams.length === 0) {
			console.log(
				JSON.parse(JSON.stringify(message)),
			);
		} else {
			console.log(
				JSON.parse(JSON.stringify(message)),
				JSON.parse<any>(JSON.stringify(optionalParams))[0][0],
			);
		}
	}

}
