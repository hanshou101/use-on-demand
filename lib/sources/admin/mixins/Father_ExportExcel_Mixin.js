import { __decorate, __metadata } from "tslib";
import { CVS_Excel_Helper } from '../../cvs-excel/CVS_Excel_Helper';
import { AdminHelper } from '../admin-helper';
import { Component } from 'vue-property-decorator';
import { _Father_BaseVue } from './Father_BaseVue';
let Father_ExportExcel_Mixin = 
// export default class HelloWorld extends BaseVueClass {
class Father_ExportExcel_Mixin extends _Father_BaseVue {
    constructor() {
        super();
        this.MixinsData_1 = {};
        //  console.log('ExportExcelMixin初始化了', this);
    }
    // TIP 偶尔要用到的【对话框导出】功能。
    // TIP 导出excel（很方便的方法。）
    exportExcel(formName_orParamsObj, baseOption, fileName) {
        // TIP 抽取出，上传导出的方法。
        const exportClosure = (your_params) => {
            // TIP 此处，要记住，在【request.js】里面，有个配套的处理过程。（比如，专门对于【二进制流application/octet-stream】的处理。）
            this.MixinsData_1.exportExcelApi(baseOption, your_params).then((res) => {
                console.log('接口返回', res);
                let extractFilename = res.headers['content-disposition'] || res.headers['Content-disposition'];
                extractFilename = extractFilename.substr(extractFilename.lastIndexOf('=') + 1);
                const filename = fileName ? fileName + '.xlsx' : extractFilename; // TIP 此处，若是自定义文件名，则加上【.csv】文件类型后缀名。
                if (res.data) { // IF分支，如果Response有Body存在。 TIP 后台仅仅在，有数据的情况下会返回Body；如果没有数据，则后台直接return，此时就没有Body，axios的解析，也就没有res.data。
                    console.log('【导出】返回数据为：', res);
                    CVS_Excel_Helper.downloadExcel(res.request.responseURL, filename);
                }
                else { // ELSE分支，如果Response没有Body。（意味着，没有查询到数据。）
                    console.warn('【无导出数据】因为后台没有查找到数据，所以直接return。所以没有body，所以也就没有res.data');
                    this.$message({
                        type: 'warning',
                        showClose: true,
                        message: this.$t('message.Not_Found_Required_Data_Set').toString(),
                        duration: 3000,
                        center: false,
                    });
                }
            });
        };
        console.log('export方法，传入的为：', typeof formName_orParamsObj);
        // TIP 途径之① 传入了表单的Ref名字。
        if (typeof formName_orParamsObj === 'string') {
            this.$refs[formName_orParamsObj].validate((valid) => {
                if (valid) {
                    const { ruleForm, current, size } = this.$refs[formName_orParamsObj].$parent;
                    const params = {};
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
    }
    activated() {
    }
    created() {
    }
    destroyed() {
    }
    mounted() {
    }
    updated() {
    }
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
export default Father_ExportExcel_Mixin;
//# sourceMappingURL=Father_ExportExcel_Mixin.js.map