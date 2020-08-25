export class CDirective_Helper {
    /**
     * 图片懒加载
     */
    static initImgLazyLoad(vue, cfg) {
        return import('./img-lazyLoad/img-lazyLoad-d').then(({ ImgLazyLoad_Directive }) => {
            const combineCfg = {
                // 【默认】替代图
                placeholderImg: ImgLazyLoad_Directive.__defaultCfg.pxTransparentImg,
                // 【默认】指令ID
                directiveId: ImgLazyLoad_Directive.__defaultCfg.directiveId,
                ...cfg,
            };
            // 绑定
            const _directive = ImgLazyLoad_Directive.getDirective(combineCfg.placeholderImg);
            vue.directive(combineCfg.directiveId, _directive);
        });
    }
    /**
     * 【Clipboard】复制粘贴
     */
    static initClipboardCopyPaste(vue, directiveId = 'clipboard') {
        // 动态导入，按需加载。
        return import('./clipboard/clipboard-d').then(({ ClipboardD }) => {
            vue.directive(directiveId, ClipboardD);
        });
    }
    /**
     * 【Admin权限点】授权检测
     */
    static initAdminPermission(vue, roles, directiveId = 'permission') {
        // 动态导入，按需加载
        return import('./admin-permission/admin-permission-d').then(({ getAdminPermissionD }) => {
            vue.directive(directiveId, getAdminPermissionD(roles));
        });
    }
    /**
     * 【水波纹】点击效果
     */
    static initClickWave(vue, directiveId = 'click-wave') {
        return import('./click-wave/click-wave').then(({ getClickWaveD }) => {
            vue.directive(directiveId, getClickWaveD());
        });
    }
}
//# sourceMappingURL=common-directive.js.map