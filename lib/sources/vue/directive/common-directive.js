import { __assign } from "tslib";
var xX_CDirective_Helper = /** @class */ (function () {
    function xX_CDirective_Helper() {
    }
    /**
     * 图片懒加载
     */
    xX_CDirective_Helper.initImgLazyLoad = function (vue, cfg) {
        return import('./img-lazyLoad/img-lazyLoad-d').then(function (_a) {
            var xX_ImgLazyLoad_Directive = _a.xX_ImgLazyLoad_Directive;
            var combineCfg = __assign({ 
                // 【默认】替代图
                placeholderImg: xX_ImgLazyLoad_Directive.__defaultCfg.pxTransparentImg, 
                // 【默认】指令ID
                directiveId: xX_ImgLazyLoad_Directive.__defaultCfg.directiveId }, cfg);
            // 绑定
            var _directive = xX_ImgLazyLoad_Directive.getDirective(combineCfg.placeholderImg);
            vue.directive(combineCfg.directiveId, _directive);
        });
    };
    /**
     * 【Clipboard】复制粘贴
     */
    xX_CDirective_Helper.initClipboardCopyPaste = function (vue, directiveId) {
        if (directiveId === void 0) { directiveId = 'clipboard'; }
        // 动态导入，按需加载。
        return import('./clipboard/clipboard-d').then(function (_a) {
            var xX_ClipboardD = _a.xX_ClipboardD;
            vue.directive(directiveId, xX_ClipboardD);
        });
    };
    /**
     * 【Admin权限点】授权检测
     */
    xX_CDirective_Helper.initAdminPermission = function (vue, roles, directiveId) {
        if (directiveId === void 0) { directiveId = 'permission'; }
        // 动态导入，按需加载
        return import('./admin-permission/admin-permission-d').then(function (_a) {
            var xX_getAdminPermissionD = _a.xX_getAdminPermissionD;
            vue.directive(directiveId, xX_getAdminPermissionD(roles));
        });
    };
    /**
     * 【水波纹】点击效果
     */
    xX_CDirective_Helper.initClickWave = function (vue, directiveId) {
        if (directiveId === void 0) { directiveId = 'click-wave'; }
        return import('./click-wave/click-wave').then(function (_a) {
            var xX_getClickWaveD = _a.xX_getClickWaveD;
            vue.directive(directiveId, xX_getClickWaveD());
        });
    };
    return xX_CDirective_Helper;
}());
export { xX_CDirective_Helper };
//# sourceMappingURL=common-directive.js.map