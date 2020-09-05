export const isClient = !(process === null || process === void 0 ? void 0 : process.server); // WARN 此处，兼容【nuxt.js】和【非nuxt.js】环境。
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
export class DebugU {
    static l(logEnum, ...args) {
        if (this.allowKeys.includes(logEnum)) {
            // console.log(`%c${logEnum} // ${args}%c 123`, 'background: #f33; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff', 'background: #3f3; font-size: 18px; font-family: monospace; color: #eee; text-shadow:0 0 1px #fff');
            console.log(logEnum, this.separator, ...args);
        }
    } //
    static e(logEnum, ...args) {
        if (this.allowKeys.includes(logEnum)) {
            console.error(logEnum, this.separator, ...args);
        }
    } //
    static pic(logEnum, imgUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png') {
        console.log('%c ', `
        padding           :50px 300px;
        line-height       :100px;
        background-size   :contain;
        background-repeat :no-repeat;
        background-image:url(${imgUrl})
    `);
    }
    realLog(message, ...optionalParams // WHY 此处，【optionalParams】始终为一个长度为1的数组？  这里面唯一的子数组，才是真正盛放参数的数组？
    ) {
        console.log(`【特别注意】JSON格式不会包括函数、正则、Date对象。`);
        const trueRestParams = optionalParams[0];
        if (trueRestParams.length === 0) {
            console.log(JSON.parse(JSON.stringify(message)));
        }
        else {
            console.log(JSON.parse(JSON.stringify(message)), JSON.parse(JSON.stringify(optionalParams))[0][0]);
        }
    }
}
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
//# sourceMappingURL=debug-util.js.map