interface LazyLoad_Cfg {
	placeholderImg: string | undefined;
	directiveId: string | undefined;
}

export class xX_CDirective_Helper {

	/**
	 * 图片懒加载
	 */
	public static initImgLazyLoad(
		vue: VueConstructor_Type,
		cfg: LazyLoad_Cfg,          // 默认采取【ImgLazyLoad_Directive.__defaultCfg】中的值。
	) {
		return import('./img-lazyLoad/img-lazyLoad-d').then(({ xX_ImgLazyLoad_Directive }) => {

			const combineCfg: NoUndefinedField<LazyLoad_Cfg> = {
				// 【默认】替代图
				placeholderImg: xX_ImgLazyLoad_Directive.__defaultCfg.pxTransparentImg,
				// 【默认】指令ID
				directiveId   : xX_ImgLazyLoad_Directive.__defaultCfg.directiveId,
				...cfg as any,    // 此处，可能为空
			};

			// 绑定
			const _directive = xX_ImgLazyLoad_Directive.getDirective(combineCfg.placeholderImg);
			vue.directive(combineCfg.directiveId, _directive);
		});
	}

	/**
	 * 【Clipboard】复制粘贴
	 */
	public static initClipboardCopyPaste(
		vue: VueConstructor_Type,
		directiveId = 'clipboard',
	) {
		// 动态导入，按需加载。
		return import('./clipboard/clipboard-d').then(({ xX_ClipboardD }) => {
			vue.directive(directiveId, xX_ClipboardD);
		});
	}

	/**
	 * 【Admin权限点】授权检测
	 */
	public static initAdminPermission(
		vue: VueConstructor_Type,
		roles: Array<string>,
		directiveId = 'permission',
	) {
		// 动态导入，按需加载
		return import('./admin-permission/admin-permission-d').then(({ xX_getAdminPermissionD }) => {
			vue.directive(directiveId, xX_getAdminPermissionD(roles));
		});
	}

	/**
	 * 【水波纹】点击效果
	 */
	public static initClickWave(
		vue: VueConstructor_Type,
		directiveId = 'click-wave',
	) {
		return import('./click-wave/click-wave').then(({ xX_getClickWaveD }) => {
			vue.directive(directiveId, xX_getClickWaveD());
		});
	}

}

