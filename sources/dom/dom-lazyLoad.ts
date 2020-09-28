namespace EchoNS {

	interface EchoOption {
		offset: number;       // 视口外【多远距离】，开始懒加载
		throttle: number;     // 检测【onscroll】事件的间隔阈值
		unload: boolean;      // 超出视口范围后，是否卸载图片
		callback(element: HTMLElement, op: string): void;  // 图片操作的回调
		//
		//
		// TIP 以下，是不常用属性
		offsetVertical?: number;
		offsetHorizontal?: number;
		offsetTop?: number;
		offsetBottom?: number;
		offsetLeft?: number;
		offsetRight?: number;
		debounce?: boolean;
	}

	interface EchoOffset {
		t: number;
		b: number;
		l: number;
		r: number;
	}


	export class Echo {
		callback!: EchoOption['callback'];
		offset!: EchoOffset;
		poll: NullableType<number> = null;
		delay!: number;
		useDebounce!: boolean;
		unload!: boolean;

		constructor(private root: Window) {

		}

		public init(opts: EchoOption) {
			opts                   = opts || {};
			const offsetAll        = opts.offset || 0;
			const offsetVertical   = opts.offsetVertical || offsetAll;
			const offsetHorizontal = opts.offsetHorizontal || offsetAll;
			const optionToInt      = function(opt: number | undefined, fallback: number) {
				return parseInt(opt || fallback, 10);
			};
			this.offset            = {
				t: optionToInt(opts.offsetTop, offsetVertical),
				b: optionToInt(opts.offsetBottom, offsetVertical),
				l: optionToInt(opts.offsetLeft, offsetHorizontal),
				r: optionToInt(opts.offsetRight, offsetHorizontal),
			};
			this.delay             = optionToInt(opts.throttle, 250);
			this.useDebounce       = opts.debounce !== false;
			// noinspection PointlessBooleanExpressionJS
			this.unload            = !!opts.unload;
			this.callback          = opts.callback || this.callback;
			this.render();

			// @ts-ignore
			if (document.addEventListener) {
				this.root.addEventListener('scroll', this.__debounceOrThrottle, false);
				this.root.addEventListener('load', this.__debounceOrThrottle, false);
			} else {
				this.root.attachEvent?.('onscroll', this.__debounceOrThrottle);
				this.root.attachEvent?.('onload', this.__debounceOrThrottle);
			}
		};

		public render(context?: Document) {
			const nodes: Array<HTMLImageElement> = (context || document).querySelectorAll('[data-echo], [data-echo-background]') as any as Array<HTMLImageElement>;
			const length                         = nodes.length;
			let src: string;
			let elem;
			const view: EchoOffset               = {
				l: 0 - this.offset.l,
				t: 0 - this.offset.t,
				b: (this.root.innerHeight || document.documentElement.clientHeight) + this.offset.b,
				r: (this.root.innerWidth || document.documentElement.clientWidth) + this.offset.r,
			};
			for (let i = 0; i < length; i++) {
				elem = nodes[i];
				if (Echo.__inView(elem, view)) {

					if (this.unload) {
						elem.setAttribute('data-echo-placeholder', elem.src);
					}

					if (elem.getAttribute('data-echo-background') !== null) {
						elem.style.backgroundImage = 'url(' + elem.getAttribute('data-echo-background') + ')';
					} else if (elem.src !== (src = elem.getAttribute('data-echo') || '未获取到')) {
						elem.src = src;
					}

					if (!this.unload) {
						elem.removeAttribute('data-echo');
						elem.removeAttribute('data-echo-background');
					}

					this.callback(elem, 'load');
				} else if (this.unload && !!(src = elem.getAttribute('data-echo-placeholder') || '未获取到')) {

					if (elem.getAttribute('data-echo-background') !== null) {
						elem.style.backgroundImage = 'url(' + src + ')';
					} else {
						elem.src = src;
					}

					elem.removeAttribute('data-echo-placeholder');
					this.callback(elem, 'unload');
				}
			}
			if (!length) {
				this.detach();
			}
		};

		public detach() {
			// @ts-ignore
			if (document.removeEventListener) {
				this.root.removeEventListener('scroll', this.__debounceOrThrottle);
			} else {
				this.root.detachEvent?.('onscroll', this.__debounceOrThrottle);
			}
			window.clearTimeout(this.poll);
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

		private __debounceOrThrottle() {
			if (!this.useDebounce && !!this.poll) {
				return;
			}
			window.clearTimeout(this.poll);
			this.poll = window.setTimeout(() => {
				this.render();
				this.poll = null;
			}, this.delay);
		};


		private static __isHidden(element: HTMLElement) {
			return (element.offsetParent === null);
		};

		private static __inView(element: HTMLElement, view: EchoOffset) {
			if (Echo.__isHidden(element)) {
				return false;
			}

			const box = element.getBoundingClientRect();
			return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
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
	public static Echo_ImgLazyLoader = EchoNS.Echo;
}

