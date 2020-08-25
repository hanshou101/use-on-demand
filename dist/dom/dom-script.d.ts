declare type sOptionKeys = 'crossOrigin';
declare type sOptionType = {
    [key in sOptionKeys]?: HTMLScriptElement[key];
};
export declare class DomScript_Helper {
    static loadJsScript_Async(jsUrl: string, sProperties?: sOptionType): Promise<Event>;
}
export {};
//# sourceMappingURL=dom-script.d.ts.map