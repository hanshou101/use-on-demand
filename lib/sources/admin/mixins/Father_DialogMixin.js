/**
 * 全局CRUD对话框组件抽取
 */
import { __decorate, __metadata } from "tslib";
import Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
/**
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 * 可能最后，还是要用【Mixins】去解决！！！。
 */
let Father_DialogMixin = 
// export default class HelloWorld extends BaseVueClass {
class Father_DialogMixin extends Mixins(Father_ExportExcel_Mixin) {
    constructor() {
        super(...arguments);
        // public dialogType: number = 1;
        this.dialogVisible = this.show;
        // public uploadImgUrl = userServiceApi.aliyunUrl;
        // public statusFlag: string = '';
        // oss预上传数据
        this.uploadHost = '';
        // 上传携带参数
        this.uploadData = {};
        // 翻译结果
        // public tranlateRes = {};
        // 表单是否正在提交中
        this.dataCommitting = false;
        /**
         * 以下方法，都是需要在子类中实现的interface方法。父类中只有空的。
         */
        // TODO 因为方法的调整，从【9.3.3】调整为了【9.7】，所以以下的标准语法，被注释掉了。
        // public ruleForm!: DialogMixinImpl['ruleForm'];
        // public addCallback!: DialogMixinImpl['addCallback'];
        // public editCallback!: DialogMixinImpl['editCallback'];
        // public closeCallback!: DialogMixinImpl['closeCallback'];
        // public createCallback!: DialogMixinImpl['createCallback'];
        // public processCreatedCallback!: DialogMixinImpl['processCreatedCallback'];
        // public updateCallback!: DialogMixinImpl['updateCallback'];
        // public Companion!: MixinsInheritCompanion<MixinFather> & DialogMixinImpl;
        this.MixinsData_2 = {};
    }
    // 内部数据
    // public _innerData: any = {};
    // TIP: watch 在类中的实现
    watch_show(newVal) {
        // console.log('填充完毕0', JSON.stringify(this.MixinsData_2.ruleForm));
        if (newVal !== this.dialogVisible) {
            this.dialogVisible = newVal;
        }
        if (newVal) {
            this._handleInitData(this.initData);
            console.log('展开显示');
            // console.log('填充完毕1', JSON.stringify(this.MixinsData_2.ruleForm));
            this.$nextTick(() => {
                console.log('修复之前对于DialogMixin改造的Bug', this.initData, this.MixinsData_2.ruleForm);
                this.showDialog(this.dialogType, this.initData); // 此处，再次模拟一下先前的操作。
            });
        }
    }
    // TIP: methods 在类中的实现
    showDialog(type, row) {
        this.dialogVisible = true;
        this.$emit('update:show', true);
        // console.log('填充完毕2', JSON.stringify(this.MixinsData_2.ruleForm));
        if (row) {
            console.log('showDialog，添加数据', row);
            this.MixinsData_2.ruleForm = {
                // 此处，合并数据，而不是覆盖数据
                ...this.MixinsData_2.ruleForm,
                ...row,
            };
        }
        if (type === 1) {
            this.dialogType = 1;
            // // 增加状态的特殊处理
            if (typeof this.MixinsData_2.addCallback === 'function') {
                this.MixinsData_2.addCallback({});
            }
        }
        else if (type === 2) {
            this.dialogType = 2;
            console.log('进入编辑状态');
            // 编辑状态的特殊处理
            if (typeof this.MixinsData_2.editCallback === 'function') {
                this.MixinsData_2.editCallback(row);
                console.log('调用了此回调');
            }
        }
        else if (type === 3) {
            this.dialogType = 3;
            // 查看状态的特殊处理
            if (typeof this.MixinsData_2.editCallback === 'function') {
                this.MixinsData_2.editCallback(row);
            }
        }
        // console.log('填充完毕3', JSON.stringify(this.MixinsData_2.ruleForm));
    }
    closeDialog() {
        this.dialogVisible = false;
        this.$emit('update:show', false);
        this.$emit('closeDialogEvent');
        console.log('手动关闭弹窗', this.dialogVisible);
        if (this.MixinsData_2.closeCallback) {
            this.MixinsData_2.closeCallback();
        }
    }
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                if (this.dialogType === 1) {
                    if (this.dataCommitting) {
                        return;
                    }
                    this._createItem();
                    this.dataCommitting = true;
                }
                else if (this.dialogType === 2) {
                    if (this.dataCommitting) {
                        return;
                    }
                    this._updateItem();
                    this.dataCommitting = true;
                }
                else {
                    if (this.dataCommitting) {
                        return;
                    }
                    // @ts-ignore
                    if (typeof this.onFormValidated === 'function') {
                        // 表单校验通过回调
                        // @ts-ignore
                        this.onFormValidated();
                        // this.dataCommitting = true;
                    }
                }
                // return true;
            }
            else {
                console.log('error submit!!');
                // return false;
            }
        });
    }
    // 数据处理
    _handleInitData(_data) {
        const dataStr = JSON.stringify(_data);
        const data = JSON.parse(dataStr);
        // console.log('弹窗显示了，数据处理', data);
        if (data) {
            // console.log('填充完毕0.5', JSON.stringify(this.MixinsData_2.ruleForm));
            // console.log('showDialog，添加数据', data, this.MixinsData_2);
            this.MixinsData_2.ruleForm = {
                // 此处，合并数据，而不是覆盖数据
                // 把组件内部数据合进来
                ...this.MixinsData_2.ruleForm,
                ...data,
            };
            /*this._innerData = {
                ...data,
            };*/
            console.log('MixinsData_2.ruleForm', this.MixinsData_2.ruleForm);
            // 数据初始化后回调，不区分新增或编辑
            if (typeof this.MixinsData_2.dataInitCallback === 'function') {
                this.MixinsData_2.dataInitCallback(data);
            }
        }
        switch (this.dialogType) {
            case 1:
                // 增加状态的特殊处理
                if (typeof this.MixinsData_2.addCallback === 'function') {
                    this.MixinsData_2.addCallback({});
                }
                break;
            case 2:
                // 编辑状态的特殊处理
                if (typeof this.MixinsData_2.editCallback === 'function') {
                    this.MixinsData_2.editCallback(data);
                }
                break;
            case 3:
                // 查看状态的特殊处理
                if (typeof this.MixinsData_2.editCallback === 'function') {
                    this.MixinsData_2.editCallback(data);
                }
                break;
        }
    }
    async _createItem() {
        this.MixinsData_2.createCallback()
            .then((res) => {
            this.$notify({
                type: 'success',
                title: this.$t('message.Prompt').toString(),
                message: this.$t('message.Create_Success').toString(),
            });
            this.dialogVisible = false;
            this.$emit('update:show', false);
            this.dataCommitting = false;
            this.$emit('refreshList');
            // 处理 一些需要拿到返回值的业务场景
            if (typeof this.MixinsData_2.processCreatedCallback === 'function') {
                this.MixinsData_2.processCreatedCallback(res);
            }
        })
            .catch(() => {
            this.dataCommitting = false;
        });
    }
    async _updateItem() {
        this.MixinsData_2.updateCallback()
            .then((res) => {
            this.$notify({
                type: 'success',
                title: this.$t('message.Prompt').toString(),
                message: this.$t('message.Update_Success').toString(),
            });
            this.dialogVisible = false;
            this.$emit('update:show', true);
            this.dataCommitting = false;
            this.$emit('refreshList');
        })
            .catch(() => {
            this.dataCommitting = false;
        });
    }
    handleUploadSuccess(response) {
        const { Status, uri } = response;
        if (Status === 'OK') {
            this.MixinsData_2.ruleForm.value = uri;
            this.$forceUpdate();
        }
    }
    async beforeUpload() {
        const preUploadData = (await this.MixinsData_2.preuploadApi());
        if (preUploadData) {
            const { dir, policy, signature, callback, accessid, host, } = preUploadData;
            this.uploadHost = host || '未获取到域名';
            this.uploadData.name = signature;
            this.uploadData.key = `${dir}${new Date().getTime()}.jpg`;
            this.uploadData.policy = policy;
            this.uploadData.OSSAccessKeyId = accessid;
            this.uploadData.success_action_status = 200;
            this.uploadData.callback = callback;
            this.uploadData.signature = signature;
        }
        else {
            return Promise.reject();
        }
    }
};
__decorate([
    Prop({
        type: Boolean,
        default: false,
        required: false,
    }),
    __metadata("design:type", Boolean)
], Father_DialogMixin.prototype, "show", void 0);
__decorate([
    Prop({
        default() {
            return {};
        },
        required: false,
    }),
    __metadata("design:type", Object)
], Father_DialogMixin.prototype, "initData", void 0);
__decorate([
    Prop({
        default: 1,
        required: false,
    }),
    __metadata("design:type", Number)
], Father_DialogMixin.prototype, "dialogType", void 0);
__decorate([
    Getter('language'),
    __metadata("design:type", String)
], Father_DialogMixin.prototype, "language", void 0);
__decorate([
    Watch('show', { immediate: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], Father_DialogMixin.prototype, "watch_show", null);
Father_DialogMixin = __decorate([
    Component({
        name: 'DialogMixin',
        components: {
        /*组件*/
        },
        filters: {
            elTagFilter(status) {
                const statusMap = {
                    0: 'danger',
                    1: 'success',
                    2: 'info',
                    3: 'primary',
                    4: 'warning',
                };
                return statusMap[status];
            },
        },
    })
    // export default class HelloWorld extends BaseVueClass {
], Father_DialogMixin);
export default Father_DialogMixin;
//# sourceMappingURL=Father_DialogMixin.js.map