"use strict";
exports.__esModule = true;
exports.xX_init_LostErrorSentry = void 0;
/**
 * 使用该工具捕捉，任何阶段的浏览器错误。
 *        1.JS错误、DOM错误.
 *        2.弥补【Sentry】常规加载时，【体积较大】、【加载阻塞】，的缺陷。
 */
var LostError_Util = /** @class */ (function () {
    function LostError_Util() {
        this._errArr = [];
    }
    LostError_Util.prototype.logLostError = function () {
        try {
            console.log('LostError_Util', '注册监听成功');
            this.log_windowOnError();
            this.log_documentOnError();
            this.log_windowAddEvent_error();
            this.log_windowAddEvent_unhandledrejection();
            // this.log_consoleError(); // WARN 暂时隐藏【console.error】的捕捉。
        }
        catch (e) { // 捕捉，初始化过程中，可能的报错。
            this._errArr.push(e);
        }
    };
    LostError_Util.prototype.test = function () {
        // @ts-ignore
        // asdasd();
        //
        Promise.reject(1);
        //
        var imgNode = document.createElement('img');
        imgNode.src = '123.jpg';
        document.body.appendChild(imgNode);
        //
        var sNode = document.createElement('script');
        sNode.src = '123.jpg';
        document.body.appendChild(sNode);
    };
    LostError_Util.prototype.uploadError = function () {
        console.log('上传错误');
        this._errArr.forEach(function (err) {
            console.log('错误情况', JSON.stringify(err));
            window.Sentry.captureException(new Error(JSON.stringify(err)));
        });
        this._errArr = []; // 清空数组
    };
    //
    //
    //
    //
    //
    // noinspection JSMethodCanBeStatic
    LostError_Util.prototype._handleDocumentOnErrorEvent = function (_evt, type) {
        var entry = {
            type: type,
            url: _evt.filename,
            line: _evt.lineno,
            col: _evt.colno,
            evtRawStr: JSON.stringify(_evt)
        };
        return entry;
    };
    // noinspection JSMethodCanBeStatic
    LostError_Util.prototype._handleWindowAddEvent = function (_evt, type) {
        var _a, _b, _c;
        var entry = {
            type: type,
            url: _evt.filename,
            line: _evt.lineno,
            col: _evt.colno,
            stackMsg: JSON.stringify({
                error: {
                    message: (_a = _evt.error) === null || _a === void 0 ? void 0 : _a.message,
                    stack: (_b = _evt.error) === null || _b === void 0 ? void 0 : _b.stack
                },
                message: _evt.message
            }),
            evtRawStr: JSON.stringify(_evt)
        };
        var target = _evt === null || _evt === void 0 ? void 0 : _evt.target;
        var lNodeName = (_c = target === null || target === void 0 ? void 0 : target.nodeName) === null || _c === void 0 ? void 0 : _c.toLowerCase();
        if (lNodeName == 'img' || lNodeName == 'script') {
            var srcUrl = target.src;
            entry.extra = lNodeName + "  " + (target === null || target === void 0 ? void 0 : target.className) + " " + srcUrl + " " + _evt.type + " " + (target === null || target === void 0 ? void 0 : target.outerHTML);
        }
        return entry;
    };
    LostError_Util.prototype.log_windowOnError = function () {
        var that = this;
        // 全局错误捕捉
        var errHandler = function (event, source, lineno, colno, error) {
            // 异步方式，避免阻塞
            setTimeout(function () {
                // 不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
                var __col = colno || (window.event && window.event.errorCharacter) || 0;
                var entry = {
                    type: 'window-onerror',
                    url: source || '未知',
                    line: lineno || -0.0001234,
                    col: __col,
                    stackMsg: undefined,
                    evtRawStr: JSON.stringify(event)
                };
                // 添加【报错堆栈信息】
                if (error && error.stack) {
                    // 如果浏览器有堆栈信息，直接使用
                    entry.stackMsg = error.stack.toString();
                    // @ts-ignore
                }
                else if (arguments.callee) {
                    // 尝试通过callee拿堆栈信息
                    var ext = [];
                    // @ts-ignore
                    var fn = arguments.callee.caller;
                    var floor = 3; // 这里只拿三层堆栈信息
                    while (fn && (--floor > 0)) {
                        ext.push(fn.toString());
                        if (fn === fn.caller) {
                            break; // 如果有环
                        }
                        fn = fn.caller;
                    }
                    // noinspection UnnecessaryLocalVariableJS
                    var _ext_str = ext.join(',');
                    entry.stackMsg = _ext_str;
                }
                that._errArr.push(entry);
            }, 0);
            return false; // true 错误不会输出到console  ；  false 错误输出到console
        };
        window.onerror = errHandler;
    };
    /**
     * FIXME 这段，只是在网上道听途说！！！
     */
    LostError_Util.prototype.log_documentOnError = function () {
        var that = this;
        document.onerror = function (event) {
            // 异步方式，避免阻塞
            setTimeout(function () {
                console.error('检查此处！！！！！！');
                console.error('检查此处！！！！！！');
                console.error('检查此处！！！！！！');
                console.error('检查此处！！！！！！');
                console.error('检查此处！！！！！！');
                console.error('检查此处！！！！！！');
                var _evt = event; // FIXME 此处，【不见得就一定是 ErrorEvent 】！！！
                var entry = that._handleDocumentOnErrorEvent(_evt, 'document-onerror');
                that._errArr.push(entry);
            }, 0);
        };
    };
    LostError_Util.prototype.log_windowAddEvent_error = function () {
        var that = this;
        window.addEventListener('error', function (evt) {
            // 异步方式，避免阻塞
            setTimeout(function () {
                console.log('错误', evt);
                var entry = that._handleWindowAddEvent(evt, 'window-add-event-error');
                that._errArr.push(entry);
            }, 0);
        }, true);
    };
    LostError_Util.prototype.log_windowAddEvent_unhandledrejection = function () {
        var that = this;
        window.addEventListener('unhandledrejection', function (evt) {
            // 异步方式，避免阻塞
            setTimeout(function () {
                console.log('错误', evt);
                var entry = {
                    type: 'window-add-event-unhandledrejection',
                    url: '未知',
                    line: -0.0141632,
                    col: -0.0141632,
                    stackMsg: "\u6808\u4FE1\u606F: " + evt.reason,
                    evtRawStr: JSON.stringify(evt)
                };
                that._errArr.push(entry);
            }, 0);
        });
    };
    LostError_Util.prototype.log_consoleError = function () {
        /**
         * 部分情况下，需要捕捉 console.error 相关的信息。
         */
        console.error = (function (origin) {
            return function (errorlog) {
                function handler() {
                } //
                handler(); // 基于业务的日志记录及数据报错
                origin.call(console, errorlog);
            };
        })(console.error);
    };
    return LostError_Util;
}());
function xX_init_LostErrorSentry(cfg) {
    var lostErrorUtil = new LostError_Util();
    lostErrorUtil.logLostError();
    window.$abc_errorLog = lostErrorUtil;
    /**
     * 思路：
     *        1.过10秒后，检测，是否已经初始化
     *        2.未初始化：
     *                1.说明出错，发送错误
     *        3.已初始化：
     *                1.说明正常，那么，是否需要【清除监听】？
     *                        1.可以清除。但是没有太多必要
     */
    var isDisasterOccurred = false;
    var intervalId = setInterval(function () {
        var _a;
        if (!isDisasterOccurred && window.Sentry) {
            // 正常，则清除定时器
            clearInterval(intervalId);
            lostErrorUtil.uploadError();
        }
        else {
            isDisasterOccurred = true; // 灾害已经发生。
            if (!window.Sentry) {
                var scriptNode = document.createElement('script');
                scriptNode.crossOrigin = cfg.crossOrigin;
                scriptNode.onload = function (e) {
                    console.log('备灾脚本', '远程脚本', '加载成功');
                    window.Sentry.init({
                        dsn: cfg.dns,
                        environment: cfg.envName
                    });
                    lostErrorUtil.uploadError();
                };
                scriptNode.src = cfg.pureJsUrl;
                var firstS = document.getElementsByTagName('script')[0];
                (_a = firstS === null || firstS === void 0 ? void 0 : firstS.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(scriptNode, firstS); // 将自己，放在最前面。（？？？有必要吗？会导致卡顿吗？）
            }
            else {
                lostErrorUtil.uploadError();
            }
        }
    }, 10000);
    // lostErrorUtil.test();  // TIP 用于【测试用例】。
}
exports.xX_init_LostErrorSentry = xX_init_LostErrorSentry;
