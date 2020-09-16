var xX_WasmHelper = /** @class */ (function () {
    function xX_WasmHelper() {
    }
    xX_WasmHelper.mdnInit = function (url) {
        if (url === void 0) { url = '/wasm/program.wasm'; }
        return new Promise(function (resolve) {
            // WARN 此处，切记，拉取的是【static文件夹】下面的网络静态资源。
            WebAssembly.instantiateStreaming(fetch(url)).then(function (obj) {
                var util = obj.instance.exports;
                resolve(util);
            });
        });
    };
    xX_WasmHelper.test = function (util) {
        for (var i = 0; i < 1000; i++) {
            [
                util.plus(0.1, 0.2),
                util.minus(1.1, 1),
                util.times(0.11, 1.1),
                util.divide(0.3, 0.2),
            ].forEach(function (item) {
                console.log(item);
            });
        }
    };
    return xX_WasmHelper;
}());
export { xX_WasmHelper };
//# sourceMappingURL=WasmHelper.js.map