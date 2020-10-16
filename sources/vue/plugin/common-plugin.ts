enum CssE {
	vViewer = 'vViewer',
}

export class xX_CPlugin_Helper {
	private static cssLoadStatus = {
		[CssE.vViewer]: false,
	};

	/**
	 * 初始化【v-viewer】，可拖动、放大的对话框。
	 */
	public static init_vViewer(vue: VueConstructor_Type) {
		const cssE = CssE.vViewer;
		if (!this.cssLoadStatus[cssE]) {		// 若未加载过CSS
			/**
			 * 1.导入CSS
			 * 				1.【v-viewer】库，是基于【viewerjs】库的。
			 * 			  2.所以，我们引入原库的CSS。
			 */
			require('viewerjs/dist/viewer.css');
			this.cssLoadStatus[cssE] = true; 	// 标记【已加载】
		}
		const Viewer = require('v-viewer').default;     // 标签主体。
		vue.use(Viewer);                         // 导入到Vue全局。（从此，可以使用<viewer>标签，来包裹<img>标签）
	}
}
