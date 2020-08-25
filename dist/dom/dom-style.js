export class DomStyle_Helper {
    /**
     * 获取元素的css属性值
     */
    static getDomStyle(ele, // 元素
    cssAttribute) {
        if (!ele || !ele.nodeName) {
            console.error('ele 必须是一个dom元素');
            return;
        }
        if (!cssAttribute) {
            console.error('cssAttribute 必须是一个字符串');
            return;
        }
        let val = '';
        if (window.getComputedStyle) {
            val = window.getComputedStyle(ele, null)[cssAttribute];
        }
        else if (ele.currentStyle) {
            val = ele.currentStyle[cssAttribute];
        }
        if (!isNaN(parseFloat(val))) {
            return parseFloat(val);
        }
        else {
            return val;
        }
    }
    /**
     * 【浏览器窗口】，内部内容区域，宽高
     */
    static getDocumentWidthHeight() {
        if (window.innerHeight != null) {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        }
        else if (document.compatMode === 'CSS1Compat') {
            // 怪异模式浏览器
            return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight,
            };
        }
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight,
        };
    }
    /**
     * 获取元素距【浏览器文档最顶部、最左边】的距离
     */
    static get_AbsoluteOffset_Position(ele) {
        const position = {
            top: 0,
            left: 0,
        };
        let offsetParent = ele.offsetParent; // TODO offsetParent，为距离最近的【定位元素】。  （若不存在距离最近的【定位元素】，则直接获取  根元素（比如  <html>））
        position.top = ele.offsetTop;
        position.left = ele.offsetLeft;
        while (offsetParent != null) {
            position.top += offsetParent.offsetTop;
            position.left += offsetParent.offsetLeft;
            offsetParent = offsetParent.offsetParent;
        }
        return position;
    }
    /**
     *  获取以下距离：
     *        1.【元素底部】，到【Window可见区域  底部】的距离
     *        2.【元素右侧】，到【Window可见区域  右侧】的距离。
     */
    static get_eB2wB_eR2wR(e) {
        // alert('尺寸改变，开始检测');
        const domAttr = {
            posit: DomStyle_Helper.get_AbsoluteOffset_Position(e),
            oHeight: e.offsetHeight,
            oWidth: e.offsetWidth,
        };
        const wAttr = {
            visibleH: window.innerHeight,
            visibleW: window.innerWidth,
        };
        console.log('属性信息', domAttr);
        console.log('窗口信息', wAttr);
        const res = {
            eB2wB: wAttr.visibleH - domAttr.posit.top - domAttr.oHeight,
            eR2wR: wAttr.visibleW - domAttr.posit.left - domAttr.oWidth,
            domAttr,
            wAttr,
        };
        console.log('距离下方、右方距离', res);
        return res;
    }
    /**
     * 兼容性：获取浏览器滚动条距离顶部的位置
     */
    static getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || -1;
    }
    /**
     * 获取兄弟节点
     */
    static getSiblingsDoms(ele) {
        if (ele.parentNode) {
            const a = [];
            const p = ele.parentNode.children;
            for (let i = 0, pl = p.length; i < pl; i++) {
                if (p[i] !== ele) {
                    a.push(p[i]);
                }
            }
            return a;
        }
        else {
            return [];
        }
    }
    /**
     * 兼容性：判断两个元素是否是包含关系。（无限层级）
     *        1.无限个层级，都有效，
     */
    static isContains_otherEle(ele, // 父级元素
    _childEle) {
        let childEle = _childEle;
        if (ele == childEle) {
            return false;
        }
        if (typeof ele.contains == 'function') {
            return ele.contains(childEle);
        }
        else {
            while (true) {
                if (!childEle) {
                    return false;
                }
                if (childEle == ele) {
                    return true;
                }
                else {
                    if (childEle.parentNode) {
                        childEle = childEle.parentNode;
                    }
                }
            }
        }
    }
    /**
     * 修复，Android下【软键盘】弹出时，导致的【VH不准确】的问题。
     */
    static fix_AndroidKeyboard_errorVH(timeout = 300) {
        // 避免【小键盘】弹起，导致的【vh失效】。
        setTimeout(function () {
            const viewHeight = window.innerHeight;
            const viewWidth = window.innerWidth;
            const viewport = document.querySelector('meta[name=viewport]');
            viewport === null || viewport === void 0 ? void 0 : viewport.setAttribute('content', 'height=' + viewHeight + 'px, width=' + viewWidth + 'px, initial-scale=1.0');
        }, timeout);
    }
    /**
     * 浏览器，是否支持【某个CSS属性】
     */
    isSupport_CssProperty(key) {
        const jsKey = toCamelCase(key); // 有些css属性是连字符号形成
        if (jsKey in document.documentElement.style) {
            return key;
        }
        let validKey;
        // 属性名为前缀在js中的形式，属性值是前缀在css中的形式
        // 经尝试，Webkit 也可是首字母小写 webkit
        const prefixMap = {
            Webkit: '-webkit-',
            Moz: '-moz-',
            ms: '-ms-',
            O: '-o-',
        };
        for (const jsPrefix in prefixMap) {
            if (prefixMap.hasOwnProperty(jsPrefix)) {
                const styleKey = toCamelCase(`${jsPrefix}-${jsKey}`);
                if (styleKey in document.documentElement.style) {
                    validKey = prefixMap[jsPrefix] + key;
                    break;
                }
            }
        }
        return validKey;
    }
}
/**
 * 把有连字符号的字符串转化为驼峰命名法的字符串
 */
function toCamelCase(str) {
    return str.replace(/-(\w)/g, (matched, letter) => {
        return letter.toUpperCase();
    });
}
//# sourceMappingURL=dom-style.js.map