namespace EchoNS {

	interface EchoOption {
		offset?: number;       // 视口外【多远距离】，开始懒加载
		throttle?: number;     // 【节流】。检测【onscroll】事件的间隔阈值
		unload?: boolean;      // 超出视口范围后，是否卸载图片
		callback?(
			element: HTMLElement,
			op: 'load' | 'unload',
		): void;  // 图片操作的回调
		//
		//
		// TIP 以下，是不常用属性
		offsetVertical?: number;
		offsetHorizontal?: number;
		offsetTop?: number;
		offsetBottom?: number;
		offsetLeft?: number;
		offsetRight?: number;
		debounce?: boolean;		// 【防抖】
	}

	interface CustomViewPortOffset {
		t: number;
		b: number;
		l: number;
		r: number;
	}

	enum ImgAttrE {
		LazySrc         = 'data-echo',
		LazyBg          = 'data-echo-background',
		TempPlaceHolder = 'data-echo-placeholder',
	}

	/**
	 *
	 */
	export class EchoLazy {
		callback: EchoOption['callback']  = function() {
		};
		offsetCfg!: CustomViewPortOffset;
		pollTimeout: NullableType<number> = null;																		// 轮询定时器
		throttleDelay!: number;
		useDebounce!: boolean;
		unload!: boolean;

		private static readonly _selector = [
			`[${ImgAttrE.LazySrc}]`,
			`[${ImgAttrE.LazyBg}]`,
		];

		constructor(private root: Window) {

		}

		public init(opts: EchoOption = {}) {
			/**
			 * 赋予【边界距离】默认值。
			 */
			const offsetAll        = opts.offset || 0;
			const offsetVertical   = opts.offsetVertical || offsetAll;
			const offsetHorizontal = opts.offsetHorizontal || offsetAll;
			const optionToInt      = function(opt: number | undefined, fallback: number) {
				return parseInt(opt || fallback, 10);
			};
			this.offsetCfg         = {
				t: optionToInt(opts.offsetTop, offsetVertical),
				b: optionToInt(opts.offsetBottom, offsetVertical),
				l: optionToInt(opts.offsetLeft, offsetHorizontal),
				r: optionToInt(opts.offsetRight, offsetHorizontal),
			};

			// 【节流】
			this.throttleDelay = optionToInt(opts.throttle, 250);
			// 【防抖】
			this.useDebounce   = opts.debounce !== false;
			// noinspection PointlessBooleanExpressionJS
			// 【自动卸载】
			this.unload   = !!opts.unload;
			// 【加载完成回调】
			this.callback = opts.callback || this.callback;
			// 触发渲染
			this.render();

			// 绑定监听
			if (document.addEventListener) {
				this.root.addEventListener('scroll', this.__ScrollOrLoad_debounceOrThrottle, false);
				this.root.addEventListener('load', this.__ScrollOrLoad_debounceOrThrottle, false);
			} else {
				this.root.attachEvent?.('onscroll', this.__ScrollOrLoad_debounceOrThrottle);
				this.root.attachEvent?.('onload', this.__ScrollOrLoad_debounceOrThrottle);
			}
		};

		public render(context?: Document) {
			// 查找，所有的相关节点。
			const nodes: Array<HTMLImageElement> = (context || document).querySelectorAll(EchoLazy._selector.join(' , ')) as any as Array<HTMLImageElement>;

			const length = nodes.length;
			let lazySrc: NullableType<string>;
			let elem;

			// 真正的视口。
			const view: CustomViewPortOffset = {
				l: 0 - this.offsetCfg.l,
				t: 0 - this.offsetCfg.t,
				b: (this.root.innerHeight || document.documentElement.clientHeight) + this.offsetCfg.b,
				r: (this.root.innerWidth || document.documentElement.clientWidth) + this.offsetCfg.r,
			};


			for (let i = 0; i < length; i++) {
				elem = nodes[i];


				if (EchoLazy.__inView(elem, view)) {																																			// 在【加载范围】内 WARN 加载图片

					/**
					 * 1.需要卸载。
					 * 				1.所以，先把【占位图】，预存起来。
					 */
					if (this.unload) {
						elem.setAttribute(ImgAttrE.TempPlaceHolder, elem.src);	// WARN 无论【src前景图】还是【bg背景图】，都走这一步
					}


					/**
					 * 2.开始设置图片。
					 */
					if (elem.getAttribute(ImgAttrE.LazyBg) !== null) {				// 存在【背景图】
						elem.style.backgroundImage = 'url(' + elem.getAttribute(ImgAttrE.LazyBg) + ')';	// 加载背景
					} else if (																																	// 存在【不一样的】的【延迟图片】    WARN 如果是同样的，则没有必要重复设置了
						elem.src !== (
							lazySrc = elem.getAttribute(ImgAttrE.LazySrc)
						)
					) {
						elem.src = lazySrc as string;	// 加载图片
					}

					/**
					 * 3.如果，不需要卸载。
					 * 				1.就【定型】了。
					 */
					if (!this.unload) {
						elem.removeAttribute(ImgAttrE.LazySrc);
						elem.removeAttribute(ImgAttrE.LazyBg);
					}

					/**
					 * 调用【自定义暴露回调】。
					 */
					this.callback?.(elem, 'load');

				} else if (																																	  																		// 超出【加载范围】内 WARN 移除图片
					this.unload																																	// 【需要卸载】
					&& !!(lazySrc = elem.getAttribute(ImgAttrE.TempPlaceHolder))			// 存在【预存占位图】（意味着，已经设置过【懒加载图片】了）
				) {

					/**
					 * 1.开始恢复原样。
					 */
					if (elem.getAttribute(ImgAttrE.LazyBg) !== null) {
						elem.style.backgroundImage = 'url(' + lazySrc + ')';		// 移除【背景图】
					} else {
						elem.src = lazySrc;																			// 恢复【占位图】
					}

					/**
					 * 2.开始恢复原样。
					 */
					elem.removeAttribute(ImgAttrE.TempPlaceHolder);// 移除【预存占位图】

					// TIP 到这一步后，基本恢复了原样。

					/**
					 * 调用【自定义暴露回调】。
					 */
					this.callback?.(elem, 'unload');
				}
			}

			if (!length) {				// 若列表为空，则  解除【事件监听】绑定。
				this.detach();
			}
		};

		// 解除【事件监听】绑定。
		public detach() {
			// 解除事件
			if (document.removeEventListener) {
				this.root.removeEventListener('scroll', this.__ScrollOrLoad_debounceOrThrottle);
			} else {
				this.root.detachEvent?.('onscroll', this.__ScrollOrLoad_debounceOrThrottle);
			}
			// 取消定时器
			window.clearTimeout(this.pollTimeout);
		};

		//
		//
		//
		//
		//
		//
		//
		//
		//
		//
		//

		/**
		 * 【Window】加载完毕，和【scroll滚动】时，都会触发。
		 * 				1.此处，如果使用了【防抖】
		 * 						1.有【防抖】的话，则每次都会【清除定时器】。
		 * 				2.如果，不存在【轮询定时器】
		 * 						1.则，【新建定时器】。
		 */
		private __ScrollOrLoad_debounceOrThrottle() {
			if (!this.useDebounce																											// 不使用【防抖】
				&& !!this.pollTimeout) {																// 且，存在【轮询定时器】
				return;
			}
			// 重置【定时器】。清除
			window.clearTimeout(this.pollTimeout);
			// 重置【定时器】。新建
			this.pollTimeout = window.setTimeout(() => {
				this.render();																// 检查一次【渲染】
				this.pollTimeout = null;											// 清除定时器
			}, this.throttleDelay);
		};


		/**
		 * 是否处于【display:none】状态。
		 * 				1.  display:none时，【offsetParent】为null  。
		 */
		private static __isDisplayNone(element: HTMLElement) {
			return (element.offsetParent === null);
		};

		/**
		 * 判断【元素】是否在【视图】之内。
		 */
		private static __inView(element: HTMLElement, view: CustomViewPortOffset) {
			if (EchoLazy.__isDisplayNone(element)) {
				return false;
			}

			// 返回，相对于【Window视图窗口】左上角，的各个关键点位置。
			const box = element.getBoundingClientRect();
			return (										// 四维，都要在【视口】的范围内。
				box.right >= view.l
				&& box.bottom >= view.t
				&& box.left <= view.r
				&& box.top <= view.b
			);
		};

	}

}

// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————

export class xX_DomLazyLoad_Helper {
	public static Echo_ImgLazyLoader = EchoNS.EchoLazy;
}

