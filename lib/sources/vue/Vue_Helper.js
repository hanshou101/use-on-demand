export class Vue_Helper {
    /**
     * TIP 远程加载【在线资源的Vue组件】。
     *        示例：
     *                const MyComponent = () => externalComponent('http://localhost:8200/MyComponent/MyComponent.c9c0abb8e999d0e5654e.umd.min.js');
     */
    static async externalComponent(url) {
        var _a;
        const name = (_a = url.split("/").reverse()[0].match(/^(.*?)\.umd/)) === null || _a === void 0 ? void 0 : _a[1];
        const _window = window;
        if (_window[name])
            return _window[name];
        _window[name] = new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.async = true;
            script.addEventListener("load", () => {
                resolve(_window[name]);
            });
            script.addEventListener("error", () => {
                reject(new Error(`Error loading ${url}`));
            });
            script.src = url;
            document.head.appendChild(script);
        });
        return _window[name];
    }
}
//# sourceMappingURL=Vue_Helper.js.map