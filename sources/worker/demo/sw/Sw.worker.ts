declare var self: ServiceWorkerGlobalScope;
import { xX_AdminHelper } from '../../../admin/admin-helper';

/**
 * 这个【polyfill】，支持使得在【较低版本的浏览器】下，也可以使用【Cache Storage API】。
 */
self.importScripts('./serviceworker-cache-polyfill.js');

/**
 * 需要缓存的【资源路径】
 */
const urlsToCache = [
	'/',
	'/index.js',
	'/style.css',
	'/favicon.ico',
];

/**
 * CacheStorage的名字。
 * 				1.类似于【DB数据库】的数据库名。
 */
const CACHE_NAME = 'counterxing';


/**
 * 在【download】之后，进行【install安装】。
 * 				1.安装阶段，需要【缓存】一些，我们预先声明的【静态资源】。
 */
self.addEventListener('install', function(event) {
	/**
	 * 告知【浏览器】，直接跳过 等待阶段
	 * 				1.淘汰过期的【sw.js】和【Service Worker】脚本。
	 * 				2.直接开始，尝试激活 新的【Service Worker】。
	 */
	self.skipWaiting();
	/**
	 * 打开一个【Cache】。
	 * 				1.打开后，通过【cache.addAll】，尝试缓存  我们预先声明的【静态文件】。
	 */
	caches.open(CACHE_NAME).then(function(cache) {
		return cache.addAll(urlsToCache);
	});
});

/**
 * 页面的【所有网络请求】，都会通过【fetch】事件，触发。
 * 				1.通过【caches.match】，尝试从【Cache】中，查找缓存。
 * 				2.如果缓存命中，则直接返回【缓存中的 response】。
 * 				3.否则，创建一个【真实的 网络请求】。
 */
self.addEventListener('fetch', function(event) {
	/**
	 * 重新指定【返回内容】
	 */
	event.respondWith(
		/**
		 * 匹配特定请求，并予以【拦截修改】。
		 */
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}
			return fetch(event.request);

			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加
			// TODO 此处，你有可能，还要向【Cache Storage】中，添加【额外的新的缓存】（不在列表当中）。可以通过【cache.put】的方法添加

		}),
	);
});


/**
 * 在【install安装】之后，会开始进行【active激活】。
 * 				1.浏览器会尝试，下载【Service Worker】脚本文件。
 * 				2.下载成功后，会与前一次，已缓存的【Service Worker】脚本文件，对比。
 * 				3.如果与前一次【Service Worker】脚本文件，不同，证明【已经有最新更新】，则会触发【active事件】。
 * 				4.完成激活。
 *
 * 尝试，淘汰【旧的 Service Worker】和【旧的 Cache Storage】。
 */
self.addEventListener('activate', function(event) {
	const cacheWhiteList = [CACHE_NAME];

	event.waitUntil(
		/**
		 * 遍历Cache的 键key。
		 */
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				/**
				 * 如果不是【Cache白名单】中，则清除【该条 Cache条目】。
				 * 				1.白名单上面的内容 的【Cache】，是不被淘汰的
				 */
				cacheNames.map(function(cacheName) {
					if (!cacheWhiteList.includes(cacheName)) {
						return caches.delete(cacheName);
					} else {
						return;
					}
				}),
			);
		}),
	);
});



