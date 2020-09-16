var xX_SString_Helper = /** @class */ (function () {
    function xX_SString_Helper() {
    }
    /**
     * 创建一个【独一无二】的【随机字符串】
     */
    xX_SString_Helper.create_RandUnique_Str = function () {
        var timestamp = '' + new Date().valueOf();
        var randomNum = '' + parseInt(((1 + Math.random()) * 65536));
        return randomNum.concat(timestamp).toString(32);
    };
    /**
     * 格式化手机号
     * 如：
     * formatPhone("12345678910", "start") => ****5678910
     * formatPhone("12345678910", "center") => 123****8910
     * formatPhone("12345678910", "end") => 1234567****
     * @param _phone 手机号
     * @param format 格式，可选值有：start、center、end
     * @param _count 格式化多少个字符，默认4个
     * @returns {string}
     */
    xX_SString_Helper.prototype.starMask_Phone = function (_phone, format, _count) {
        if (format === void 0) { format = 'center'; }
        if (_count === void 0) { _count = 4; }
        var phone = _phone + '';
        var count = _count;
        var len = phone.length;
        var arr = phone.split('');
        var start = 0;
        var end = 0;
        var replacement = '***********************';
        if (format === 'start') {
            if (typeof count == 'undefined') {
                count = 4;
            }
            arr.splice(0, count, replacement.substr(0, count));
            return arr.join('');
        }
        if (format === 'center') {
            if (typeof count == 'undefined') {
                count = 4;
            }
            start = Math.floor((len - count) / 2);
            end = count;
            arr.splice(start, end, replacement.substr(0, count));
            return arr.join('');
        }
        if (format === 'end') {
            if (typeof count == 'undefined') {
                count = 4;
            }
            arr.splice(len - count, len, replacement.substr(0, count));
            return arr.join('');
        }
        return phone;
    };
    /**
     * 格式化邮箱
     * 如：
     * formatEmail("123456789@qq.com") => 12*****89@qq.com
     * formatEmail("abc@qq.com") => a*c@qq.com
     * formatEmail("abc123@qq.com") => a*****@qq.com
     * formatEmail("abc12@qq.com") => a***2@qq.com
     * formatEmail("a@qq.com") => *@qq.com
     * @param email 邮箱
     * @param _maxCount 最大截取长度，默认5
     */
    xX_SString_Helper.prototype.starMask_Email = function (email, _maxCount) {
        if (_maxCount === void 0) { _maxCount = 5; }
        var maxCount = _maxCount;
        var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!email || !emailReg.test(email)) {
            return email;
        }
        if (typeof maxCount == 'string' || maxCount <= 0) {
            maxCount = 5;
        }
        var emailLeft = email.split('@')[0];
        var emailRight = email.split('@')[1];
        var leftResult = '';
        var emailLeftLen = emailLeft.length;
        if (emailLeftLen == 1) {
            leftResult = '*';
        }
        else {
            /* 如果邮箱名长度小于等于最大截取长度，则只留第一个及最后一个字符。效果：abcd@123.com => a**d@123.com*/
            if (emailLeftLen <= maxCount) {
                var len = emailLeftLen;
                while (len > 0) {
                    leftResult += '*';
                    len--;
                }
                leftResult = leftResult.split('');
                leftResult[0] = emailLeft.charAt(0);
                leftResult[emailLeftLen - 1] = emailLeft.charAt(emailLeftLen - 1);
            }
            else {
                /* 如果邮箱名长度大于最大截取长度，则将邮箱名中间的替换成"*" */
                var startIndex = Math.ceil((emailLeftLen - maxCount) / 2);
                var endIndex = startIndex + maxCount;
                leftResult = emailLeft.split('');
                if (endIndex > emailLeftLen) {
                    endIndex = emailLeftLen - 1;
                }
                for (; startIndex < endIndex; startIndex++) {
                    leftResult[startIndex] = '*';
                }
            }
            leftResult = leftResult.join('');
        }
        return leftResult + '@' + emailRight;
    };
    /**
     * 【文件】的体积大小，格式化显示。
     */
    xX_SString_Helper.formatFileSize = function (bytes_num, fixed_num) {
        if (fixed_num === void 0) { fixed_num = 0; }
        function quickCalc(exponent, isTotal) {
            var num = isTotal ?
                bytes_num // 总数
                : (bytes_num % Math.pow(1024, exponent + 1)); // 取余数
            return num / Math.pow(1024, exponent);
        }
        return {
            GB: parseInt(quickCalc(3, false)),
            MB: parseInt(quickCalc(2, false)),
            KB: parseInt(quickCalc(1, false)),
            B: parseInt(quickCalc(0, false)),
            //
            total_GB: quickCalc(3, true).toFixed(fixed_num),
            total_MB: quickCalc(2, true).toFixed(fixed_num),
            total_KB: quickCalc(1, true).toFixed(fixed_num),
            total_B: quickCalc(0, true).toFixed(fixed_num),
        };
    };
    /**
     * 文本超出内容，用【省略号】代替
     */
    xX_SString_Helper.ellipsisText = function (text, num) {
        if (num === void 0) { num = text.length; }
        var subStr = text.substring(0, num);
        return subStr + (text.length > num ? ' ... ' : '');
    };
    /**
     * 数字超过指定大小，如【99】后；用【99+】代替
     */
    xX_SString_Helper.outOfNum_99plus = function (_num, _maxNum) {
        var num = _num ? parseFloat(_num) : 0;
        var maxNum = parseFloat(_maxNum);
        if (num > maxNum) {
            return maxNum + "+";
        }
        else {
            return num;
        }
    };
    /**
     * 创建v-for独一无二的id。用法：将强制重建  列表循环内的【子组件】项。
     */
    xX_SString_Helper.uid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    return xX_SString_Helper;
}());
export { xX_SString_Helper };
//# sourceMappingURL=SString_Helper.js.map