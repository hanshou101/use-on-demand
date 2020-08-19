// 让parseInt的类型提示，更好用
declare function parseInt(
  value: string | number,     // TIP 经过试验，如果传入number，则会调用number的toString，转化为一个字符串，再运算。
  radix?: number,
): number;

// 让parseFloat的类型提示，更好用
declare function parseFloat(
  value: string | number,     // ??? TIP 经过试验，如果传入number，则会调用number的toString，转化为一个字符串，再运算。
): number;

declare function isNaN(
  number: number | string,    // TIP 经过试验，如果传入【字符串的NaN】，也可以正常识别为true
): boolean;

interface Window {
  attachEvent?(eventName: string, cb: Function): void;  // 兼容性处理：IE，独有方法。
  detachEvent?(eventName: string, cb: Function): void;  // 兼容性处理：IE，独有方法。
}

interface WindowOrWorkerGlobalScope {
  clearInterval(handle?: number | null | undefined): void;    // TIP 此处，增加了【null类型、undefined类型】的传入参数；这个【null、undefined】，并不会导致报错
  clearTimeout(handle?: number | null | undefined): void;     // TIP 此处，增加了【null类型、undefined类型】的传入参数；这个【null、undefined】，并不会导致报错
}

interface HTMLElement {
  webkitRequestFullScreen?(): void;     // Chrome，            独有全屏方法
  mozRequestFullScreen?(): void;        // Mozilla(Firefox)，  独有全屏方法
  msRequestFullscreen?(): void;         // IE，                独有全屏方法

  //
  attachEvent?(eventName: string, cb: Function): void;  // 兼容性处理：IE，独有方法。
  detachEvent?(eventName: string, cb: Function): void;  // 兼容性处理：IE，独有方法。
}

interface Document {
  webkitExitFullscreen?(): void;          // Chrome，            独有 退出全屏方法
  webkitCancelFullScreen?(): void;        // Chrome，            独有 退出全屏方法
  mozCancelFullScreen?(): void;         // Mozilla(Firefox)，  独有 退出全屏方法
  msExitFullscreen?(): void;            // IE，                独有 退出全屏方法
  cancelFullScreen?(): void;            // 其它未知版本，        独有 退出全屏方法
}

interface Storage {
  // localStorage: {
  setItem(key: string, value: string | boolean): void;              //
  // }
}

interface DateConstructor {
  // parse(s: string): number;      // 原本方法
  parse(date: Date): number;        // 增加一条方法
}

interface Navigator {
  userLanguage?: string;
  browserLanguage?: string;
}

interface String {
  toString(radix: number): string;  // 带进制转换
}

interface JSON {
  // parse(text: number): number;
  // parse(text: boolean): boolean;
  // parse(text: null): null;

  // 除string外的类型，怎么进怎么出
  parse<U extends (
    number | boolean | null)>
  (text: U): U;


  // String的方式，比较灵活多样
  parse<Target extends (
    IndexedObj | Array<any>
    | number | boolean | null)>
  (text: string): Target;

  // String的方式，比较灵活多样
  parse<Target extends (
    IndexedObj | Array<any>
    | number | boolean | null)>
  (text: string | null): Target | null;
}


interface NodeRequire {
  /**
   * 【Webpack的专属方法】
   * 它允许您传递要搜索的目录，指示是否也应搜索子目录的标志以及用于匹配文件的正则表达式。
   */
  context(
    directory: string,
    useSubdirectories?: boolean, // 默认值 true,
    regExp?: RegExp,             // 默认值 /^\.\/.*$/,
    mode?: string,               // 默认值 'sync'
  ): WebpackRequireFn_Type;
}

interface WebpackRequireFn_Type {
  (requestFn: Function): string;        // 只是猜测
  resolve(): number;                    // 只是猜测
  keys(): Array<Function>;                   // 只是猜测
  id: number;                           // 只是猜测
}
