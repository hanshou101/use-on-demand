// import 'click-wave.css';    // CSS 似乎只能用这种方式导入（TIP 尝试一下，用require试试？）
import { __assign } from "tslib";
var context = '@@wavesContext';
export function getClickWaveD() {
    // 导入CSS文件
    require('./click-wave.css');
    var ClickWaveD = {
        //
        bind: function (el, binding) {
            el.addEventListener('click', handleClick(el, binding), false);
        },
        //
        update: function (el, binding) {
            // 为空判断
            var ctxEvts = el[context];
            if (!ctxEvts) {
                throw new Error('el[context]不存在！');
            }
            //
            el.removeEventListener('click', ctxEvts.removeHandle, false);
            el.addEventListener('click', handleClick(el, binding), false);
        },
        //
        unbind: function (el, binding) {
            // 为空判断
            var ctxEvts = el[context];
            if (!ctxEvts) {
                throw new Error('el[context]不存在！');
            }
            //
            el.removeEventListener('click', ctxEvts.removeHandle, false);
            el[context] = null;
            delete el[context];
        },
    };
    return ClickWaveD;
}
//
//
//
//
//
//
function handleClick(el, binding) {
    //
    function handle(e) {
        var customOpts = __assign({}, binding.value);
        var opts = __assign({ ele: el, type: 'hit', color: 'rgba(0, 0, 0, 0.15)' }, customOpts);
        var target = opts.ele;
        if (target) {
            target.style.position = 'relative';
            target.style.overflow = 'hidden';
            var rect = target.getBoundingClientRect();
            var ripple = target.querySelector('.waves-ripple');
            if (!ripple) {
                ripple = document.createElement('span');
                ripple.className = 'waves-ripple';
                ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                target.appendChild(ripple);
            }
            else {
                ripple.className = 'waves-ripple';
            }
            switch (opts.type) {
                case 'center':
                    ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px';
                    ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px';
                    break;
                default:
                    ripple.style.top =
                        (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
                            document.body.scrollTop) + 'px';
                    ripple.style.left =
                        (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
                            document.body.scrollLeft) + 'px';
            }
            ripple.style.backgroundColor = opts.color;
            ripple.className = 'waves-ripple z-active';
            return false; // 此处【false】的含义，是什么呢？
        }
        return undefined;
    }
    var ctxEvts = el[context];
    if (!ctxEvts) {
        el[context] = {
            removeHandle: handle,
        };
    }
    else {
        ctxEvts.removeHandle = handle;
    }
    return handle;
}
//# sourceMappingURL=click-wave.js.map