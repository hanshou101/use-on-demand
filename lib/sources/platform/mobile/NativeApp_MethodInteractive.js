import { __read, __spread } from "tslib";
var BrowserChecker = /** @class */ (function () {
    function BrowserChecker() {
    }
    BrowserChecker.getBrowserInfo = function () {
        // 取得浏览器的userAgent字符串
        var userAgent = navigator.userAgent;
        // 判断是否【Opera】浏览器
        var isOpera = userAgent.indexOf('Opera') > -1;
        // 判断是否【IE】浏览器
        var isIE = ((userAgent.indexOf('compatible') > -1) && userAgent.indexOf('MSIE') > -1 && !isOpera) || userAgent.indexOf('Trident') > -1;
        // 判断是否IE的【Edge】浏览器
        var isEdge = userAgent.indexOf('AppleWebKit') > -1 && userAgent.indexOf('Edge') > -1 && !isIE;
        // 判断是否【Firefox】浏览器
        var isFireFox = userAgent.indexOf('Firefox') > -1;
        // 判断是否【Safari】浏览器
        var isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1;
        // 判断【Chrome】浏览器
        var isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1;
        // 判断【QQ】浏览器
        var qqMatch = userAgent.match(/\sQQ/i);
        // FIXME 此处，感觉是一个经典错误
        // qq     : userAgent.match(/\sQQ/i) == ' qq', //是否QQ
        var isQQ = //@ts-ignore
         qqMatch == ' qq'
            || (qqMatch === null || qqMatch === void 0 ? void 0 : qqMatch.find(function (str) {
                return str /*.trim()*/.toLocaleLowerCase().includes(' qq'); // 查看，是否包含了【空格QQ】字段。
            }));
        var obj = {
            // 浏览器检查
            isChrome: isChrome,
            isFireFox: isFireFox,
            isSafari: isSafari,
            isOpera: isOpera,
            isEdge: isEdge,
            isIE: isIE,
            // 设备平台检查
            is_mobile: !!userAgent.match(/AppleWebKit.*Mobile.*/),
            is_iOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            is_Android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,
            is_iPhone: userAgent.indexOf('iPhone') > -1,
            is_iPad: userAgent.indexOf('iPad') > -1,
            is_webApp: userAgent.indexOf('Safari') == -1,
            is_weixin: userAgent.indexOf('MicroMessenger') > -1,
            is_qq: isQQ,
            ieVersion: undefined,
        };
        if (isIE) {
            var reIE = new RegExp('MSIE (\\d+\\.\\d+);'); // 重新检测一次IE。
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp['$1']);
            obj.ieVersion = fIEVersion;
            // 如果是【IE 11】的话，那么再检测一次版本。
            if (userAgent.indexOf('Trident') > -1 && /rv:(\w+)/.test(userAgent)) {
                obj.ieVersion = RegExp.$1;
            }
        }
        return obj;
    };
    return BrowserChecker;
}());
var xX_NativeApp_MethodInteractive = /** @class */ (function () {
    function xX_NativeApp_MethodInteractive() {
    }
    xX_NativeApp_MethodInteractive.invokeNativeMethod = function (methodName) {
        var params = []; // 一组参数
        for (var _i = 1 // 一组参数
        ; _i < arguments.length // 一组参数
        ; _i++ // 一组参数
        ) {
            params[_i - 1] = arguments[_i]; // 一组参数
        }
        var browserInfo = BrowserChecker.getBrowserInfo();
        var that = this;
        if (browserInfo.is_iOS) { // TIP IOS平台
            // 如果存在【webkit】的调用器。（已经加载完成）
            if (window.webkit) {
                return this.invoke_iosFn.apply(this, __spread([methodName], params));
            }
            else {
                return new Promise(function (resolve, reject) {
                    var count = 0;
                    var timer = setInterval(function () {
                        count++;
                        if (!window.webkit && count >= 60) { // 如果失败了太多次数后，仍未加载。
                            clearInterval(timer);
                            reject('尝试了很多次后，webkit仍未加载成功'); // 返回报错。
                        }
                        if (window.webkit) { // 如果已经加载完成
                            clearInterval(timer);
                            // 返回成功。
                            resolve(that.invoke_iosFn.apply(that, __spread([methodName], params)));
                        }
                        else {
                            console.error('window.webkit还没初始化');
                        }
                    }, 100);
                }).catch(function (err) {
                    console.error(err);
                });
            }
        }
        else { // TIP Android平台
            console.error('调安卓方法了');
            return new Promise(function (resolve) {
                var _a;
                if (!window.android) {
                    throw new Error('window.android不存在！！！');
                }
                var res;
                if (params && params.length > 0) { // 有参数
                    res = (_a = window.android)[methodName].apply(_a, __spread(params));
                }
                else { // 无参数
                    res = window.android[methodName]();
                }
                // 将返回的【字符串形式】，转化为真正的数据。
                var data = (new Function('return ' + res))();
                resolve(data); // 成功返回
            }).catch(function (err) {
                console.error(err);
            });
        }
    };
    xX_NativeApp_MethodInteractive.invoke_iosFn = function (methodName) {
        var params = []; // 一组参数
        for (var _i = 1 // 一组参数
        ; _i < arguments.length // 一组参数
        ; _i++ // 一组参数
        ) {
            params[_i - 1] = arguments[_i]; // 一组参数
        }
        /**
         * 1.此处，用于异步接受【iOS】传回的处理结果。
         * 				1.iOS很多时候，无法做到【同步调用返回】。
         * 				2.所以，我们先向【iOS】的【APP原生A方法】，发送执行请求。
         * 				3.然后，我们在【等待结果返回】之前，在【window】上挂载一个【同名Web端A方法】。
         * 				4.当【iOS】端，处理完毕后，将调用【Web端A方法】，来实现向【Web端】传送数据。
         *
         * 2.综上所述
         * 				1.web端调用【APP原生A方法】————————APP接收，处理完毕，调用【Web端A方法】，来返回数据。
         */
        var asyncResult_promise = new Promise(function (resolve) {
            // 此处名字不重要，但要保证和【APP原生A方法】同名。形成一种规范。
            window[methodName] = function (res) {
                resolve(res);
            };
        });
        var obj = {
            name: methodName,
            params: params && params.length > 0 ? (params.join(this._paramSeparator)) : '',
        };
        try {
            // 异步执行任务
            var timer_1 = setTimeout(function () {
                // 清除定时器，释放资源。
                clearTimeout(timer_1);
                if (!window.webkit) {
                    throw new Error('window.webkit不存在！！！');
                }
                /**
                 * 向【iOS端】，指定的方法，发送消息。
                 * 				1.方法名
                 * 				2.参数拼接成的字符串
                 */
                window.webkit.messageHandlers[methodName].postMessage(JSON.stringify(obj));
            }, 0);
        }
        catch (e) {
            console.error(methodName, e); // 失败的情况，一般是【方法尚未挂载】。
        }
        return asyncResult_promise; // WARN 此处，不再直接返回给【invokeNativeMethod】方法。而是包了一层。
    };
    xX_NativeApp_MethodInteractive._paramSeparator = ',';
    return xX_NativeApp_MethodInteractive;
}());
export { xX_NativeApp_MethodInteractive };
//# sourceMappingURL=NativeApp_MethodInteractive.js.map