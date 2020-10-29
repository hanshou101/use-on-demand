export class xX_ServiceWorker_Client_Helper {

	public static demo(
		url = '/worker/demo.js',
	) {
		/**
		 * 不起眼的一行if，除了防止报错之外，也无意间解释了PWA的P：
		 * 如果浏览器不支持Service Worker，那就当什么都没有发生过
		 */
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', function() {
				// 所以Service Worker只是一个挂在navigator对象上的HTML5 API而已
				navigator.serviceWorker.register(url)
								 .then(function(registration) {
									 console.log('我注册成功了666');
								 }, function(err) {
									 console.log('我注册失败了');
								 });
			});
		}
	}

}
