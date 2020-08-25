/**
 * 计算屏幕尺寸相关。并调整尺寸。
 * TIP 该方法，采用了YanNan的方式，目前运转正常。
 */
export class My_RemCompatible_Util {
    static rem2px(v) {
        const _v = parseFloat(v);
        return _v * this.rem;
    }
    static px2rem(v) {
        const _v = parseFloat(v);
        return _v / this.rem;
    }
    /**
     *
     */
    static calc_remCompatible_YanNan(designWidth, // 设计图尺寸
    adjustRatio = 2) {
        // 自动计算html字体
        let htmlFSize;
        // 重新计算字体尺寸
        const reCalcSize = () => {
            /**
             * 此处，需要根据【自动横屏】的需求，来调整  不同朝向下，【rem】所依赖的基准坐标轴（横轴宽度/纵轴宽度）。
             * TODO 重要的语句哦~~~
             * TODO 重要的语句哦~~~
             * TODO 重要的语句哦~~~
             */
            const clientWidth = docEl.clientWidth > dSize ? dSize : docEl.clientWidth;
            const clientHeight = docEl.clientHeight > dSize ? dSize : docEl.clientHeight;
            const mainAxisSize = clientWidth < clientHeight ? clientWidth : clientHeight; // 取两者中最小值（取默认竖屏意义下的宽度值）
            if (!mainAxisSize) {
                return;
            }
            // 这里的  750  根据设计稿来定
            htmlFSize = 100 * (mainAxisSize / dSize) * adjustRatio;
            // TIP 这里，我拓展了一下，
            docEl.style.fontSize = htmlFSize + 'px';
            // TIP 绑定方法
            regSizeMethods(htmlFSize);
        };
        // 一些转换方法
        const regSizeMethods = (__rootSize) => {
            // TIP 新增加的，修复方法。
            // const window_width = screen.width > 768 ? 768 : screen.width;
            // const rem          = window_width * dpr / 10;
            this.dpr = window.devicePixelRatio || 1;
            this.rem = __rootSize;
            console.log('dpr', this.dpr, 'rem', this.rem);
        };
        // TIP——————————————————————————————正式开始——————————————————————————————————
        // rem布局自适应
        console.log('calc_remCompatible_YanNan');
        const dSize = designWidth; // 设计宽度
        const docEl = document.documentElement;
        // 获取浏览器支持的改变方向的函数，如果'orientationchange'存在，就使用这个
        const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        // 绑定事件
        if (document.addEventListener) {
            window.addEventListener(resizeEvt, reCalcSize, false);
            document.addEventListener('DOMContentLoaded', reCalcSize, false);
        }
    }
}
My_RemCompatible_Util.dpr = 0;
My_RemCompatible_Util.rem = 0;
//# sourceMappingURL=RemCompatible_Util.js.map