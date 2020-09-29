var EchoNS;
(function (EchoNS) {
    var Echo = /** @class */ (function () {
        function Echo(root) {
            this.root = root;
            this.callback = function () {
            };
            this.poll = null;
        }
        Echo.prototype.init = function (opts) {
            var _a, _b, _c, _d;
            if (opts === void 0) { opts = {}; }
            /**
             * 赋予【边界距离】默认值。
             */
            var offsetAll = opts.offset || 0;
            var offsetVertical = opts.offsetVertical || offsetAll;
            var offsetHorizontal = opts.offsetHorizontal || offsetAll;
            var optionToInt = function (opt, fallback) {
                return parseInt(opt || fallback, 10);
            };
            this.offset = {
                t: optionToInt(opts.offsetTop, offsetVertical),
                b: optionToInt(opts.offsetBottom, offsetVertical),
                l: optionToInt(opts.offsetLeft, offsetHorizontal),
                r: optionToInt(opts.offsetRight, offsetHorizontal),
            };
            // 【节流】
            this.throttleDelay = optionToInt(opts.throttle, 250);
            // 【防抖】
            this.useDebounce = opts.debounce !== false;
            // noinspection PointlessBooleanExpressionJS
            // 【自动卸载】
            this.unload = !!opts.unload;
            // 【加载完成回调】
            this.callback = opts.callback || this.callback;
            // 触发渲染
            this.render();
            // 绑定监听
            if (document.addEventListener) {
                this.root.addEventListener('scroll', this.__debounceOrThrottle, false);
                this.root.addEventListener('load', this.__debounceOrThrottle, false);
            }
            else {
                (_b = (_a = this.root).attachEvent) === null || _b === void 0 ? void 0 : _b.call(_a, 'onscroll', this.__debounceOrThrottle);
                (_d = (_c = this.root).attachEvent) === null || _d === void 0 ? void 0 : _d.call(_c, 'onload', this.__debounceOrThrottle);
            }
        };
        ;
        Echo.prototype.render = function (context) {
            var _a, _b;
            var nodes = (context || document).querySelectorAll('[data-echo], [data-echo-background]');
            var length = nodes.length;
            var src;
            var elem;
            var view = {
                l: 0 - this.offset.l,
                t: 0 - this.offset.t,
                b: (this.root.innerHeight || document.documentElement.clientHeight) + this.offset.b,
                r: (this.root.innerWidth || document.documentElement.clientWidth) + this.offset.r,
            };
            for (var i = 0; i < length; i++) {
                elem = nodes[i];
                if (Echo.__inView(elem, view)) {
                    if (this.unload) {
                        elem.setAttribute('data-echo-placeholder', elem.src);
                    }
                    if (elem.getAttribute('data-echo-background') !== null) {
                        elem.style.backgroundImage = 'url(' + elem.getAttribute('data-echo-background') + ')';
                    }
                    else if (elem.src !== (src = elem.getAttribute('data-echo') || '未获取到')) {
                        elem.src = src;
                    }
                    if (!this.unload) {
                        elem.removeAttribute('data-echo');
                        elem.removeAttribute('data-echo-background');
                    }
                    (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, elem, 'load');
                }
                else if (this.unload && !!(src = elem.getAttribute('data-echo-placeholder') || '未获取到')) {
                    if (elem.getAttribute('data-echo-background') !== null) {
                        elem.style.backgroundImage = 'url(' + src + ')';
                    }
                    else {
                        elem.src = src;
                    }
                    elem.removeAttribute('data-echo-placeholder');
                    (_b = this.callback) === null || _b === void 0 ? void 0 : _b.call(this, elem, 'unload');
                }
            }
            if (!length) {
                this.detach();
            }
        };
        ;
        Echo.prototype.detach = function () {
            var _a, _b;
            if (document.removeEventListener) {
                this.root.removeEventListener('scroll', this.__debounceOrThrottle);
            }
            else {
                (_b = (_a = this.root).detachEvent) === null || _b === void 0 ? void 0 : _b.call(_a, 'onscroll', this.__debounceOrThrottle);
            }
            window.clearTimeout(this.poll);
        };
        ;
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
        Echo.prototype.__debounceOrThrottle = function () {
            var _this = this;
            if (!this.useDebounce && !!this.poll) {
                return;
            }
            window.clearTimeout(this.poll);
            this.poll = window.setTimeout(function () {
                _this.render();
                _this.poll = null;
            }, this.throttleDelay);
        };
        ;
        Echo.__isHidden = function (element) {
            return (element.offsetParent === null);
        };
        ;
        Echo.__inView = function (element, view) {
            if (Echo.__isHidden(element)) {
                return false;
            }
            var box = element.getBoundingClientRect();
            return (box.right >= view.l && box.bottom >= view.t && box.left <= view.r && box.top <= view.b);
        };
        ;
        return Echo;
    }());
    EchoNS.Echo = Echo;
})(EchoNS || (EchoNS = {}));
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
var xX_DomLazyLoad_Helper = /** @class */ (function () {
    function xX_DomLazyLoad_Helper() {
    }
    xX_DomLazyLoad_Helper.Echo_ImgLazyLoader = EchoNS.Echo;
    return xX_DomLazyLoad_Helper;
}());
export { xX_DomLazyLoad_Helper };
//# sourceMappingURL=dom-lazyLoad.js.map