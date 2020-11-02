var Sw_DemoWorker_1 = /** @class */ (function () {
    function Sw_DemoWorker_1() {
    }
    /**
     * 离线缓存
     */
    Sw_DemoWorker_1.offlineCache = function () {
        /**
         * 这个【polyfill】，支持使得在【较低版本的浏览器】下，也可以使用【Cache Storage API】。
         */
        self.importScripts('./serviceworker-cache-polyfill.js');
        /**
         * 需要缓存的【资源路径】
         */
        var urlsToCache = [
            '/',
            '/index.js',
            '/style.css',
            '/favicon.ico',
        ];
        /**
         * CacheStorage的名字。
         * 				1.类似于【DB数据库】的数据库名。
         */
        var CACHE_NAME = 'counterxing';
        /**
         * 在【download】之后，进行【install安装】。
         * 				1.安装阶段，需要【缓存】一些，我们预先声明的【静态资源】。
         */
        self.addEventListener('install', function (event) {
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
            caches.open(CACHE_NAME).then(function (cache) {
                return cache.addAll(urlsToCache);
            });
        });
        /**
         * 页面的【所有网络请求】，都会通过【fetch】事件，触发。
         * 				1.通过【caches.match】，尝试从【Cache】中，查找缓存。
         * 				2.如果缓存命中，则直接返回【缓存中的 response】。
         * 				3.否则，创建一个【真实的 网络请求】。
         */
        self.addEventListener('fetch', function (event) {
            /**
             * 重新指定【返回内容】
             */
            event.respondWith(
            /**
             * 匹配特定请求，并予以【拦截修改】。
             */
            caches.match(event.request).then(function (response) {
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
            }));
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
        self.addEventListener('activate', function (event) {
            var cacheWhiteList = [CACHE_NAME];
            event.waitUntil(
            /**
             * 遍历Cache的 键key。
             */
            caches.keys().then(function (cacheNames) {
                return Promise.all(
                /**
                 * 如果不是【Cache白名单】中，则清除【该条 Cache条目】。
                 * 				1.白名单上面的内容 的【Cache】，是不被淘汰的
                 */
                cacheNames.map(function (cacheName) {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                    else {
                        return;
                    }
                }));
            }));
        });
    };
    /**
     * PWA
     */
    Sw_DemoWorker_1.pwa = function () {
    };
    /**
     * 消息推送
     */
    Sw_DemoWorker_1.pushNotification = function () {
        /**
         * 在【点击Notification】时触发
         */
        self.addEventListener('notificationclick', function (event) {
            /**
             * 处理点击通知后，的操作
             * 				1.关闭当前【通知弹窗】
             * 				2.打开新窗口
             */
            event.notification.close();
            // 是否，需要检查【已打开页面】，以进行【获得焦点】。
            var needFocusPre = false;
            if (needFocusPre) {
                var urlToOpen_1 = self.location.origin + '/index.html'; // 源域名下的【index.html】文件
                var promiseChain = self.clients.matchAll({
                    type: 'window',
                    includeUncontrolled: true,
                }).then(function (windowClients) {
                    var matchingClient;
                    // 查找，是否目标页面，已在浏览器中打开
                    windowClients.find(function (windowClient) {
                        if (windowClient.url === urlToOpen_1) {
                            matchingClient = windowClient; // 找到，已打开的条目。
                            return true; // WARN 在此处，中断循环
                        }
                        return false;
                    });
                    if (matchingClient) {
                        return matchingClient.focus(); // 已打开页面，获得焦点
                    }
                    else {
                        return self.clients.openWindow(urlToOpen_1); // 打开新窗口
                    }
                });
                event.waitUntil(promiseChain);
            }
            else {
                event.waitUntil(
                // 在新窗口，打开页面
                self.clients.openWindow('https://google.com'));
            }
        });
        /**
         * 手动触发【Notification】
         */
        self.registration.showNotification('您有新消息', {
            body: 'Hello Service Worker',
            icon: '/favicon.ico',
        });
        /**
         * 处理【消息推送】
         */
        self.addEventListener('push', function (event) {
            // 是否：当【已经Focus】时，不再【显示通知】。
            var notShowWhenFocus = true;
            // 是否：出现【多条消息】时，合并消息。
            var needCombineMultiple = true;
            /**
             * 建议一个判断链。
             * 				1.判断，是否需要【显示通知】。
             */
            var promiseChain = self.clients.matchAll({
                type: 'window',
                includeUncontrolled: true,
            }).then(function (windowClients) {
                var mustShowNotification = true;
                windowClients.find(function (windowClient) {
                    if (windowClient.focused) {
                        if (notShowWhenFocus) {
                            mustShowNotification = false; // 当有特定需要时，对于【已经Focus】的页面，我们不再【显示通知】。
                        }
                        return true; // WARN 在此处，中断循环
                    }
                    return false;
                });
                return mustShowNotification; // 得到【是否需要弹出通知】的判断标记位。
            }).then(function (mustShowNotification) {
                if (mustShowNotification) { // 判断，是否需要【弹出通知】
                    return self.registration.getNotifications().then(function (notifications) {
                        var _a, _b;
                        // 标题
                        var title = ((_a = event.data) === null || _a === void 0 ? void 0 : _a.text()) || '未取到标题';
                        var options = {
                            // body: event.data?.text(),
                            icon: '/favicon.ico',
                            badge: '/favicon.ico',
                        };
                        var len = notifications.length;
                        if (needCombineMultiple && (len > 0)) { // 多条消息，合并
                            options.body = "\u60A8\u6709" + len + "\u6761\u65B0\u6D88\u606F\u3002\r\n\r\n" + notifications.map(function (n) {
                                return n.body;
                            }).join('\r\n');
                        }
                        else { // 单条通知
                            options.body = (_b = event.data) === null || _b === void 0 ? void 0 : _b.text();
                        }
                        // 在接收到【推送消息】后，在这一步，才真正【显示消息推送】。
                        return self.registration.showNotification(title, options); // 弹出通知
                    });
                }
                else {
                    console.log('用户已经聚焦于，当前页面，不需要推送。');
                    return;
                }
            });
            event.waitUntil(promiseChain);
        });
    };
    return Sw_DemoWorker_1;
}());
export { Sw_DemoWorker_1 };
//# sourceMappingURL=Sw.worker.js.map