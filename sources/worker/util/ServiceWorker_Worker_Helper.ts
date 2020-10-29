// service-worker.js
declare var self: ServiceWorkerGlobalScope;
// declare var this: ServiceWorkerGlobalScope;

export class xX_ServiceWorker_Worker_Helper {

	public static demo() {

		self.addEventListener('install', function(event) {
			console.log('Worker', 'A new Service Worker is installing.');
		});

		self.addEventListener('activate', function(event) {
			console.log('Worker', 'Finally active. Ready to start serving content!');
		});

		/**
		 * 虽然可以在里边为所欲为地写任何js代码，或者也可以什么都不写，
		 * 都不妨碍这是一个Service Worker，但还是举一个微小的例子：
		 */
		self.addEventListener('fetch', function(event) {
			console.log('抓取到【fetch】的信息', event);
			if (/\.png$/.test(event.request.url)) {
				event.respondWith(fetch('/images/支付宝收款码.png'));
			}
		});

	}

}
