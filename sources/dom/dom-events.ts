//

import { xX_SArray_Helper } from '../symbol-array/SArray_Helper';

interface My_DragItems_CB {
	plainString_CB?: (str: string) => void;           // 普通文本
	htmlMultiString_CB?: (str: string) => void;       // Html富标签富文本
	uriOrLink_pathString_CB?: (str: string) => void;  // uri资源指向路径，或者path路径，所代表的文本
	file_CB?: (file: File | null) => void;                   // 一个文件类型
}

/**
 * TODO 这里  GlobalEventHandlers ，似乎不如直接声明具体类型好用…………
 */
type MyEventTarget = (/*GlobalEventHandlers |*/ HTMLElement | Window) & {
	_events?: {
		[key: string]: any,
	},
};


declare global {
	type KeyCode_MAP_Type = typeof xX_BrowserEventMap.KEYBOARD.KeyCode_MAP;
	type KeyCode_MAP_Type__Keys = keyof KeyCode_MAP_Type;
	type KeyCode_MAP_Type__Values = KeyCode_MAP_Type[KeyCode_MAP_Type__Keys];
}

export class xX_DomEvt_Helper {

	/**
	 * 绑定事件
	 * @param ele dom元素
	 * @param eventName 事件名称
	 * @param fn 事件回调函数
	 */
	public bindEvt(ele: MyEventTarget, eventName: string | unknown, fn: (e: Event) => any) {
		if (!ele) {
			console.error('on(ele, eventName, fn)函数第一个参数必须是一个dom元素!');
			return;
		}
		if (!eventName || typeof eventName !== 'string') {
			console.error('on(ele, eventName, fn)函数第二个参数必须是一个字符串!');
			return;
		}
		if (!fn || typeof fn !== 'function') {
			console.error('on(ele, eventName, fn)函数第三个参数必须是一个函数!');
			return;
		}
		if (!ele._events) {
			ele._events = {};
		}
		if (!(eventName in ele._events)) {
			ele._events[eventName] = [fn];
			// 非IE浏览器，采用这个方式绑定
			// @ts-ignore
			if (document.addEventListener) {
				ele.addEventListener(eventName, function(e) {
					if (ele._events) {
						const events = ele._events[eventName];
						if (events && events.length > 0) {
							let i     = 0;
							const len = events.length;
							for (; i < len; i++) {
								if (events[i]) {
									events[i].call(ele, e);
								}
							}
						}
					}

				}, false);

				// IE浏览器，采用这个方式绑定
			} else if (window.attachEvent && ele.attachEvent) {
				ele.attachEvent('on' + eventName, function() {
					if (ele._events) {
						const events = ele._events[eventName];
						const e      = window.event;
						if (e) {
							e.preventDefault  = function() {
								e.returnValue = false;
							};
							e.stopPropagation = function() {
								e.cancelBubble = true;
							};
						}
						let i     = 0;
						const len = events.length;
						for (; i < len; i++) {
							events[i].call(ele, e);
						}
					}

				});
			}
		} else {
			const index = xX_SArray_Helper.getIndex_fromRule(ele._events[eventName], function(item) {
				return item === fn;
			});
			if (index < 0 || typeof index === 'undefined') {
				ele._events[eventName].push(fn);
			}
		}
		return;
	}


	/**
	 * 解绑事件
	 * @param ele dom元素
	 * @param eventName 事件名称
	 * @param fn 事件回调函数
	 */
	public unbindEvt(ele: MyEventTarget, eventName: string | unknown, fn: (e: Event) => any) {
		let index;
		if (!ele) {
			console.error('off(ele, eventName, fn)函数第一个参数必须是一个dom元素!');
			return;
		}
		if (!eventName || typeof eventName !== 'string') {
			console.error('off(ele, eventName, fn)函数第二个参数必须是一个字符串!');
			return;
		}
		if (!ele._events) {
			return;
		}
		if (!eventName) {
			return;
		}
		let events = ele._events[eventName];
		// 如果只传递了事件名称而未传递具体的事件，则将指定事件名称的所有回调函数全部清除
		if (eventName && !fn) {
			// @ts-ignore
			if (document.removeEventListener) {
				for (let i = 0, len = events.length; i < len; i++) {
					ele.removeEventListener(eventName, events[i], false);
				}
			} else if (window.detachEvent && ele.detachEvent) {
				for (let i = 0, len = events.length; i < len; i++) {
					ele.detachEvent('on' + eventName, events[i]);
				}
			}
			delete ele._events[eventName];
		} else if (eventName && fn) {
			if (!events) {
				return;
			}
			// @ts-ignore
			if (document.removeEventListener) {
				if (events.length === 1) {
					ele.removeEventListener(eventName, fn, false);
					delete ele._events[eventName];
				} else {
					index = xX_SArray_Helper.getIndex_fromRule(events, function(item) {
						return item === fn;
					});
					if (index > -1) {
						events.splice(index, 1);
					}
				}
			} else if (window.detachEvent && ele.detachEvent) {
				if (!events) {
					return;
				}
				if (events.length === 1) {
					ele.detachEvent('on' + eventName, fn);
					delete ele._events[eventName];
				} else {
					index = xX_SArray_Helper.getIndex_fromRule(events, function(item) {
						return item === fn;
					});
					if (index > -1) {
						events.splice(index, 1);
					}
				}
			}
		}
		events = null;
		return;
	}

//
//
//

	/**
	 * 当【Dom拖动操作】时，处理被拖动条目————【TransferItems】。
	 */
	public onDragDom_handleDataTransferItems(
		items: DataTransferItemList,
		callbackBundle: My_DragItems_CB,
	) {
		for (let i = 0; i < items.length; i += 1) {
			const kind = items[i].kind;
			const type = items[i].type;
			// 逻辑开始
			if (kind == 'string') {
				if (type.indexOf('text/plain') != -1) {
					items[i].getAsString(function(str: string) {
						// str是纯文本，该怎么处理，就在这里处理
						if (callbackBundle.plainString_CB) {
							callbackBundle.plainString_CB(str);
						}
					});
				} else if (type.indexOf('text/html') != -1) {
					items[i].getAsString(function(str: string) {
						// str是富文本，就在这里处理
						if (callbackBundle.htmlMultiString_CB) {
							callbackBundle.htmlMultiString_CB(str);
						}
					});
				} else if (type.indexOf('text/uri-list') != -1) {
					items[i].getAsString(function(str: string) {
						// str是uri地址，在这里进行处理
						if (callbackBundle.uriOrLink_pathString_CB) {
							callbackBundle.uriOrLink_pathString_CB(str);
						}
					});
				}
			} else if (kind == 'file') {
				// 如果是图片
				if (type.indexOf('image/') != -1) {
					const file = items[i].getAsFile();
					// file就是图片文件对象，可以上传，或者其他处理
					if (callbackBundle.file_CB) {
						callbackBundle.file_CB(file);
					}
				}
			}
		}
	}


}

//
//
//
//
//
//
//
//

export class xX_BrowserEventMap {
	public static MOUSE = {
		// 单次左键【完整点击】
		click   : 'click',
		// 连续两次左键【完整点击】：双击
		dblclick: 'dblclick',

		// 单次右键【完整点击】
		contextmenu: 'contextmenu',


		// 一次完整点击的各大组成部分：按下、移动、弹起。
		mousedown: 'mousedown',
		mousemove: 'mousemove',
		mouseup  : 'mouseup',

		// 鼠标悬浮
		mouseenter: 'mouseenter',       // 悬浮的刚刚移上去
		mouseover : 'mouseover',         // 悬浮的持续在上面
		mouseout  : 'mouseout',           // 悬浮的DOM上移出去

		BUTTON_TYPE: {
			LeftButton : 0,        // 左键枚举值为0
			RightButton: 2,       // 右键枚举值为2
		},
	};

	public static KEYBOARD = {
		// TODO 键盘事件，通通用  event.keyCode 去取就好。

		// 单次键盘【完整输入周期】：包括按下、长按和弹起。
		keypress: 'keypress',

		keydown: 'keydown',     // 键盘按键被按下的瞬间
		keyup  : 'keyup',         // 键盘按键被弹起的瞬间


		/**
		 * 参考资料：
		 *          键盘按钮keyCode大全，keyCode列表对照表 - 如果声音记得 - 博客园 - https://www.cnblogs.com/jf-guo/p/5235136.html
		 */
		KeyCode_MAP: {
			// 左边大键盘区，数字
			0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57,
			// 左边大键盘区，字母
			A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
			H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
			O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84,
			U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,

			// TODO 切记，以上的【数字、字母】输入键，可以通过  keypress、keydown 键监听。

			// TODO 以下的【非印刷键】，非常非常建议  通过 keydown，来进行监听！！！
			// 参考资料：JavaScript listener, "keypress" doesn't detect backspace? - Stack Overflow - https://stackoverflow.com/a/4843502/6264260

			// 上方，功能键
			F1        : 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117,
			F7        : 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123,
			// 特殊控制键
			BackSpace : 8, Tab: 9,
			Enter     : 13, Caps_Lock: 20,
			Control   : 17, Shift: 16, Alt: 18,
			Left_Arrow: 37, Up_Arrow: 38, Right_Arrow: 39, Down_Arrow: 40,
			Insert    : 45,
			Delete    : 46,
			Num_Lock  : 144,
		},

		/**
		 * 参考资料：
		 *          浅谈JavaScript中按键事件的e.keyCode || e.which || e.charCode - 筱葭的博客 - CSDN博客 - https://blog.csdn.net/zhouziyu2011/article/details/53978293
		 */
		getKeyCode(__e: Event) {
			const e = (__e || window.event) as KeyboardEvent;		// 此处，做出IE兼容。
			return e.keyCode || e.which || e.charCode;
		},
	} as const;

	public static ClipBoard = {
		copy : 'copy',       // Ctrl+C，复制
		paste: 'paste',     // Ctrl+V，粘贴

		cut: 'cut',         // Ctrl+X，剪切
	};

	public static DragDom = {

		fromSelf: {
			/**
			 * TODO 以下的事件，针对DOM自身被拖动。
			 */
			drag: 'drag',               // TODO 全程拖动DOM的事件（开始触发一次，结束触发一次，拖动中会不断触发。是一个连续不断的事件。）

			// 开始拖动、持续拖动、结束拖动
			dragstart: 'dragstart',     // DOM刚刚开始被拖动
			dragend  : 'dragend',         // DOM已被拖动完成
		},

		fromOthers: {
			/**
			 * TODO 以下的事件，针对DOM自身没被拖动。  而是其他元素，被拖到了DOM之上来。
			 */
			// 拖动中经过某一片区域
			dragenter: 'dragenter',     // 当进行拖动DOM时，进入有效的放置目标时
			dragleave: 'dragleave',     // 当进行拖动DOM时，离开有效的放置目标时
			dragover : 'dragover',       // 当进行拖动DOM时，（进入有效的放置目标之后）持续处于有效的放置目标上时

			/**
			 * 一些关于【drop】的坑
			 * 1.想要触发drop事件的话，必须
			 *            1.1 在dragover事件中使用event.preventDefault();阻止默认事件，才能触发drop事件
			 *            1.2 参考资料：HTML5拖放API Drag and Drop - Leechikit的专栏 - SegmentFault 思否 - https://segmentfault.com/a/1190000010127530
			 */
			drop: 'drop',               // TODO 特指拖动的放下操作
		},


		__dataTransfer__dropEffect_Enum: {   // TODO 专门用于【dataTransfer】的【dropEffect】，鼠标手势特效
			move: 'move',
			copy: 'copy',
			link: 'link',
			none: 'none',
		},

		__dataTransfer__effectAllowed_Enum: {
			none         : 'none',
			copy         : 'copy',
			copyLink     : 'copyLink',
			copyMove     : 'copyMove',
			link         : 'link',
			linkMove     : 'linkMove',
			move         : 'move',
			all          : 'all',
			uninitialized: 'uninitialized',
		},

	};

	public static Touch = {
		touchstart: 'touchstart',       // 手指点击开始
		touchmove : 'touchmove',         // 手指点击，并正在移动中
		touchend  : 'touchend',           // 手指点击结束（手指离开屏幕）

		// TouchCancel，比较少用。（一般是一些触摸事件之外的事件，打断。如触点超出区域；弹出一个模态框；）
		touchcancel: 'touchcancel',
	};

	public static Window = {
		abort                       : 'abort',
		afterprint                  : 'afterprint',
		beforeprint                 : 'beforeprint',
		beforeunload                : 'beforeunload',
		blur                        : 'blur',
		canplay                     : 'canplay',
		canplaythrough              : 'canplaythrough',
		change                      : 'change',
		click                       : 'click',
		compassneedscalibration     : 'compassneedscalibration',
		contextmenu                 : 'contextmenu',
		dblclick                    : 'dblclick',
		devicelight                 : 'devicelight',
		devicemotion                : 'devicemotion',
		deviceorientation           : 'deviceorientation',
		drag                        : 'drag',
		dragend                     : 'dragend',
		dragenter                   : 'dragenter',
		dragleave                   : 'dragleave',
		dragover                    : 'dragover',
		dragstart                   : 'dragstart',
		drop                        : 'drop',
		durationchange              : 'durationchange',
		emptied                     : 'emptied',
		ended                       : 'ended',
		error                       : 'error',
		focus                       : 'focus',
		hashchange                  : 'hashchange',
		input                       : 'input',
		invalid                     : 'invalid',
		keydown                     : 'keydown',
		keypress                    : 'keypress',
		keyup                       : 'keyup',
		load                        : 'load',
		loadeddata                  : 'loadeddata',
		loadedmetadata              : 'loadedmetadata',
		loadstart                   : 'loadstart',
		message                     : 'message',
		mousedown                   : 'mousedown',
		mouseenter                  : 'mouseenter',
		mouseleave                  : 'mouseleave',
		mousemove                   : 'mousemove',
		mouseout                    : 'mouseout',
		mouseover                   : 'mouseover',
		mouseup                     : 'mouseup',
		mousewheel                  : 'mousewheel',
		MSGestureChange             : 'MSGestureChange',
		MSGestureDoubleTap          : 'MSGestureDoubleTap',
		MSGestureEnd                : 'MSGestureEnd',
		MSGestureHold               : 'MSGestureHold',
		MSGestureStart              : 'MSGestureStart',
		MSGestureTap                : 'MSGestureTap',
		MSInertiaStart              : 'MSInertiaStart',
		MSPointerCancel             : 'MSPointerCancel',
		MSPointerDown               : 'MSPointerDown',
		MSPointerEnter              : 'MSPointerEnter',
		MSPointerLeave              : 'MSPointerLeave',
		MSPointerMove               : 'MSPointerMove',
		MSPointerOut                : 'MSPointerOut',
		MSPointerOver               : 'MSPointerOver',
		MSPointerUp                 : 'MSPointerUp',
		offline                     : 'offline',
		online                      : 'online',
		orientationchange           : 'orientationchange',
		pagehide                    : 'pagehide',
		pageshow                    : 'pageshow',
		pause                       : 'pause',
		play                        : 'play',
		playing                     : 'playing',
		popstate                    : 'popstate',
		progress                    : 'progress',
		ratechange                  : 'ratechange',
		readystatechange            : 'readystatechange',
		reset                       : 'reset',
		resize                      : 'resize',
		scroll                      : 'scroll',
		seeked                      : 'seeked',
		seeking                     : 'seeking',
		select                      : 'select',
		stalled                     : 'stalled',
		storage                     : 'storage',
		submit                      : 'submit',
		suspend                     : 'suspend',
		timeupdate                  : 'timeupdate',
		unload                      : 'unload',
		volumechange                : 'volumechange',
		vrdisplayactivate           : 'vrdisplayactivate',
		vrdisplayblur               : 'vrdisplayblur',
		vrdisplayconnect            : 'vrdisplayconnect',
		vrdisplaydeactivate         : 'vrdisplaydeactivate',
		vrdisplaydisconnect         : 'vrdisplaydisconnect',
		vrdisplayfocus              : 'vrdisplayfocus',
		vrdisplaypointerrestricted  : 'vrdisplaypointerrestricted',
		vrdisplaypointerunrestricted: 'vrdisplaypointerunrestricted',
		vrdisplaypresentchange      : 'vrdisplaypresentchange',
		waiting                     : 'waiting',
	};

}
