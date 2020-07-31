export function initBaiduTongji(
  src = 'https://hm.baidu.com/hm.js?ccb50b59df9bf1fe2e08d732cd3a964e',
) {
  // var _hmt = _hmt || [];
  window._hmt = window._hmt || [];
  (function () {
    const hm = document.createElement('script');
    hm.src   = src;
    const s  = document.getElementsByTagName('script')[0];
    s?.parentNode?.insertBefore(hm, s);   // 将自己，放在最前面。（？？？有必要吗？会导致卡顿吗？）
  })();
}

declare global {
  interface Window {
    _hmt?: Array<any>;  // WARN 用于百度统计？？？？？？？？？？？
  }//
}
