interface LazyLoad_Cfg {
    placeholderImg: string | undefined;
    directiveId: string | undefined;
}
export declare class xX_CDirective_Helper {
    /**
     * 图片懒加载
     */
    static initImgLazyLoad(vue: VueConstructor_Type, cfg: LazyLoad_Cfg): Promise<void>;
    /**
     * 【Clipboard】复制粘贴
     */
    static initClipboardCopyPaste(vue: VueConstructor_Type, directiveId?: string): Promise<void>;
    /**
     * 【Admin权限点】授权检测
     */
    static initAdminPermission(vue: VueConstructor_Type, roles: Array<string>, directiveId?: string): Promise<void>;
    /**
     * 【水波纹】点击效果
     */
    static initClickWave(vue: VueConstructor_Type, directiveId?: string): Promise<void>;
}
export {};
//# sourceMappingURL=common-directive.d.ts.map