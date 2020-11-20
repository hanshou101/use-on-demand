import { __assign } from "tslib";
var xX_AdminHelper = /** @class */ (function () {
    function xX_AdminHelper() {
    }
    /**
     * 将MultiLang，迅速转化为  已有ruleForm的一部分。
     */
    xX_AdminHelper.combine_MultiLangPlus = function (type, formObj, netField, localField) {
        if (localField === void 0) { localField = 'translate'; }
        switch (type) {
            // 上传到接口
            case 'upload': {
                var a = formObj[localField];
                console.log('formObj', formObj);
                console.log('localField', localField);
                console.log('a', a);
                formObj[netField] = typeof a === 'object' ? a : JSON.parse(a);
                break;
            }
            // 从接口回显
            case 'fetch': {
                var b = formObj[netField];
                formObj[localField] = typeof b === 'object' ? b : JSON.parse(b);
                break;
            }
        }
    };
    /**
     * 处理时间段选择
     */
    xX_AdminHelper.formDateRange = function (params, form) {
        // TIP 此处，遍历一个对象中，每个属性变量名的名字
        for (var key in form) {
            if (form[key] != null && // TIP 不为Null对象
                typeof form[key] !== 'undefined' && // TIP 且，不为undefined未定义对象
                form[key] !== '' // TIP 而且，不为空字符串
            ) {
                switch (key) {
                    // TIP 处理【选择时间区域】——     开始/结束
                    case 'dateRange': {
                        var startTime = form.dateRange[0];
                        var endTime = form.dateRange[1];
                        params.startTime = startTime;
                        params.endTime = endTime;
                        break;
                    }
                    case 'paymentDateRange': {
                        // TIP 处理【选择时间区域】————     付款提交时间
                        params.startPaymentTime = form.paymentDateRange[0]; // 拆分字段 ①
                        params.endPaymentTime = form.paymentDateRange[1]; // 拆分字段 ②
                        break;
                    }
                    case 'auditDateRange': {
                        // TIP 处理【选择时间区域】————     审计时间
                        params.startAuditTime = form.auditDateRange[0]; // 拆分字段 ①
                        params.endAuditTime = form.auditDateRange[1]; // 拆分字段 ②
                        break;
                    }
                    case 'updateDateRange': {
                        // TIP 处理【选择时间区域】————     更新时间
                        params.startUpdateTime = form.updateDateRange[0]; // 拆分字段 ①
                        params.endUpdateTime = form.updateDateRange[1]; // 拆分字段 ②
                        break;
                    }
                    default: {
                        params[key] = form[key];
                    }
                }
            }
        }
    };
    /**
     *  介绍：将一个已有的Object，经过特定筛子（class形式；目前还不能用interface形式），筛选保留出特定数据
     *
     *  功能：
     *          1.目前，经常用于【提交数据】的筛选。
     */
    xX_AdminHelper.filterTargetFields = function (originObj, filterObj, needTrimEmpty) {
        if (needTrimEmpty === void 0) { needTrimEmpty = false; }
        var distObj = {
        // '筛选后保留的key' : '筛选后保留的value' ,
        };
        for (var key in filterObj) {
            if (Object.prototype.hasOwnProperty.call(filterObj, key)) { // TODO 排除掉，系统自带的原生字段（或原型链字段）。————>仅保留用户自定义字段
                var target = originObj[key];
                if (needTrimEmpty) {
                    // TODO 如果需要判空：过滤一遍，不符合要求的空数据。
                    if (typeof target !== 'undefined' && target !== null && target !== '') {
                        // TODO 不为空，开始赋值
                        distObj[key] = target;
                    }
                    else {
                        // TODO 为空，跳过
                    }
                }
                else {
                    // TODO 如果不需要判空：直接赋值
                    distObj[key] = target;
                }
            }
        }
        return distObj;
    };
    //
    //
    /**
     * 模拟分页
     */
    xX_AdminHelper.mockPage = function (records, context) {
        // 克隆一份数据
        var clone_listQuery = JSON.parse(JSON.stringify(context.listQuery));
        var Max_Size = 99999999;
        var len = records.length;
        // 返回时，先保持原样。
        var result = __assign({ records: records }, context.listQuery);
        // 100毫秒后，再进行设置。（错开一个时间差）
        setTimeout(function () {
            var current = clone_listQuery.current, size = clone_listQuery.size, total = clone_listQuery.total;
            if (len < clone_listQuery.size) { // 返回数据未满，视为已经结束了。
                // 计算总量
                clone_listQuery.total = size * (current - 1) + len;
                if (len === 0) { // 当前页，没有数据。
                    /**
                     * WARN 此处，略微有特殊的地方
                     * 				1.如，21页没数据，20页有10条数据。此时，从20页翻21页，会没有数据，但页数会显示为【20页】。
                     * 								1.这样，看上去就很奇怪了。
                     */
                    clone_listQuery.total += 1; // 此处，保持仍多一个。
                }
                // 其它不变
            }
            else { // 返回了足额数据，视为还有下一页
                clone_listQuery.total = Max_Size;
            }
            Object.keys(context.listQuery).forEach(function (key) {
                // WARN 此处需要【避免丢失引用】。所以只设置对象的属性，不改变对象本身引用。
                context.listQuery[key] = clone_listQuery[key];
            });
            //
        }, 100);
        return result;
    };
    xX_AdminHelper.__placeholder_1 = '————~~~~~————';
    xX_AdminHelper.__placeholder_2 = '↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑  ↑';
    xX_AdminHelper.__placeholder_3 = '> > > > >';
    return xX_AdminHelper;
}());
export { xX_AdminHelper };
//# sourceMappingURL=admin-helper.js.map