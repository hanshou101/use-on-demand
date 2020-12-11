var EchoNS;
(function (EchoNS) {
    var ImgAttrE;
    (function (ImgAttrE) {
        ImgAttrE["LazySrc"] = "data-echo";
        ImgAttrE["LazyBg"] = "data-echo-background";
        ImgAttrE["TempPlaceHolder"] = "data-echo-placeholder";
    })(ImgAttrE || (ImgAttrE = {}));
    /**
     *
     */
    var EchoLazy = /** @class */ (function () {
        function EchoLazy(root) {
            this.root = root;
            this.callback = function () {
            };
            this.pollTimeout = null; // 轮询定时器
        }
        EchoLazy.prototype.init = function (opts) {
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
            this.offsetCfg = {
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
                this.root.addEventListener('scroll', this.__ScrollOrLoad_debounceOrThrottle, false);
                this.root.addEventListener('load', this.__ScrollOrLoad_debounceOrThrottle, false);
            }
            else {
                (_b = (_a = this.root).attachEvent) === null || _b === void 0 ? void 0 : _b.call(_a, 'onscroll', this.__ScrollOrLoad_debounceOrThrottle);
                (_d = (_c = this.root).attachEvent) === null || _d === void 0 ? void 0 : _d.call(_c, 'onload', this.__ScrollOrLoad_debounceOrThrottle);
            }
        };
        ;
        EchoLazy.prototype.render = function (context) {
            var _a, _b;
            // 查找，所有的相关节点。
            var nodes = (context || document).querySelectorAll(EchoLazy._selector.join(' , '));
            var length = nodes.length;
            var lazySrc;
            var elem;
            // 真正的视口。
            var view = {
                l: 0 - this.offsetCfg.l,
                t: 0 - this.offsetCfg.t,
                b: (this.root.innerHeight || document.documentElement.clientHeight) + this.offsetCfg.b,
                r: (this.root.innerWidth || document.documentElement.clientWidth) + this.offsetCfg.r,
            };
            for (var i = 0; i < length; i++) {
                elem = nodes[i];
                if (EchoLazy.__inView(elem, view)) { // 在【加载范围】内 WARN 加载图片
                    /**
                     * 1.需要卸载。
                     * 				1.所以，先把【占位图】，预存起来。
                     */
                    if (this.unload) {
                        elem.setAttribute(ImgAttrE.TempPlaceHolder, elem.src); // WARN 无论【src前景图】还是【bg背景图】，都走这一步
                    }
                    /**
                     * 2.开始设置图片。
                     */
                    if (elem.getAttribute(ImgAttrE.LazyBg) !== null) { // 存在【背景图】
                        elem.style.backgroundImage = 'url(' + elem.getAttribute(ImgAttrE.LazyBg) + ')'; // 加载背景
                    }
                    else if ( // 存在【不一样的】的【延迟图片】    WARN 如果是同样的，则没有必要重复设置了
                    elem.src !== (lazySrc = elem.getAttribute(ImgAttrE.LazySrc))) {
                        elem.src = lazySrc; // 加载图片
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
                    (_a = this.callback) === null || _a === void 0 ? void 0 : _a.call(this, elem, 'load');
                }
                else if ( // 超出【加载范围】内 WARN 移除图片
                this.unload // 【需要卸载】
                    && !!(lazySrc = elem.getAttribute(ImgAttrE.TempPlaceHolder)) // 存在【预存占位图】（意味着，已经设置过【懒加载图片】了）
                ) {
                    /**
                     * 1.开始恢复原样。
                     */
                    if (elem.getAttribute(ImgAttrE.LazyBg) !== null) {
                        elem.style.backgroundImage = 'url(' + lazySrc + ')'; // 移除【背景图】
                    }
                    else {
                        elem.src = lazySrc; // 恢复【占位图】
                    }
                    /**
                     * 2.开始恢复原样。
                     */
                    elem.removeAttribute(ImgAttrE.TempPlaceHolder); // 移除【预存占位图】
                    // TIP 到这一步后，基本恢复了原样。
                    /**
                     * 调用【自定义暴露回调】。
                     */
                    (_b = this.callback) === null || _b === void 0 ? void 0 : _b.call(// 移除【预存占位图】
                    this, elem, 'unload');
                }
            }
            if (!length) { // 若列表为空，则  解除【事件监听】绑定。
                this.detach();
            }
        };
        ;
        // 解除【事件监听】绑定。
        EchoLazy.prototype.detach = function () {
            var _a, _b;
            // 解除事件
            if (document.removeEventListener) {
                this.root.removeEventListener('scroll', this.__ScrollOrLoad_debounceOrThrottle);
            }
            else {
                (_b = (_a = this.root).detachEvent) === null || _b === void 0 ? void 0 : _b.call(_a, 'onscroll', this.__ScrollOrLoad_debounceOrThrottle);
            }
            // 取消定时器
            window.clearTimeout(this.pollTimeout);
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
        /**
         * 【Window】加载完毕，和【scroll滚动】时，都会触发。
         * 				1.此处，如果使用了【防抖】
         * 						1.有【防抖】的话，则每次都会【清除定时器】。
         * 				2.如果，不存在【轮询定时器】
         * 						1.则，【新建定时器】。
         */
        EchoLazy.prototype.__ScrollOrLoad_debounceOrThrottle = function () {
            var _this = this;
            if (!this.useDebounce // 不使用【防抖】
                && !!this.pollTimeout) { // 且，存在【轮询定时器】
                return;
            }
            // 重置【定时器】。清除
            window.clearTimeout(this.pollTimeout);
            // 重置【定时器】。新建
            this.pollTimeout = window.setTimeout(function () {
                _this.render(); // 检查一次【渲染】
                _this.pollTimeout = null; // 清除定时器
            }, this.throttleDelay);
        };
        ;
        /**
         * 是否处于【display:none】状态。
         * 				1.  display:none时，【offsetParent】为null  。
         */
        EchoLazy.__isDisplayNone = function (element) {
            return (element.offsetParent === null);
        };
        ;
        /**
         * 判断【元素】是否在【视图】之内。
         */
        EchoLazy.__inView = function (element, view) {
            if (EchoLazy.__isDisplayNone(element)) {
                return false;
            }
            // 返回，相对于【Window视图窗口】左上角，的各个关键点位置。
            var box = element.getBoundingClientRect();
            return ( // 四维，都要在【视口】的范围内。
            box.right >= view.l
                && box.bottom >= view.t
                && box.left <= view.r
                && box.top <= view.b);
        };
        ;
        EchoLazy._selector = [
            "[" + ImgAttrE.LazySrc + "]",
            "[" + ImgAttrE.LazyBg + "]",
        ];
        return EchoLazy;
    }());
    EchoNS.EchoLazy = EchoLazy;
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
    xX_DomLazyLoad_Helper.Echo_ImgLazyLoader = EchoNS.EchoLazy;
    return xX_DomLazyLoad_Helper;
}());
export { xX_DomLazyLoad_Helper };
//# sourceMappingURL=dom-lazyLoad.js.map