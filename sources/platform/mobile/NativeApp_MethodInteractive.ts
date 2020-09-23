function is_MatchArray_equal(
	matchArr: RegExpMatchArray | null,
	targetStr: string,
) {
	//@ts-ignore
	// FIXME 此处，感觉是一个经典错误
	return matchArr == targetStr
		|| matchArr?.find(str => {
			return targetStr.toLocaleLowerCase() === str/*.trim()*/.toLocaleLowerCase(); // 查看，是否和数组元素相等
		});
}

class BrowserChecker {
	public static getBrowserInfo() {

		// 取得浏览器的userAgent字符串
		const userAgent = navigator.userAgent;
		// 判断是否【Opera】浏览器
		const isOpera   = userAgent.indexOf('Opera') > -1;
		// 判断是否【IE】浏览器
		const isIE      = ((userAgent.indexOf('compatible') > -1) && userAgent.indexOf('MSIE') > -1 && !isOpera) || userAgent.indexOf('Trident') > -1;
		// 判断是否IE的【Edge】浏览器
		const isEdge    = userAgent.indexOf('AppleWebKit') > -1 && userAgent.indexOf('Edge') > -1 && !isIE;
		// 判断是否【Firefox】浏览器
		const isFireFox = userAgent.indexOf('Firefox') > -1;
		// 判断是否【Safari】浏览器
		const isSafari  = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1;
		// 判断【Chrome】浏览器
		const isChrome  = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1;

		// 判断【QQ】浏览器
		const qqMatch = userAgent.match(/\sQQ/i);
		// FIXME 此处，感觉是一个经典错误
		// qq     : userAgent.match(/\sQQ/i) == ' qq', //是否QQ
		const isQQ = is_MatchArray_equal(qqMatch, ' qq');
		const obj  = {
			// 浏览器检查
			isChrome,
			isFireFox,
			isSafari,
			isOpera,
			isEdge,
			isIE,
			// 设备平台检查
			is_mobile : !!userAgent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			is_iOS    : !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			is_Android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, //android终端
			is_iPhone : userAgent.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			is_iPad   : userAgent.indexOf('iPad') > -1, //是否iPad
			is_webApp : userAgent.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			is_weixin : userAgent.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			is_qq     : isQQ,

			ieVersion: undefined as (number | string | undefined),
		};

		if (isIE) {
			const reIE = new RegExp('MSIE (\\d+\\.\\d+);');		// 重新检测一次IE。
			reIE.test(userAgent);
			const fIEVersion = parseFloat(RegExp['$1']);
			obj.ieVersion    = fIEVersion;
			// 如果是【IE 11】的话，那么再检测一次版本。
			if (userAgent.indexOf('Trident') > -1 && /rv:(\w+)/.test(userAgent)) {
				obj.ieVersion = RegExp.$1;
			}
		}
		return obj;
	}
}

/**
 * 判断页面是否是在webview中打开
 * 				1.一般来说，【WebView】和【浏览器】之间的差异，在于以下几点：
 * 		    				1.【WebView】，一般业务逻辑，不走【手动登录】。
 * 		    								1.因而，存在，在不知情情况下，【更换账号】的情况。
 * 		    							  2.所有的【账号凭证】，都应该依赖于【原生App】传过来的【内存数据】。
 * 		    							  3.因此，不该做这方面【和身份信息相关】的持久化。
 * 		    				2.
 * 		    				3.
 */
function isOpenInWebview() {
	const ua = navigator.userAgent.toLowerCase();
	if (is_MatchArray_equal(ua.match(/MicroMessenger/i), 'micromessenger')) { 		// 微信内置WebView判断
		return false;
	} else if (is_MatchArray_equal(ua.match(/QQ/i), 'qq')) { 										// QQ内置WebView判断
		return false;
	} else if (is_MatchArray_equal(ua.match(/WeiBo/i), 'weibo')) {								// 微博内置WebView判断
		return false;
	} else {
		if (ua.match(/Android/i) != null) {
			return ua.match(/browser/i) == null;
		} else if (ua.match(/iPhone/i) != null) {
			return ua.match(/safari/i) == null;
		} else {
			return ua.match(/macintosh/i) == null
				&& ua.match(/windows/i) == null;
		}
	}
}


export class xX_NativeApp_MethodInteractive {
	private static readonly _paramSeparator = ',';

	public static invokeNativeMethod(
		methodName: string, 		// 方法名
		...params: Array<any>		// 一组参数
	): Promise<any> {
		const browserInfo = BrowserChecker.getBrowserInfo();
		const that        = this;

		if (browserInfo.is_iOS) {			// TIP IOS平台

			// 如果存在【webkit】的调用器。（已经加载完成）
			if (window.webkit) {
				return this.invoke_iosFn(methodName, ...params);
			} else {
				return new Promise(function(resolve, reject) {
					let count = 0;
					let timer = setInterval(() => {
						count++;
						if (!window.webkit && count >= 60) {		// 如果失败了太多次数后，仍未加载。
							clearInterval(timer);
							reject('尝试了很多次后，webkit仍未加载成功');															// 返回报错。
						}
						if (window.webkit) {										// 如果已经加载完成
							clearInterval(timer);
							// 返回成功。
							resolve(that.invoke_iosFn(methodName, ...params));
						} else {
							console.error('window.webkit还没初始化');
						}
					}, 100);
				}).catch((err) => {
					console.error(err);
				});
			}
		} else {											// TIP Android平台
			console.error('调安卓方法了');
			return new Promise(function(resolve) {
				if (!window.android) {
					throw new Error('window.android不存在！！！');
				}
				let res;
				if (params && params.length > 0) {				// 有参数
					res = window.android[methodName](...params);
				} else {																	// 无参数
					res = window.android[methodName]();
				}
				// 将返回的【字符串形式】，转化为真正的数据。
				let data = (new Function('return ' + res))();
				resolve(data);				// 成功返回
			}).catch((err) => {
				console.error(err);
			});
		}
	}

	private static invoke_iosFn(
		methodName: string,		// 方法名
		...params: Array<any>	// 一组参数
	): Promise<any> {

		/**
		 * 1.此处，用于异步接受【iOS】传回的处理结果。
		 * 				1.iOS很多时候，无法做到【同步调用返回】。
		 * 				2.所以，我们先向【iOS】的【APP原生A方法】，发送执行请求。
		 * 				3.然后，我们在【等待结果返回】之前，在【window】上挂载一个【同名Web端A方法】。
		 * 				4.当【iOS】端，处理完毕后，将调用【Web端A方法】，来实现向【Web端】传送数据。
		 *
		 * 2.综上所述
		 * 				1.web端调用【APP原生A方法】————————APP接收，处理完毕，调用【Web端A方法】，来返回数据。
		 */
		let asyncResult_promise = new Promise(function(resolve) {
			// 此处名字不重要，但要保证和【APP原生A方法】同名。形成一种规范。
			(window as any)[methodName] = function(res: any) {
				resolve(res);
			};
		});

		let obj = {
			name  : methodName,
			params: params && params.length > 0 ? (params.join(this._paramSeparator)) : '',
		};
		try {
			// 异步执行任务
			let timer = setTimeout(() => {
				// 清除定时器，释放资源。
				clearTimeout(timer);
				if (!window.webkit) {
					throw new Error('window.webkit不存在！！！');
				}
				/**
				 * 向【iOS端】，指定的方法，发送消息。
				 * 				1.方法名
				 * 				2.参数拼接成的字符串
				 */
				window.webkit.messageHandlers[methodName].postMessage(JSON.stringify(obj));
			}, 0);
		} catch (e) {
			console.error(methodName, e);		// 失败的情况，一般是【方法尚未挂载】。
		}
		return asyncResult_promise;		// WARN 此处，不再直接返回给【invokeNativeMethod】方法。而是包了一层。
	}

}
