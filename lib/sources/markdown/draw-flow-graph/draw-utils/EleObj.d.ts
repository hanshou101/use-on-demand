export declare namespace EleObj {
    type direction = 'left' | 'right' | 'top' | 'bottom';
    type cond_Option = 'yes' | 'no';
    type path_Option = 'path1' | 'path2' | 'path3';
    enum EleObj_Enum {
        Start = "start",
        End = "end",
        Operation = "operation",
        Subroutine = "subroutine",
        Condition = "condition",
        Inputoutput = "inputoutput",
        Parallel = "parallel"
    }
    enum VirtualEleObj_Enum {
        __Cond = "__cond",
        __Direction = "__direction",
        __Para = "__para"
    }
    export class Base<T = any> {
        protected type: EleObj_Enum | VirtualEleObj_Enum;
        protected content_canBreakLine: string;
        protected urlLink?: string | undefined;
        protected paramName?: string | undefined;
        linkTimes: number;
        /**
         * 先加后减，和先减后加。效果是一个样！！！
         */
        canUseTimes: number;
        protected constructor(type: EleObj_Enum | VirtualEleObj_Enum, content_canBreakLine: string, urlLink?: string | undefined, paramName?: string | undefined);
        toString(): string;
        /**
         * 检查，自身对象的type，是属于哪一种枚举类型
         *        1.【虚拟衍生元素】，将不被ref检查；
         *        2.【实际元素】，将被ref检查；
         */
        __isVirtualEleObj(): boolean;
        link(...objs: Base[]): string;
        toDirection(direc: direction): Base<any>;
    }
    export class Start extends Base {
        constructor(content_canBreakLine: string, urlLink?: string, paramName?: string);
    }
    export class End extends Base<EleObj_Enum.End> {
        constructor(content_canBreakLine: string, urlLink?: string, paramName?: string);
    }
    export class Operation extends Base<EleObj_Enum.Operation> {
        constructor(content_canBreakLine: string, urlLink?: string, paramName?: string);
    }
    export class Subroutine extends Base<EleObj_Enum.Subroutine> {
        constructor(content_canBreakLine: string, urlLink?: string, paramName?: string);
    }
    export class Condition extends Base<EleObj_Enum.Condition> {
        constructor(content_canBreakLine: string, urlLink?: string, paramName?: string);
        cond(state: cond_Option, direct?: direction): Base<any>;
    }
    export class InputOutput extends Base<EleObj_Enum.Inputoutput> {
        constructor(content_canBreakLine: string, urlLink?: string, paramName?: string);
    }
    export class Parallel extends Base<EleObj_Enum.Parallel> {
        constructor(content_canBreakLine: string, urlLink?: string, paramName?: string);
        parallel(pathName: path_Option, direct: direction): Base<any>;
    }
    export {};
}
//# sourceMappingURL=EleObj.d.ts.map