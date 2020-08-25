import { DebugU, LogE } from '../debug-util/debug-util';
export class DomScript_Helper {
    static loadJsScript_Async(jsUrl, sProperties = {}) {
        DebugU.l(LogE.loadScript, '远程脚本', '开始加载', jsUrl);
        return new Promise((resolve) => {
            var _a;
            const scriptNode = document.createElement('script');
            /**
             * 1.将脚本，插入到【网页】中。
             *        1.设置各个property
             *        2.监听onload
             *        3.读取src
             *
             * 2.一些特殊情况：
             *        IE 10，及以下，是这种实现方式【scriptNode.onreadystatechange】
             */
            Object.entries(sProperties).forEach(([key, value]) => {
                scriptNode[key] = value; // 此处，类型太过宽松？
            });
            scriptNode.onload = function (e) {
                DebugU.l(LogE.loadScript, '远程脚本', '加载成功', jsUrl);
                resolve(e);
            };
            scriptNode.src = jsUrl;
            const firstS = document.getElementsByTagName('script')[0];
            (_a = firstS === null || firstS === void 0 ? void 0 : firstS.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(scriptNode, firstS); // 将自己，放在最前面。（？？？有必要吗？会导致卡顿吗？）
        });
    }
}
//# sourceMappingURL=dom-script.js.map