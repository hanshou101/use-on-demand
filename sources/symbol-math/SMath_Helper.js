export class SMath_Helper {
    constructor() {
        /**
         * 精确计算
         */
        this.precision = {
            // 乘法
            times(_num1, _num2, ...others) {
                if (others.length > 0) {
                    // @ts-ignore
                    return this.times(this.times(num1, num2), ...others);
                }
                const num1 = parseFloat(_num1) || 0;
                const num2 = parseFloat(_num2) || 0;
                const num1Changed = this.float2Fixed(num1);
                const num2Changed = this.float2Fixed(num2);
                // 把两个数的小数位数相加
                const baseNum = this.digitLength(num1) + this.digitLength(num2);
                const leftValue = num1Changed * num2Changed;
                // this.checkBoundary(leftValue)
                return leftValue / Math.pow(10, baseNum);
            },
            // 精确加法
            plus(num1, num2, ...others) {
                if (others.length > 0) {
                    // @ts-ignore
                    return this.plus(this.plus(num1, num2), ...others);
                }
                const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
                return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum;
            },
            // 精确减法
            minus(num1, num2, ...others) {
                if (others.length > 0) {
                    // @ts-ignore
                    return this.minus(this.minus(num1, num2), ...others);
                }
                const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
                return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum;
            },
            // 精确除法
            divide(num1, num2, ...others) {
                if (others.length > 0) {
                    // @ts-ignore
                    return this.divide(this.divide(num1, num2), ...others);
                }
                const num1Change = this.float2Fixed(parseFloat(num1));
                const num2Change = this.float2Fixed(parseFloat(num2));
                return this.times(num1Change / num2Change, Math.pow(10, this.digitLength(num2) - this.digitLength(num1)));
            },
            // 把小数转成整数，支持科学计数法。如果是小数则放大成整数
            float2Fixed(num) {
                if (!num.toString().includes('e')) { // 如果【没找到】，才执行
                    return Number(num.toString().replace('.', ''));
                }
                const dlen = this.digitLength(num);
                return dlen > 0 ? num * Math.pow(10, dlen) : num;
            },
            // 获取当前数小数位的长度(处理科学计数法，本质上处理e-n的情况)
            digitLength(num) {
                const eSplit = num.toString().split(/[eE]/);
                const len = (eSplit[0].split('.')[1] || '').length - (+eSplit[1] || 0);
                return len > 0 ? len : 0;
            },
        };
        /**
         * TODO 随机小数[ 0.0 , 4.0 ]，这种方式？？？  似乎很难实现？？？
         */
    }
    /**
     * 科学计数法转化的工具。
     */
    static scienceNumber_transToPlainText(num) {
        // 如果【非数字格式】，则返回
        if (isNaN(num)) {
            return num;
        }
        // 处理不需要转换的数字
        const str = '' + num;
        if (!/e/i.test(str)) {
            return num;
        }
        return (num).toFixed(18).replace(/\.?0+$/, ''); // 最后的分支，返回替换的结果。
    }
    /**
     * 随机整数。
     */
    static randomInt(min, max) {
        const zero_to_0999 = Math.random(); // 0 到 0.9999。
        const range = max - min;
        const change = zero_to_0999 * (range + 1); // WHY 这句话看上去有问题。但实际好像是正确的？
        return parseInt(change + min, 10);
    }
}
/**
 * 数字添加千分位符
 */
SMath_Helper.parseToThousandth = (num, point = 0) => {
    let [sInt, sFloat] = (Number.isInteger(num) ? `${num}` : num.toFixed(point)).split('.');
    sInt = sInt.replace(/\d(?=(\d{3})+$)/g, '$&,');
    return sFloat ? `${sInt}.${sFloat}` : `${sInt}`;
};
//# sourceMappingURL=SMath_Helper.js.map