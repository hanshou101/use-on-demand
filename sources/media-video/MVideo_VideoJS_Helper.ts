function getVideoJS() {
	return require('video.js').default;
}

export class xX_MVideo_VideoJS_Helper {
	private static isCssLoaded = false;

	public static initLang_forCp(
		lang: { 'zh-CN': any, 'en': any },
		loadCss: boolean = true,                    // 是否同时加载CSS？
	) {
		console.log('初始化  video.js 库');
		const default_video_zhCN = require('video.js/dist/lang/zh-CN.json');
		const default_video_en   = require('video.js/dist/lang/en.json');

		const VideoJs = getVideoJS();
		// console.log('VideoJs', VideoJs);
		VideoJs.addLanguage('zh-CN', {
			...default_video_zhCN,    // 默认
			...lang['zh-CN'],
		});
		VideoJs.addLanguage('en', {
			...default_video_en,      // 默认
			...lang.en,
		});

		if (loadCss) {
			this.loadCss_forCp();
		}

		return VideoJs;
	}

	public static loadCss_forCp() {
		if (!this.isCssLoaded) {            // 还未加载CSS
			this.isCssLoaded = true;          // 记录【已加载CSS】
			// TIP 初始化【CSS样式】
			require('video.js/dist/video-js.css');
			require('./cp/CustomVideoJS.scss');
		}
	}
}
