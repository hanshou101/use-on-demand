/**
 * UEditor
 *        1.因【侵入性】较强，所以需要在【public目录】下，加入【静态文件】。
 */
export class xX_Rt_UEditor_Helper {


	public static initUEditor(vue: VueConstructor_Type, apiUrl = '/admin/ueditor/upload') {
		/**
		 * 如果ueditor的serverUrl不是绝对路径，那么ueditor默认不是【外部http请求】，而是获取【自身所在服务器文件】
		 */
		let ueditorServiceUrl: string = `${process.env.VUE_APP_BASE_API + apiUrl}`;
		if (!(/http/.test(ueditorServiceUrl))) {
			const barsUrl: string = location.origin;
			ueditorServiceUrl     = barsUrl + ueditorServiceUrl;
		}
		vue.prototype.$ueditorServiceUrl = ueditorServiceUrl;       // ueditor上传图片路径
		vue.prototype.$getUEditorConfig  = function() {             // ueditor配置
			return {
				UEDITOR_HOME_URL  : '/UEditor/',
				initialFrameHeight: 500,
				autoFloatEnabled  : false, // 不允许固定头部
				zIndex            : 5000,
				serverUrl         : ueditorServiceUrl,
				fontsize          : [10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 54, 58, 60, 64, 68, 70, 74],
			};
		};
		console.log('ueditorServiceUrl', ueditorServiceUrl);
		this.get_VueUeditorWrap().then(_VueUeditorWrap => {
			vue.component('vue-ueditor-wrap', _VueUeditorWrap);
		});
	}


	// TIP——————————————————————————————————

	private static get_VueUeditorWrap() {
		// @ts-ignore
		return import('vue-ueditor-wrap');
	}

}
