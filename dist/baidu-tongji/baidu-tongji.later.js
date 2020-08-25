export function initBaiduTongji(src = 'https://hm.baidu.com/hm.js?ccb50b59df9bf1fe2e08d732cd3a964e') {
    // var _hmt = _hmt || [];
    window._hmt = window._hmt || [];
    (function () {
        var _a;
        const hm = document.createElement('script');
        hm.src = src;
        const s = document.getElementsByTagName('script')[0];
        (_a = s === null || s === void 0 ? void 0 : s.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(hm, s); // 将自己，放在最前面。（？？？有必要吗？会导致卡顿吗？）
    })();
}
//# sourceMappingURL=baidu-tongji.later.js.map