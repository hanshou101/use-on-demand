import { __decorate, __extends, __metadata } from "tslib";
import { xX_CVS_Excel_Helper } from '../../cvs-excel/CVS_Excel_Helper';
import { xX_AdminHelper } from '../admin-helper';
import { Component } from 'vue-property-decorator';
import { xX_Father_BaseVue } from './Father_BaseVue';
import { t } from '../../cp-util/locale/locale';
var xX_Father_ExportExcel_Mixin = /** @class */ (function (_super) {
    __extends(xX_Father_ExportExcel_Mixin, _super);
    function xX_Father_ExportExcel_Mixin() {
        var _this = _super.call(this) || this;
        _this.t = t;
        _this.MixinsData_1 = {};
        return _this;
        //  console.log('ExportExcelMixin初始化了', this);
    }
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // FIXME 这个函数，在打包后，会导致极其诡异的【x is not a function】问题！！！！！！暂未找到原因！！！！！！临时放出来而已！！！！！！
    // // TIP 偶尔要用到的【对话框导出】功能。
    // // TIP 导出excel（很方便的方法。）
    xX_Father_ExportExcel_Mixin.prototype.exportExcel = function (formName_orParamsObj, baseOption, fileName) {
        var _this = this;
        // TIP 抽取出，上传导出的方法。
        var exportClosure = function (your_params) {
            // TIP 此处，要记住，在【request.js】里面，有个配套的处理过程。（比如，专门对于【二进制流application/octet-stream】的处理。）
            _this.MixinsData_1.exportExcelApi(baseOption, your_params).then(function (res) {
                var _a, _b;
                console.log('接口返回', res);
                var extractFilename = ((_a = res === null || res === void 0 ? void 0 : res.headers) === null || _a === void 0 ? void 0 : _a['content-disposition']) || ((_b = res === null || res === void 0 ? void 0 : res.headers) === null || _b === void 0 ? void 0 : _b['Content-disposition']) || fileName;
                extractFilename = extractFilename.substr(extractFilename.lastIndexOf('=') + 1);
                var filename = fileName ? fileName + '.xlsx' : extractFilename; // TIP 此处，若是自定义文件名，则加上【.csv】文件类型后缀名。
                if (res.data) { // IF分支，如果Response有Body存在。 TIP 后台仅仅在，有数据的情况下会返回Body；如果没有数据，则后台直接return，此时就没有Body，axios的解析，也就没有res.data。
                    console.log('【导出】返回数据为：', res);
                    xX_CVS_Excel_Helper.downloadExcel(res.request.responseURL, filename);
                }
                else { // ELSE分支，如果Response没有Body。（意味着，没有查询到数据。）
                    console.warn('【无导出数据】因为后台没有查找到数据，所以直接return。所以没有body，所以也就没有res.data');
                    _this.$message({
                        type: 'warning',
                        showClose: true,
                        message: _this.t('message.Not_Found_Required_Data_Set').toString(),
                        duration: 3000,
                        center: false,
                    });
                }
            });
        };
        console.log('export方法，传入的为：', typeof formName_orParamsObj);
        // TIP 途径之① 传入了表单的Ref名字。
        if (typeof formName_orParamsObj === 'string') {
            console.log('this', this, '此处$refs', this.$refs);
            this.$refs[formName_orParamsObj].validate(function (valid) {
                if (valid) {
                    var _a = _this.$refs[formName_orParamsObj].$parent, ruleForm = _a.ruleForm, current = _a.current, size = _a.size;
                    var params = {};
                    xX_AdminHelper.formDateRange(params, ruleForm);
                    params.current = current;
                    params.size = size;
                    console.log('filename', fileName);
                    exportClosure(params);
                }
                else {
                    console.error('Export Function : form error submit!!');
                }
            });
        }
        else if (typeof formName_orParamsObj === 'object') {
            // TIP 途径之② 传入了表单的Ref名字。
            exportClosure(formName_orParamsObj);
        }
    };
    xX_Father_ExportExcel_Mixin.prototype.activated = function () {
    };
    xX_Father_ExportExcel_Mixin.prototype.created = function () {
    };
    xX_Father_ExportExcel_Mixin.prototype.destroyed = function () {
    };
    xX_Father_ExportExcel_Mixin.prototype.mounted = function () {
    };
    xX_Father_ExportExcel_Mixin.prototype.updated = function () {
    };
    xX_Father_ExportExcel_Mixin = __decorate([
        Component({
            name: 'ExportExcelMixin',
            components: {
            /*组件*/
            },
            filters: {},
        })
        // export default class HelloWorld extends BaseVueClass {
        ,
        __metadata("design:paramtypes", [])
    ], xX_Father_ExportExcel_Mixin);
    return xX_Father_ExportExcel_Mixin;
}(xX_Father_BaseVue));
export default xX_Father_ExportExcel_Mixin;
var xX_ExportExcel_Mixin_Helper = /** @class */ (function () {
    function xX_ExportExcel_Mixin_Helper() {
    }
    xX_ExportExcel_Mixin_Helper.checkIs_ExcelOrFile = function (response) {
        return !!response.headers // 存在Header
            && [
                'application/octet-stream;charset=utf-8',
                'application/ms-excel; charset=utf-8',
                // 新增一项下载。
                'application/x-download',
            ].includes(response.headers['content-type']); // 并且，包括某些特定Content-Type。
    };
    return xX_ExportExcel_Mixin_Helper;
}());
export { xX_ExportExcel_Mixin_Helper };
//# sourceMappingURL=Father_ExportExcel_Mixin.js.map