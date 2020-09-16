import { __awaiter, __generator } from "tslib";
var xX_Vue_Helper = /** @class */ (function () {
    function xX_Vue_Helper() {
    }
    /**
     * TIP 远程加载【在线资源的Vue组件】。
     *        示例：
     *                const MyComponent = () => externalComponent('http://localhost:8200/MyComponent/MyComponent.c9c0abb8e999d0e5654e.umd.min.js');
     */
    xX_Vue_Helper.externalComponent = function (url) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var name, _window;
            return __generator(this, function (_b) {
                name = (_a = url.split("/").reverse()[0].match(/^(.*?)\.umd/)) === null || _a === void 0 ? void 0 : _a[1];
                _window = window;
                if (_window[name])
                    return [2 /*return*/, _window[name]];
                _window[name] = new Promise(function (resolve, reject) {
                    var script = document.createElement("script");
                    script.async = true;
                    script.addEventListener("load", function () {
                        resolve(_window[name]);
                    });
                    script.addEventListener("error", function () {
                        reject(new Error("Error loading " + url));
                    });
                    script.src = url;
                    document.head.appendChild(script);
                });
                return [2 /*return*/, _window[name]];
            });
        });
    };
    return xX_Vue_Helper;
}());
export { xX_Vue_Helper };
//# sourceMappingURL=Vue_Helper.js.map