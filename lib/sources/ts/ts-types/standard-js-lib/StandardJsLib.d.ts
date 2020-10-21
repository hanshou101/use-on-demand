type RawDocument = Document;

// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————
// TIP——————————————————————————————————————————————————————————————————————————

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

interface Window
	// extends ServiceWorkerGlobalScope		// WARN 拓展【ServiceWorker】为【Window】的父类型。
{
	attachEvent?(eventName: string, cb: Function): void;  // 兼容性处理：IE，独有方法。
	detachEvent?(eventName: string, cb: Function): void;  // 兼容性处理：IE，独有方法。
	webkitURL?: {                                         // 有可能存在，也有可能不存在。（仅用于Chrome）
		prototype: URL;
		new(url: string, base?: string | URL): URL;
		createObjectURL(object: any): string;
		revokeObjectURL(url: string): void;
	};
	/*
			Notification?: {
					// 自己手写了一个，构造方法
					new(title: string, options?: any): any
			}
			1.后来发现，官方已有定义，只是未挂载到Window上面
			2.以下，是一个成员变量，名为Notification，然后类型是  lib.dom.d.ts里面的Notification。
	*/
	Notification?: Notification;          // 目前，PC端浏览器，仅IE11不支持，其它都支持；移动端浏览器基本都没有支持。
	FileReader: FileReader;               // 为全局对象，声明一个FileReader的类型。（很多时候，window对象和Global对象，是重合的）
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
	currentStyle?: { [key: string]: string };             // 新增一个，仅属于旧版本IE浏览器的：老旧CSS属性。
}

interface Document {
	webkitExitFullscreen?(): void;          // Chrome，            独有 退出全屏方法
	webkitCancelFullScreen?(): void;        // Chrome，            独有 退出全屏方法
	mozCancelFullScreen?(): void;         // Mozilla(Firefox)，  独有 退出全屏方法
	msExitFullscreen?(): void;            // IE，                独有 退出全屏方法
	cancelFullScreen?(): void;            // 其它未知版本，        独有 退出全屏方法
	currentStyle?: { [key: string]: string };             // 新增一个，仅属于旧版本IE浏览器的：老旧CSS属性。

	//

	removeEventListener?: RawDocument['removeEventListener'];				// WARN 变为可选
	addEventListener?: RawDocument['addEventListener'];							// WARN 变为可选
}

interface Screen {
	left?: number;                                        // 兼容性方案
	top?: number;                                         // 兼容性方案
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
	userLanguage?: string;            // 兼容性方案
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
