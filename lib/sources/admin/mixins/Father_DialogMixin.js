/**
 * 全局CRUD对话框组件抽取
 */
import { __assign, __awaiter, __decorate, __extends, __generator, __metadata } from "tslib";
import xX_Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { t } from '../../cp-util/locale/locale';
import { Getter } from 'vuex-class';
import { xX_data_elTagColorFilter } from '../../element-ui/admin-cp/ElTagItem';
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
var xX_Father_DialogMixin = /** @class */ (function (_super) {
    __extends(xX_Father_DialogMixin, _super);
    // export default class HelloWorld extends BaseVueClass {
    function xX_Father_DialogMixin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // public dialogType: number = 1;
        _this.dialogVisible = _this.show;
        // public uploadImgUrl = userServiceApi.aliyunUrl;
        // public statusFlag: string = '';
        // oss预上传数据
        _this.uploadHost = '';
        // 上传携带参数
        _this.uploadData = {};
        // 翻译结果
        // public tranlateRes = {};
        // 表单是否正在提交中
        _this.dataCommitting = false;
        _this.t = t;
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
        _this.MixinsData_2 = {};
        return _this;
    }
    // 内部数据
    // public _innerData: any = {};
    // TIP: watch 在类中的实现
    xX_Father_DialogMixin.prototype.watch_show = function (newVal) {
        // console.log('填充完毕0', JSON.stringify(this.MixinsData_2.ruleForm));
        var _this = this;
        if (newVal !== this.dialogVisible) {
            this.dialogVisible = newVal;
        }
        if (newVal) {
            this._handleInitData(this.initData);
            console.log('展开显示');
            // console.log('填充完毕1', JSON.stringify(this.MixinsData_2.ruleForm));
            this.$nextTick(function () {
                console.log('修复之前对于DialogMixin改造的Bug', _this.initData, _this.MixinsData_2.ruleForm);
                _this.showDialog(_this.dialogType, _this.initData); // 此处，再次模拟一下先前的操作。
            });
        }
    };
    // TIP: methods 在类中的实现
    xX_Father_DialogMixin.prototype.showDialog = function (type, row) {
        this.dialogVisible = true;
        this.$emit('update:show', true);
        // console.log('填充完毕2', JSON.stringify(this.MixinsData_2.ruleForm));
        if (row) {
            console.log('showDialog，添加数据', row);
            this.MixinsData_2.ruleForm = __assign(__assign({}, this.MixinsData_2.ruleForm), row);
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
    };
    xX_Father_DialogMixin.prototype.closeDialog = function () {
        this.dialogVisible = false;
        this.$emit('update:show', false);
        this.$emit('closeDialogEvent');
        console.log('手动关闭弹窗', this.dialogVisible);
        if (this.MixinsData_2.closeCallback) {
            this.MixinsData_2.closeCallback();
        }
    };
    xX_Father_DialogMixin.prototype.submitForm = function (formName) {
        var _this = this;
        this.$refs[formName].validate(function (valid) {
            if (valid) {
                if (_this.dialogType === 1) {
                    if (_this.dataCommitting) {
                        return;
                    }
                    _this._createItem();
                    _this.dataCommitting = true;
                }
                else if (_this.dialogType === 2) {
                    if (_this.dataCommitting) {
                        return;
                    }
                    _this._updateItem();
                    _this.dataCommitting = true;
                }
                else {
                    if (_this.dataCommitting) {
                        return;
                    }
                    // @ts-ignore
                    if (typeof _this.onFormValidated === 'function') {
                        // 表单校验通过回调
                        // @ts-ignore
                        _this.onFormValidated();
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
    };
    // 数据处理
    xX_Father_DialogMixin.prototype._handleInitData = function (_data) {
        var dataStr = JSON.stringify(_data);
        var data = JSON.parse(dataStr);
        // console.log('弹窗显示了，数据处理', data);
        if (data) {
            // console.log('填充完毕0.5', JSON.stringify(this.MixinsData_2.ruleForm));
            // console.log('showDialog，添加数据', data, this.MixinsData_2);
            this.MixinsData_2.ruleForm = __assign(__assign({}, this.MixinsData_2.ruleForm), data);
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
    };
    xX_Father_DialogMixin.prototype._createItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.MixinsData_2.createCallback()
                    .then(function (res) {
                    _this.$notify({
                        type: 'success',
                        title: _this.t('message.Prompt').toString(),
                        message: _this.t('message.Create_Success').toString(),
                    });
                    _this.dialogVisible = false;
                    _this.$emit('update:show', false);
                    _this.dataCommitting = false;
                    _this.$emit('refreshList');
                    // 处理 一些需要拿到返回值的业务场景
                    if (typeof _this.MixinsData_2.processCreatedCallback === 'function') {
                        _this.MixinsData_2.processCreatedCallback(res);
                    }
                })
                    .catch(function (err) {
                    console.error(err);
                    _this.dataCommitting = false;
                });
                return [2 /*return*/];
            });
        });
    };
    xX_Father_DialogMixin.prototype._updateItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.MixinsData_2.updateCallback()
                    .then(function (res) {
                    _this.$notify({
                        type: 'success',
                        title: _this.t('message.Prompt').toString(),
                        message: _this.t('message.Update_Success').toString(),
                    });
                    _this.dialogVisible = false;
                    _this.$emit('update:show', true);
                    _this.dataCommitting = false;
                    _this.$emit('refreshList');
                })
                    .catch(function (err) {
                    console.error(err);
                    _this.dataCommitting = false;
                });
                return [2 /*return*/];
            });
        });
    };
    xX_Father_DialogMixin.prototype.handleUploadSuccess = function (response) {
        var Status = response.Status, uri = response.uri;
        if (Status === 'OK') {
            this.MixinsData_2.ruleForm.value = uri;
            this.$forceUpdate();
        }
    };
    xX_Father_DialogMixin.prototype.beforeUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var preUploadData, dir, policy, signature, callback, accessid, host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MixinsData_2.preuploadApi()];
                    case 1:
                        preUploadData = (_a.sent());
                        if (preUploadData) {
                            dir = preUploadData.dir, policy = preUploadData.policy, signature = preUploadData.signature, callback = preUploadData.callback, accessid = preUploadData.accessid, host = preUploadData.host;
                            this.uploadHost = host || '未获取到域名';
                            this.uploadData.name = signature;
                            this.uploadData.key = "" + dir + new Date().getTime() + ".jpg";
                            this.uploadData.policy = policy;
                            this.uploadData.OSSAccessKeyId = accessid;
                            this.uploadData.success_action_status = 200;
                            this.uploadData.callback = callback;
                            this.uploadData.signature = signature;
                        }
                        else {
                            return [2 /*return*/, Promise.reject()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Prop({
            type: Boolean,
            default: false,
            required: false,
        }),
        __metadata("design:type", Boolean)
    ], xX_Father_DialogMixin.prototype, "show", void 0);
    __decorate([
        Prop({
            default: function () {
                return {};
            },
            required: false,
        }),
        __metadata("design:type", Object)
    ], xX_Father_DialogMixin.prototype, "initData", void 0);
    __decorate([
        Prop({
            default: 1,
            required: false,
        }),
        __metadata("design:type", Number)
    ], xX_Father_DialogMixin.prototype, "dialogType", void 0);
    __decorate([
        Getter('language'),
        __metadata("design:type", String)
    ], xX_Father_DialogMixin.prototype, "language", void 0);
    __decorate([
        Watch('show', { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], xX_Father_DialogMixin.prototype, "watch_show", null);
    xX_Father_DialogMixin = __decorate([
        Component({
            name: 'DialogMixin',
            components: {
            /*组件*/
            },
            filters: {
                elTagFilter: function (status) {
                    return xX_data_elTagColorFilter[status];
                },
            },
        })
        // export default class HelloWorld extends BaseVueClass {
    ], xX_Father_DialogMixin);
    return xX_Father_DialogMixin;
}(Mixins(xX_Father_ExportExcel_Mixin)));
export default xX_Father_DialogMixin;
//# sourceMappingURL=Father_DialogMixin.js.map