import Clipboard from 'clipboard';
var xX_CopyPaste_Util = /** @class */ (function () {
    function xX_CopyPaste_Util() {
    }
    // 简单复制
    xX_CopyPaste_Util.prototype.simpleCopy = function (selector) {
        var clipboard = new Clipboard(selector);
        return clipboard;
    };
    // 带回调的赋值
    xX_CopyPaste_Util.prototype.copyWithCb = function (selector, sucCb, errCb) {
        var clipboard = this.simpleCopy(selector);
        clipboard.on('success', sucCb);
        clipboard.on('error', errCb);
        return clipboard;
    };
    // 指定复制过程中的一些选项
    xX_CopyPaste_Util.prototype.specialCopy = function (selector, options) {
        // 基于目标元素，指定复制的真正元素（比如，我们需要复制目标元素的下一个元素）
        var clipboard = new Clipboard(selector, options || {
            // TIP 指定一个目标，真正复制的  是这个目标的下一个兄弟元素
            target: function (trigger) {
                return trigger.nextElementSibling;
            },
            // TIP 指定一个目标，复制的是这个目标的【aria-label】标签属性
            text: function (trigger) {
                return trigger.getAttribute('aria-label');
            },
            // TIP 指定一个目标，作为  复制过程中的container值（？？？  这里的focus改变，指的是什么？）
            container: document.getElementById('bootstrap-modal'),
            // TIP 指定操作模式Action（剪切、复制）
            action: function (elem) {
                return 'cut';
            },
        });
    };
    // 销毁Clipboard对象
    xX_CopyPaste_Util.prototype.destroy = function (clipboard) {
        clipboard.destroy();
    };
    return xX_CopyPaste_Util;
}());
export { xX_CopyPaste_Util };
//# sourceMappingURL=copy-paste.js.map