import Clipboard from 'clipboard';
declare type Clipboard_SelectorType = string | Element | NodeListOf<Element>;
export declare class CopyPaste_Util {
    simpleCopy(selector: Clipboard_SelectorType): ClipboardJS;
    copyWithCb(selector: Clipboard_SelectorType, sucCb: (e: Event) => void, errCb: (e: Event) => void): Clipboard;
    specialCopy(selector: Clipboard_SelectorType, options?: Clipboard.Options): void;
    destroy(clipboard: Clipboard): void;
}
export {};
//# sourceMappingURL=copy-paste.d.ts.map