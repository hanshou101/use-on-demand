var xX_DomStyle_Helper = /** @class */ (function () {
    function xX_DomStyle_Helper() {
    }
    xX_DomStyle_Helper.loadCss_Async = function (cssUrl) {
        return new Promise(function (resolve, reject) {
            // 创建
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = cssUrl;
            // 监听
            link.onload = function () {
                resolve('加载成功');
            };
            link.onerror = function () {
                resolve('加载失败');
            };
            // 添加
            var head = document.getElementsByTagName('head')[0];
            head.appendChild(link);
        });
    };
    /**
     * 获取元素的css属性值
     */
    xX_DomStyle_Helper.getDomStyle = function (ele, // 元素
    cssAttribute) {
        if (!ele || !ele.nodeName) {
            console.error('ele 必须是一个dom元素');
            return;
        }
        if (!cssAttribute) {
            console.error('cssAttribute 必须是一个字符串');
            return;
        }
        var val = '';
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
    };
    /**
     * 【浏览器窗口】，内部内容区域，宽高
     */
    xX_DomStyle_Helper.getDocumentWidthHeight = function () {
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
    };
    /**
     * 获取元素距【浏览器文档最顶部、最左边】的距离
     */
    xX_DomStyle_Helper.get_AbsoluteOffset_Position = function (ele) {
        var position = {
            top: 0,
            left: 0,
        };
        var offsetParent = ele.offsetParent; // TODO offsetParent，为距离最近的【定位元素】。  （若不存在距离最近的【定位元素】，则直接获取  根元素（比如  <html>））
        position.top = ele.offsetTop;
        position.left = ele.offsetLeft;
        while (offsetParent != null) {
            position.top += offsetParent.offsetTop;
            position.left += offsetParent.offsetLeft;
            offsetParent = offsetParent.offsetParent;
        }
        return position;
    };
    /**
     *  获取以下距离：
     *        1.【元素底部】，到【Window可见区域  底部】的距离
     *        2.【元素右侧】，到【Window可见区域  右侧】的距离。
     */
    xX_DomStyle_Helper.get_eB2wB_eR2wR = function (e) {
        // alert('尺寸改变，开始检测');
        var domAttr = {
            posit: xX_DomStyle_Helper.get_AbsoluteOffset_Position(e),
            oHeight: e.offsetHeight,
            oWidth: e.offsetWidth,
        };
        var wAttr = {
            visibleH: window.innerHeight,
            visibleW: window.innerWidth,
        };
        console.log('属性信息', domAttr);
        console.log('窗口信息', wAttr);
        var res = {
            eB2wB: wAttr.visibleH - domAttr.posit.top - domAttr.oHeight,
            eR2wR: wAttr.visibleW - domAttr.posit.left - domAttr.oWidth,
            domAttr: domAttr,
            wAttr: wAttr,
        };
        console.log('距离下方、右方距离', res);
        return res;
    };
    /**
     * 兼容性：获取浏览器滚动条距离顶部的位置
     */
    xX_DomStyle_Helper.getScrollTop = function () {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || -1;
    };
    /**
     * 获取兄弟节点
     */
    xX_DomStyle_Helper.getSiblingsDoms = function (ele) {
        if (ele.parentNode) {
            var a = [];
            var p = ele.parentNode.children;
            for (var i = 0, pl = p.length; i < pl; i++) {
                if (p[i] !== ele) {
                    a.push(p[i]);
                }
            }
            return a;
        }
        else {
            return [];
        }
    };
    /**
     * 兼容性：判断两个元素是否是包含关系。（无限层级）
     *        1.无限个层级，都有效，
     */
    xX_DomStyle_Helper.isContains_otherEle = function (ele, // 父级元素
    _childEle) {
        var childEle = _childEle;
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
    };
    /**
     * 修复，Android下【软键盘】弹出时，导致的【VH不准确】的问题。
     */
    xX_DomStyle_Helper.fix_AndroidKeyboard_errorVH = function (timeout) {
        if (timeout === void 0) { timeout = 300; }
        // 避免【小键盘】弹起，导致的【vh失效】。
        setTimeout(function () {
            var viewHeight = window.innerHeight;
            var viewWidth = window.innerWidth;
            var viewport = document.querySelector('meta[name=viewport]');
            viewport === null || viewport === void 0 ? void 0 : viewport.setAttribute('content', 'height=' + viewHeight + 'px, width=' + viewWidth + 'px, initial-scale=1.0');
        }, timeout);
    };
    /**
     * 浏览器，是否支持【某个CSS属性】
     */
    xX_DomStyle_Helper.prototype.isSupport_CssProperty = function (key) {
        var jsKey = toCamelCase(key); // 有些css属性是连字符号形成
        if (jsKey in document.documentElement.style) {
            return key;
        }
        var validKey;
        // 属性名为前缀在js中的形式，属性值是前缀在css中的形式
        // 经尝试，Webkit 也可是首字母小写 webkit
        var prefixMap = {
            Webkit: '-webkit-',
            Moz: '-moz-',
            ms: '-ms-',
            O: '-o-',
        };
        for (var jsPrefix in prefixMap) {
            if (prefixMap.hasOwnProperty(jsPrefix)) {
                var styleKey = toCamelCase(jsPrefix + "-" + jsKey);
                if (styleKey in document.documentElement.style) {
                    validKey = prefixMap[jsPrefix] + key;
                    break;
                }
            }
        }
        return validKey;
    };
    return xX_DomStyle_Helper;
}());
export { xX_DomStyle_Helper };
/**
 * 把有连字符号的字符串转化为驼峰命名法的字符串
 */
function toCamelCase(str) {
    return str.replace(/-(\w)/g, function (matched, letter) {
        return letter.toUpperCase();
    });
}
//# sourceMappingURL=dom-style.js.map