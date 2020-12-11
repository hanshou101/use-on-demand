import { EleObj } from './EleObj';
export interface UsedParams {
    [key: string]: EleObj.Base;
}
interface IRefCheckUtils {
    collectToCheckRef(eleObjs: EleObj.Base[]): CheckRefWrapper;
    checkUsedIfOnce(obj: EleObj.Base): void;
    checkRefs(): void;
}
/**
 * 既然【静态接口】用不了，那我就换成【工厂模式】。
 */
export declare class RefCheckUtilsFactory {
    private static v1?;
    private static v2?;
    static getV1(): RefCheckUtils_v1;
    static getV2(): RefCheckUtils_v2;
}
declare class RefCheckUtils_v1 implements IRefCheckUtils {
    /**
     * 将元素收集起来，检查引用
     *        1.避免，未在md变量中声明，就在md连线中使用  的情况。
     *        2.该方法，可以用作【drawFlow】方法的外部传参之前，也可以用作【drawFlow】内部。
     */
    collectToCheckRef(eleObjs: EleObj.Base[]): CheckRefWrapper;
    checkUsedIfOnce(obj: EleObj.Base): void;
    /**
     * 基本思路  声明/引用 引用次数，计数器。
     *
     * 1.方式一.
     *      1.将所有的声明，包起来，放在一个对象里。然后通过对象调用。
     *      2.这样的好处是，我们拥有全集的一个对象。
     * 2.方式二.
     *      1.方式二，通过【with】关键字。
     *      2.这是基于方式一，对方式一的一种简化、修正。（但是缺陷在于，TypeScript，以及strict模式，并不支持）
     * 3.方式三.
     *      1.正在考虑。在Utils类中维护一个全局。
     *      2.然后每个调用、被调用方法内，进行处理。
     */
    checkRefs(usedParams?: UsedParams): void;
}
export declare class CheckRefWrapper {
    eleObjs: EleObj.Base[];
    constructor(eleObjs: EleObj.Base[]);
}
declare class RefCheckUtils_v2 implements IRefCheckUtils {
    static declaredObjs: EleObj.Base[];
    collectToCheckRef(eleObjs: EleObj.Base[]): CheckRefWrapper;
    checkUsedIfOnce(obj: EleObj.Base): void;
    checkRefs(): void;
}
export {};
//# sourceMappingURL=RefCheckUtils.d.ts.map