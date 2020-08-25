import { My_RemCompatible_Util } from '../../viewport/rem-responsive/RemCompatible_Util';
declare global {
    interface PageConfig {
        need_checkHtmlVersion: boolean;
        need_calcRemCompatible: boolean;
        designWidth: number;
        designAdjustRatio: number;
    }
}
interface IBasicInit {
    calcRemCompatible(designWidth: number, adjustRatio: number): void;
}
interface IOnLoadInit {
    onWindowLoaded(): void;
}
export declare abstract class HtmlApp implements IBasicInit, IOnLoadInit {
    pageConfig: PageConfig;
    readonly calcRemCompatible: typeof My_RemCompatible_Util.calc_remCompatible_YanNan;
    abstract onWindowLoaded(): void;
    constructor(pageConfig: PageConfig);
}
export {};
//# sourceMappingURL=HtmlApp.d.ts.map