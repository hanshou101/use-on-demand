import { __read, __spread } from "tslib";
export var isClient = !(process === null || process === void 0 ? void 0 : process.server); // WARN 此处，兼容【nuxt.js】和【非nuxt.js】环境。
export var LogE;
(function (LogE) {
    LogE["bgTokenAbout"] = "bgTokenAbout";
    LogE["KlinePerformance"] = "KlinePerformance";
    LogE["KlineCycleLife"] = "KlineCycleLife";
    LogE["tradingViewDraw"] = "tradingViewDraw";
    LogE["indexPage"] = "indexPage";
    LogE["baseConfig"] = "baseConfig";
    LogE["axiosBase"] = "axiosBase";
    LogE["storeBase"] = "storeBase";
    LogE["axiosWatcher"] = "axiosWatcher";
    LogE["qrcodeCp"] = "qrcodeCp";
    LogE["cookieUtil"] = "cookieUtil";
    LogE["pluginBxUi"] = "pluginBxUi";
    LogE["wasm"] = "wasm";
    LogE["BgNavHeader"] = "BgNavHeader";
    LogE["createContractAccount"] = "createContractAccount";
    LogE["positLine"] = "positLine";
    LogE["positCp"] = "positCp";
    LogE["leverageInfo"] = "leverageInfo";
    LogE["chatroom"] = "chatroom";
    LogE["directive"] = "directive";
    LogE["directiveDrag"] = "directiveDrag";
    LogE["contractArea"] = "contractArea";
    LogE["transferWindow"] = "transferWindow";
    LogE["loadScript"] = "loadScript";
    LogE["sentry"] = "sentry";
    LogE["decorator"] = "decorator";
    LogE["versionCheck"] = "versionCheck";
})(LogE || (LogE = {}));
/**
 * console日志工具
 */
var DebugU = /** @class */ (function () {
    function DebugU() {
    }
    DebugU.l = function (logEnum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.allowKeys.includes(logEnum)) {
            // console.log(`%c${logEnum} // ${args}%c 123`, 'background: #f33; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff', 'background: #3f3; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff');
            console.log.apply(console, __spread([logEnum, this.separator], args));
        }
    }; //
    DebugU.e = function (logEnum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.allowKeys.includes(logEnum)) {
            console.error.apply(console, __spread([logEnum, this.separator], args));
        }
    }; //
    DebugU.pic = function (logEnum, imgUrl) {
        if (imgUrl === void 0) { imgUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'; }
        console.log('%c ', "\n        padding           :50px 300px;\n        line-height       :100px;\n        background-size   :contain;\n        background-repeat :no-repeat;\n        background-image:url(" + imgUrl + ")\n    ");
    };
    DebugU.prototype.realLog = function (message) {
        var optionalParams = []; // WHY 此处，【optionalParams】始终为一个长度为1的数组？  这里面唯一的子数组，才是真正盛放参数的数组？
        for (var _i = 1 // WHY 此处，【optionalParams】始终为一个长度为1的数组？  这里面唯一的子数组，才是真正盛放参数的数组？
        ; _i < arguments.length // WHY 此处，【optionalParams】始终为一个长度为1的数组？  这里面唯一的子数组，才是真正盛放参数的数组？
        ; _i++ // WHY 此处，【optionalParams】始终为一个长度为1的数组？  这里面唯一的子数组，才是真正盛放参数的数组？
        ) {
            optionalParams[_i - 1] = arguments[_i]; // WHY 此处，【optionalParams】始终为一个长度为1的数组？  这里面唯一的子数组，才是真正盛放参数的数组？
        }
        console.log("\u3010\u7279\u522B\u6CE8\u610F\u3011JSON\u683C\u5F0F\u4E0D\u4F1A\u5305\u62EC\u51FD\u6570\u3001\u6B63\u5219\u3001Date\u5BF9\u8C61\u3002");
        var trueRestParams = optionalParams[0];
        if (trueRestParams.length === 0) {
            console.log(JSON.parse(JSON.stringify(message)));
        }
        else {
            console.log(JSON.parse(JSON.stringify(message)), JSON.parse(JSON.stringify(optionalParams))[0][0]);
        }
    };
    DebugU.separator = '//';
    DebugU.allowKeys = [
        // LogE.positLine,
        LogE.tradingViewDraw,
        LogE.chatroom,
        LogE.transferWindow,
        LogE.loadScript,
        // LogE.axiosBase,
        LogE.sentry,
    ];
    return DebugU;
}());
export { DebugU };
//# sourceMappingURL=debug-util.js.map