export class Vue_Helper {
  /**
   * TIP 远程加载【在线资源的Vue组件】。
   *        示例：
   *                const MyComponent = () => externalComponent('http://localhost:8200/MyComponent/MyComponent.c9c0abb8e999d0e5654e.umd.min.js');
   */
  public static async externalComponent(url: string) {
    const name = url.split("/").reverse()[0].match(/^(.*?)\.umd/)?.[1] as string;

    const _window = window as any;

    if (_window[name]) return _window[name];

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
