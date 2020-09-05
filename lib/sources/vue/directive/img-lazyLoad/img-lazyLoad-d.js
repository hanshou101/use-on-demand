import { VHookE } from '../../hook/vue-hook-enum';
export class ImgLazyLoad_Directive {
    /**
     * 将图片插入
     */
    static __showImage(el, imgSrc) {
        const img = new Image();
        img.src = imgSrc;
        img.onload = function () {
            el.src = imgSrc;
            el.isLoaded = true;
        };
    }
    /**
     * 获得一个监听器
     */
    static __getObserver() {
        const observer = new IntersectionObserver((entries) => {
            // entries是所有【被监听对象】的集合
            entries.forEach((entry) => {
                if (entry.isIntersecting || entry.intersectionRatio > 0) { // 监听元素，到达临界值
                    const target = entry.target;
                    if (!target.isLoaded) { // 并且，未加载图片
                        this.__showImage(target, target.data_src); // 插入图片
                    }
                }
            });
        });
        return observer;
    }
    static getDirective(placeholderImg) {
        let timer;
        const observer = ImgLazyLoad_Directive.__getObserver();
        const _directive = {
            /**
             * 1.这里用【inserted】和【bind】都行
             *        1.因为IntersectionObserver时异步的，以防意外还是用【inserted】好一点
             *        2.【inserted】和【bind】的区别在于，【inserted】时元素已经插入页面，能够直接获取到dom元素的位置信息。
             */
            inserted(el, binding, vnode) {
                const _el = el;
                clearTimeout(timer);
                // 初始化时，展示默认图片
                _el.src = placeholderImg;
                // 将【以后需要加载】的图片，预先绑定在【图片元素】上。
                _el.data_src = binding.value;
                observer.observe(el);
                const vm = vnode.context;
                timer = window.setTimeout(() => {
                    // 在【组件卸载之前】，停止监听器
                    vm === null || vm === void 0 ? void 0 : vm.$on(VHookE.beforeDestroy, () => {
                        observer.disconnect(); // 断开监听器。
                    });
                }, 20);
            },
            /**
             * 当【图片更新】时
             */
            update(el, binding) {
                const _el = el;
                _el.isLoaded = false; // 指定为【未加载】状态
                _el.data_src = binding.value; // 指定【以后需要加载】的图片。
            },
        };
        return _directive;
    }
}
ImgLazyLoad_Directive.__defaultCfg = {
    /**
     * 1像素透明。
     *        1.参考链接：[](https://gist.github.com/huanggm/ed4fd0255fa2877001d65c307af56021)
     */
    pxTransparentImg: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    directiveId: 'imgLazy',
};
//# sourceMappingURL=img-lazyLoad-d.js.map