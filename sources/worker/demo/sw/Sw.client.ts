if ('ServiceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw.js', { scope: '/' })
						 .then(function() {
							 console.log('SW注册成功');
						 })
						 .catch(err => {
							 console.log('SW注册失败');
						 });
	});
} else {
	console.error('当前浏览器，不支持【ServiceWorker】');
}


