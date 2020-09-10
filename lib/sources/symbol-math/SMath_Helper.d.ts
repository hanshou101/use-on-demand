export declare class SMath_Helper {
    /**
     * 精确计算
     */
    static precision: {
        times(_num1: NumOrStr, _num2: NumOrStr, ...others: Array<NumOrStr>): number;
        plus(num1: NumOrStr, num2: NumOrStr, ...others: Array<NumOrStr>): number;
        minus(num1: NumOrStr, num2: NumOrStr, ...others: Array<NumOrStr>): number;
        divide(num1: NumOrStr, num2: NumOrStr, ...others: Array<NumOrStr>): number;
        float2Fixed(num: number): number;
        digitLength(num: NumOrStr): number;
    };
    /**
     * 科学计数法转化的工具。
     */
    static scienceNumber_transToPlainText(num: any): any;
    /**
     * 数字添加千分位符
     */
    static parseToThousandth: (num: number, point?: number) => string;
    /**
     * 随机整数。
     */
    static randomInt(min: number, max: number): number;
}
//# sourceMappingURL=SMath_Helper.d.ts.map