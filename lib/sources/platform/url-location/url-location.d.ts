/**
 * 参考资料：https://www.runoob.com/w3cnote/js-get-url-param.html
 */
export declare function getQueryField(key: string, likeQuery?: string): string | undefined;
export declare function getFullQueryObj(): {
    [key: string]: any;
};
/**
 * 【WebView】中，location.replace存在兼容性问题！
 */
export declare function fixbug_locationReplace(url: string): void;
/**
 * 通过【Url+时间戳】，来实现【防止缓存】。
 */
export declare function checkHtmlVersion(): void;
/**
 * 平滑滚到某元素
 *        1.方案A。
 */
export declare function smoothJump(id: string): void;
/**
 * 平滑滚到某元素
 *        1.方案B。
 */
export declare function scrollToSmooth_methodB(element: HTMLElement, to: number, duration: number): void;
/**
 * 在【当前网页的正中心位置】，打开一个新窗口
 *        1.使用场景：
 *                第三方登录，弹出新网页
 */
export declare function openWindow(url: string, // 新窗口网页地址
title: string, // 标题
w: number, h: number): void;
//# sourceMappingURL=url-location.d.ts.map