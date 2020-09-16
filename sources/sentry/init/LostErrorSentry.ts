interface LostError_Entry {
	type: 'window-onerror' | 'document-onerror'
		| 'window-add-event-error' | 'window-add-event-unhandledrejection';
	url: string;
	line: number;
	col: number;
	stackMsg?: string;
	evtRawStr: string;
	extra?: string;
}

/**
 * 使用该工具捕捉，任何阶段的浏览器错误。
 *        1.JS错误、DOM错误.
 *        2.弥补【Sentry】常规加载时，【体积较大】、【加载阻塞】，的缺陷。
 */
class LostError_Util {
	private _errArr: Array<LostError_Entry> = [];

	public logLostError() {
		try {
			console.log('LostError_Util', '注册监听成功');
			this.log_windowOnError();
			this.log_documentOnError();
			this.log_windowAddEvent_error();
			this.log_windowAddEvent_unhandledrejection();
			// this.log_consoleError(); // WARN 暂时隐藏【console.error】的捕捉。
		} catch (e) {                                                                           // 捕捉，初始化过程中，可能的报错。
			this._errArr.push(e as any);
		}
	}

	public test() {
		// @ts-ignore
		// asdasd();

		//
		Promise.reject(1);

		//
		const imgNode = document.createElement('img');
		imgNode.src   = '123.jpg';
		document.body.appendChild(imgNode);

		//
		const sNode = document.createElement('script');
		sNode.src   = '123.jpg';
		document.body.appendChild(sNode);
	}

	public uploadError() {
		console.log('上传错误');
		this._errArr.forEach((err) => {
			console.log('错误情况', JSON.stringify(err));
			window.Sentry.captureException(new Error(
				JSON.stringify(err),
			));
		});
		this._errArr = [];      // 清空数组
	}

	//
	//
	//
	//
	//

	// noinspection JSMethodCanBeStatic
	private _handleDocumentOnErrorEvent(
		_evt: ErrorEvent,
		type: LostError_Entry['type'],
	): LostError_Entry {
		const entry: LostError_Entry = {
			type,
			url      : _evt.filename,
			line     : _evt.lineno,
			col      : _evt.colno,
			evtRawStr: JSON.stringify(_evt),
		};
		return entry;
	}

	// noinspection JSMethodCanBeStatic
	private _handleWindowAddEvent(
		_evt: ErrorEvent,
		type: LostError_Entry['type'],
	): LostError_Entry {
		const entry: LostError_Entry = {
			type,
			url      : _evt.filename,
			line     : _evt.lineno,
			col      : _evt.colno,
			stackMsg : JSON.stringify({
				error  : {
					message: _evt.error?.message,
					stack  : _evt.error?.stack,
				},
				message: _evt.message,
			}),
			evtRawStr: JSON.stringify(_evt),
		};

		const target    = _evt?.target as HTMLElement;
		const lNodeName = target?.nodeName?.toLowerCase();
		if (lNodeName == 'img' || lNodeName == 'script') {
			const srcUrl = (target as HTMLImageElement).src;
			entry.extra  = `${lNodeName}  ${target?.className} ${srcUrl} ${_evt.type} ${target?.outerHTML}`;
		}

		return entry;
	}

	private log_windowOnError() {
		const that                            = this;
		// 全局错误捕捉
		const errHandler: OnErrorEventHandler = function(
			event,
			source,
			lineno,
			colno,
			error,
		) {
			// 异步方式，避免阻塞
			setTimeout(() => {

				// 不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
				const __col: number = colno || (window.event && (window.event as any).errorCharacter) || 0;

				const entry: LostError_Entry = {
					type     : 'window-onerror',
					url      : source || '未知',
					line     : lineno || -0.0001234,
					col      : __col,
					stackMsg : undefined,
					evtRawStr: JSON.stringify(event),
				};

				// 添加【报错堆栈信息】
				if (error && error.stack) {
					// 如果浏览器有堆栈信息，直接使用
					entry.stackMsg = error.stack.toString();
					// @ts-ignore
				} else if (arguments.callee) {
					// 尝试通过callee拿堆栈信息
					const ext = [];
					// @ts-ignore
					let fn    = arguments.callee.caller;
					let floor = 3;  // 这里只拿三层堆栈信息
					while (fn && (--floor > 0)) {
						ext.push(fn.toString());
						if (fn === fn.caller) {
							break;// 如果有环
						}
						fn = fn.caller;
					}
					// noinspection UnnecessaryLocalVariableJS
					const _ext_str = ext.join(',');
					entry.stackMsg = _ext_str;
				}

				that._errArr.push(entry);

			}, 0);

			return false;   // true 错误不会输出到console  ；  false 错误输出到console

		};

		window.onerror = errHandler;
	}

	/**
	 * FIXME 这段，只是在网上道听途说！！！
	 */
	private log_documentOnError() {
		const that       = this;
		document.onerror = function(
			event,                          // 似乎比较特殊，隶属于【element.onerror】，只有这一个参数
		) {
			// 异步方式，避免阻塞
			setTimeout(() => {
				console.error('检查此处！！！！！！');
				console.error('检查此处！！！！！！');
				console.error('检查此处！！！！！！');
				console.error('检查此处！！！！！！');
				console.error('检查此处！！！！！！');
				console.error('检查此处！！！！！！');

				const _evt  = event as ErrorEvent;     // FIXME 此处，【不见得就一定是 ErrorEvent 】！！！
				const entry = that._handleDocumentOnErrorEvent(_evt, 'document-onerror');
				that._errArr.push(entry);
			}, 0);
		};
	}

	private log_windowAddEvent_error() {
		const that = this;
		window.addEventListener('error', function(
			evt,
		) {
			// 异步方式，避免阻塞
			setTimeout(() => {
				console.log('错误', evt);
				const entry = that._handleWindowAddEvent(evt, 'window-add-event-error');
				that._errArr.push(entry);
			}, 0);
		}, true);
	}

	private log_windowAddEvent_unhandledrejection() {
		const that = this;
		window.addEventListener('unhandledrejection', function(
			evt,
		) {
			// 异步方式，避免阻塞
			setTimeout(() => {
				console.log('错误', evt);

				const entry: LostError_Entry = {
					type     : 'window-add-event-unhandledrejection',
					url      : '未知',
					line     : -0.0141632,
					col      : -0.0141632,
					stackMsg : `栈信息: ${evt.reason}`,
					evtRawStr: JSON.stringify(evt),
				};
				that._errArr.push(entry);
			}, 0);
		});
	}

	private log_consoleError() {
		/**
		 * 部分情况下，需要捕捉 console.error 相关的信息。
		 */

		console.error = (function(origin) {
			return function(errorlog: Array<any>) {
				function handler() {
				}   //
				handler();// 基于业务的日志记录及数据报错
				origin.call(console, errorlog);
			};
		})(console.error);

	}


}

export function xX_init_LostErrorSentry(cfg: Sentry_Cfg_Type) {

	const lostErrorUtil = new LostError_Util();
	lostErrorUtil.logLostError();
	(window as any).$abc_errorLog = lostErrorUtil;


	/**
	 * 思路：
	 *        1.过10秒后，检测，是否已经初始化
	 *        2.未初始化：
	 *                1.说明出错，发送错误
	 *        3.已初始化：
	 *                1.说明正常，那么，是否需要【清除监听】？
	 *                        1.可以清除。但是没有太多必要
	 */
	let isDisasterOccurred = false;
	const intervalId       = setInterval(() => {
		if (!isDisasterOccurred && window.Sentry) {
			// 正常，则清除定时器
			clearInterval(intervalId);
			lostErrorUtil.uploadError();
		} else {
			isDisasterOccurred = true;    // 灾害已经发生。

			if (!window.Sentry) {
				const scriptNode       = document.createElement('script');
				scriptNode.crossOrigin = cfg.crossOrigin;
				scriptNode.onload      = function(e: Event) {
					console.log('备灾脚本', '远程脚本', '加载成功');
					window.Sentry.init({
						dsn        : cfg.dns,
						environment: cfg.envName,
					});
					lostErrorUtil.uploadError();
				};
				scriptNode.src         = cfg.pureJsUrl;
				const firstS           = document.getElementsByTagName('script')[0];
				firstS?.parentNode?.insertBefore(scriptNode, firstS);   // 将自己，放在最前面。（？？？有必要吗？会导致卡顿吗？）
			} else {
				lostErrorUtil.uploadError();
			}

		}
	}, 10000);

// lostErrorUtil.test();  // TIP 用于【测试用例】。

}
