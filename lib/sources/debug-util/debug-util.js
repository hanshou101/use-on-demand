import { __read, __spread } from "tslib";
export var isClient = !(process === null || process === void 0 ? void 0 : process.server); // WARN 此处，兼容【nuxt.js】和【非nuxt.js】环境。
export var xX_LogE;
(function (xX_LogE) {
    xX_LogE["bgTokenAbout"] = "bgTokenAbout";
    xX_LogE["KlinePerformance"] = "KlinePerformance";
    xX_LogE["KlineCycleLife"] = "KlineCycleLife";
    xX_LogE["tradingViewDraw"] = "tradingViewDraw";
    xX_LogE["indexPage"] = "indexPage";
    xX_LogE["baseConfig"] = "baseConfig";
    xX_LogE["axiosBase"] = "axiosBase";
    xX_LogE["storeBase"] = "storeBase";
    xX_LogE["axiosWatcher"] = "axiosWatcher";
    xX_LogE["qrcodeCp"] = "qrcodeCp";
    xX_LogE["cookieUtil"] = "cookieUtil";
    xX_LogE["pluginBxUi"] = "pluginBxUi";
    xX_LogE["wasm"] = "wasm";
    xX_LogE["BgNavHeader"] = "BgNavHeader";
    xX_LogE["createContractAccount"] = "createContractAccount";
    xX_LogE["positLine"] = "positLine";
    xX_LogE["positCp"] = "positCp";
    xX_LogE["leverageInfo"] = "leverageInfo";
    xX_LogE["chatroom"] = "chatroom";
    xX_LogE["directive"] = "directive";
    xX_LogE["directiveDrag"] = "directiveDrag";
    xX_LogE["contractArea"] = "contractArea";
    xX_LogE["transferWindow"] = "transferWindow";
    xX_LogE["loadScript"] = "loadScript";
    xX_LogE["sentry"] = "sentry";
    xX_LogE["decorator"] = "decorator";
    xX_LogE["versionCheck"] = "versionCheck";
    xX_LogE["wClient_Side"] = "wClient_Side";
    xX_LogE["wWorker_Side"] = "wWorker_Side";
})(xX_LogE || (xX_LogE = {}));
/**
 * console日志工具
 */
var xX_DebugU = /** @class */ (function () {
    function xX_DebugU() {
    }
    xX_DebugU.l = function (logEnum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.allowKeys.includes(logEnum)) {
            // console.log(`%c${logEnum} // ${args}%c 123`, 'background: #f33; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff', 'background: #3f3; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff');
            console.log.apply(console, __spread([logEnum, this.separator], args));
        }
    }; //
    xX_DebugU.e = function (logEnum) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.allowKeys.includes(logEnum)) {
            console.error.apply(console, __spread([logEnum, this.separator], args));
        }
    }; //
    xX_DebugU.pic = function (logEnum, imgUrl) {
        if (imgUrl === void 0) { imgUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'; }
        console.log('%c ', "\n        padding           :50px 300px;\n        line-height       :100px;\n        background-size   :contain;\n        background-repeat :no-repeat;\n        background-image:url(" + imgUrl + ")\n    ");
    };
    xX_DebugU.prototype.realLog = function (message) {
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
    xX_DebugU.separator = '//';
    xX_DebugU.allowKeys = [
        // xX_LogE.positLine,
        xX_LogE.tradingViewDraw,
        xX_LogE.chatroom,
        xX_LogE.transferWindow,
        xX_LogE.loadScript,
        // xX_LogE.axiosBase,
        xX_LogE.sentry,
        // xX_LogE.KlineCycleLife,
        //
        // xX_LogE.decorator,
        // xX_LogE.versionCheck,
        xX_LogE.wClient_Side,
        xX_LogE.wWorker_Side,
    ];
    return xX_DebugU;
}());
export { xX_DebugU };
//# sourceMappingURL=debug-util.js.map