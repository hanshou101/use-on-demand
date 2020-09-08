import { __decorate, __extends, __metadata } from "tslib";
import { CVS_Excel_Helper } from '../../cvs-excel/CVS_Excel_Helper';
import { AdminHelper } from '../admin-helper';
import { Component } from 'vue-property-decorator';
import { Father_BaseVue } from './Father_BaseVue';
var Father_ExportExcel_Mixin = /** @class */ (function (_super) {
    __extends(Father_ExportExcel_Mixin, _super);
    function Father_ExportExcel_Mixin() {
        var _this = _super.call(this) || this;
        _this.MixinsData_1 = {};
        return _this;
        //  console.log('ExportExcelMixin初始化了', this);
    }
    // TIP 偶尔要用到的【对话框导出】功能。
    // TIP 导出excel（很方便的方法。）
    Father_ExportExcel_Mixin.prototype.exportExcel = function (formName_orParamsObj, baseOption, fileName) {
        var _this = this;
        // TIP 抽取出，上传导出的方法。
        var exportClosure = function (your_params) {
            // TIP 此处，要记住，在【request.js】里面，有个配套的处理过程。（比如，专门对于【二进制流application/octet-stream】的处理。）
            _this.MixinsData_1.exportExcelApi(baseOption, your_params).then(function (res) {
                console.log('接口返回', res);
                var extractFilename = res.headers['content-disposition'] || res.headers['Content-disposition'];
                extractFilename = extractFilename.substr(extractFilename.lastIndexOf('=') + 1);
                var filename = fileName ? fileName + '.xlsx' : extractFilename; // TIP 此处，若是自定义文件名，则加上【.csv】文件类型后缀名。
                if (res.data) { // IF分支，如果Response有Body存在。 TIP 后台仅仅在，有数据的情况下会返回Body；如果没有数据，则后台直接return，此时就没有Body，axios的解析，也就没有res.data。
                    console.log('【导出】返回数据为：', res);
                    CVS_Excel_Helper.downloadExcel(res.request.responseURL, filename);
                }
                else { // ELSE分支，如果Response没有Body。（意味着，没有查询到数据。）
                    console.warn('【无导出数据】因为后台没有查找到数据，所以直接return。所以没有body，所以也就没有res.data');
                    _this.$message({
                        type: 'warning',
                        showClose: true,
                        message: _this.$t('message.Not_Found_Required_Data_Set').toString(),
                        duration: 3000,
                        center: false,
                    });
                }
            });
        };
        console.log('export方法，传入的为：', typeof formName_orParamsObj);
        // TIP 途径之① 传入了表单的Ref名字。
        if (typeof formName_orParamsObj === 'string') {
            this.$refs[formName_orParamsObj].validate(function (valid) {
                if (valid) {
                    var _a = _this.$refs[formName_orParamsObj].$parent, ruleForm = _a.ruleForm, current = _a.current, size = _a.size;
                    var params = {};
                    AdminHelper.formDateRange(params, ruleForm);
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
    Father_ExportExcel_Mixin.prototype.activated = function () {
    };
    Father_ExportExcel_Mixin.prototype.created = function () {
    };
    Father_ExportExcel_Mixin.prototype.destroyed = function () {
    };
    Father_ExportExcel_Mixin.prototype.mounted = function () {
    };
    Father_ExportExcel_Mixin.prototype.updated = function () {
    };
    Father_ExportExcel_Mixin = __decorate([
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
    ], Father_ExportExcel_Mixin);
    return Father_ExportExcel_Mixin;
}(Father_BaseVue));
export default Father_ExportExcel_Mixin;
//# sourceMappingURL=Father_ExportExcel_Mixin.js.map