import { __read, __spread } from "tslib";
var SMath_Helper = /** @class */ (function () {
    function SMath_Helper() {
    }
    /**
     * 科学计数法转化的工具。
     */
    SMath_Helper.scienceNumber_transToPlainText = function (num) {
        // 如果【非数字格式】，则返回
        if (isNaN(num)) {
            return num;
        }
        // 处理不需要转换的数字
        var str = '' + num;
        if (!/e/i.test(str)) {
            return num;
        }
        return (num).toFixed(18).replace(/\.?0+$/, ''); // 最后的分支，返回替换的结果。
    };
    /**
     * 随机整数。
     */
    SMath_Helper.randomInt = function (min, max) {
        var zero_to_0999 = Math.random(); // 0 到 0.9999。
        var range = max - min;
        var change = zero_to_0999 * (range + 1); // WHY 这句话看上去有问题。但实际好像是正确的？
        return parseInt(change + min, 10);
    };
    /**
     * 精确计算
     */
    SMath_Helper.precision = {
        // 乘法
        times: function (_num1, _num2) {
            var others = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                others[_i - 2] = arguments[_i];
            }
            if (others.length > 0) {
                // @ts-ignore
                return this.times.apply(this, __spread([this.times(num1, num2)], others));
            }
            var num1 = parseFloat(_num1) || 0;
            var num2 = parseFloat(_num2) || 0;
            var num1Changed = this.float2Fixed(num1);
            var num2Changed = this.float2Fixed(num2);
            // 把两个数的小数位数相加
            var baseNum = this.digitLength(num1) + this.digitLength(num2);
            var leftValue = num1Changed * num2Changed;
            // this.checkBoundary(leftValue)
            return leftValue / Math.pow(10, baseNum);
        },
        // 精确加法
        plus: function (num1, num2) {
            var others = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                others[_i - 2] = arguments[_i];
            }
            if (others.length > 0) {
                // @ts-ignore
                return this.plus.apply(this, __spread([this.plus(num1, num2)], others));
            }
            var baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
            return (this.times(num1, baseNum) + this.times(num2, baseNum)) / baseNum;
        },
        // 精确减法
        minus: function (num1, num2) {
            var others = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                others[_i - 2] = arguments[_i];
            }
            if (others.length > 0) {
                // @ts-ignore
                return this.minus.apply(this, __spread([this.minus(num1, num2)], others));
            }
            var baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
            return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum;
        },
        // 精确除法
        divide: function (num1, num2) {
            var others = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                others[_i - 2] = arguments[_i];
            }
            if (others.length > 0) {
                // @ts-ignore
                return this.divide.apply(this, __spread([this.divide(num1, num2)], others));
            }
            var num1Change = this.float2Fixed(parseFloat(num1));
            var num2Change = this.float2Fixed(parseFloat(num2));
            return this.times(num1Change / num2Change, Math.pow(10, this.digitLength(num2) - this.digitLength(num1)));
        },
        // 把小数转成整数，支持科学计数法。如果是小数则放大成整数
        float2Fixed: function (num) {
            if (!num.toString().includes('e')) { // 如果【没找到】，才执行
                return Number(num.toString().replace('.', ''));
            }
            var dlen = this.digitLength(num);
            return dlen > 0 ? num * Math.pow(10, dlen) : num;
        },
        // 获取当前数小数位的长度(处理科学计数法，本质上处理e-n的情况)
        digitLength: function (num) {
            var eSplit = num.toString().split(/[eE]/);
            var len = (eSplit[0].split('.')[1] || '').length - (+eSplit[1] || 0);
            return len > 0 ? len : 0;
        },
    };
    /**
     * 数字添加千分位符
     */
    SMath_Helper.parseToThousandth = function (num, point) {
        if (point === void 0) { point = 0; }
        var _a = __read((Number.isInteger(num) ? "" + num : num.toFixed(point)).split('.'), 2), sInt = _a[0], sFloat = _a[1];
        sInt = sInt.replace(/\d(?=(\d{3})+$)/g, '$&,');
        return sFloat ? sInt + "." + sFloat : "" + sInt;
    };
    return SMath_Helper;
}());
export { SMath_Helper };
//# sourceMappingURL=SMath_Helper.js.map