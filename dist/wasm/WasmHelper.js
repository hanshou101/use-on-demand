export class WasmHelper {
    static mdnInit(url = '/wasm/program.wasm') {
        return new Promise((resolve) => {
            // WARN 此处，切记，拉取的是【static文件夹】下面的网络静态资源。
            WebAssembly.instantiateStreaming(fetch(url)).then((obj) => {
                const util = obj.instance.exports;
                resolve(util);
            });
        });
    }
    static test(util) {
        for (let i = 0; i < 1000; i++) {
            [
                util.plus(0.1, 0.2),
                util.minus(1.1, 1),
                util.times(0.11, 1.1),
                util.divide(0.3, 0.2),
            ].forEach((item) => {
                console.log(item);
            });
        }
    }
}
//# sourceMappingURL=WasmHelper.js.map