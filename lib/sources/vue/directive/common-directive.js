import { __assign } from "tslib";
var CDirective_Helper = /** @class */ (function () {
    function CDirective_Helper() {
    }
    /**
     * 图片懒加载
     */
    CDirective_Helper.initImgLazyLoad = function (vue, cfg) {
        return import('./img-lazyLoad/img-lazyLoad-d').then(function (_a) {
            var ImgLazyLoad_Directive = _a.ImgLazyLoad_Directive;
            var combineCfg = __assign({ 
                // 【默认】替代图
                placeholderImg: ImgLazyLoad_Directive.__defaultCfg.pxTransparentImg, 
                // 【默认】指令ID
                directiveId: ImgLazyLoad_Directive.__defaultCfg.directiveId }, cfg);
            // 绑定
            var _directive = ImgLazyLoad_Directive.getDirective(combineCfg.placeholderImg);
            vue.directive(combineCfg.directiveId, _directive);
        });
    };
    /**
     * 【Clipboard】复制粘贴
     */
    CDirective_Helper.initClipboardCopyPaste = function (vue, directiveId) {
        if (directiveId === void 0) { directiveId = 'clipboard'; }
        // 动态导入，按需加载。
        return import('./clipboard/clipboard-d').then(function (_a) {
            var ClipboardD = _a.ClipboardD;
            vue.directive(directiveId, ClipboardD);
        });
    };
    /**
     * 【Admin权限点】授权检测
     */
    CDirective_Helper.initAdminPermission = function (vue, roles, directiveId) {
        if (directiveId === void 0) { directiveId = 'permission'; }
        // 动态导入，按需加载
        return import('./admin-permission/admin-permission-d').then(function (_a) {
            var getAdminPermissionD = _a.getAdminPermissionD;
            vue.directive(directiveId, getAdminPermissionD(roles));
        });
    };
    /**
     * 【水波纹】点击效果
     */
    CDirective_Helper.initClickWave = function (vue, directiveId) {
        if (directiveId === void 0) { directiveId = 'click-wave'; }
        return import('./click-wave/click-wave').then(function (_a) {
            var getClickWaveD = _a.getClickWaveD;
            vue.directive(directiveId, getClickWaveD());
        });
    };
    return CDirective_Helper;
}());
export { CDirective_Helper };
//# sourceMappingURL=common-directive.js.map