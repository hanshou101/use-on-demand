import { __awaiter, __decorate, __extends, __generator, __metadata } from "tslib";
import xX_Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import { Component, Mixins } from 'vue-property-decorator';
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
/**
 * 全局CRUD组件抽取
 */
var xX_Father_CommonMixin = /** @class */ (function (_super) {
    __extends(xX_Father_CommonMixin, _super);
    function xX_Father_CommonMixin() {
        var _this = _super.call(this) || this;
        // public selectOption: MySelectOption_AllConfig                      = selectOption;
        // get selectOption(): object {
        // 	throw new Error('selectOption 属性需要重写！！！');
        // }
        //
        _this.dialogControlVisible = false;
        _this.listLoading = true;
        _this.listQuery = {
            size: 10,
            total: 0,
            current: 1,
        };
        _this.listData = [];
        _this.deleteItems = [];
        // oss预上传数据
        _this.uploadHost = '';
        // 上传携带参数
        _this.uploadData = {};
        _this.ruleFormRef = null;
        // 弹窗类型，1-新建，2-编辑，3-其他
        _this.dialogType = 1;
        // TIP 这是一个标记量：mounted钩子仅执行一次，当这一次执行时，首次activated方法不执行_getList；对于之后的activated方法，执行_getList。
        _this.preventGetList_in_activatedFunc = true;
        /**
         * 以下方法，都是需要在子类中实现的interface方法。父类中只有空的。
         */
        // public checkImg!: CommonMixinImpl['checkImg'];
        // public centerDialogVisible!: CommonMixinImpl['centerDialogVisible'];
        // public listCallback!: CommonMixinImpl['listCallback'];
        // public needListProcess!: CommonMixinImpl['needListProcess'];
        // public changeStatusCallback!: CommonMixinImpl['changeStatusCallback'];
        // public deleteCallback!: CommonMixinImpl['deleteCallback'];
        // public coinForm!: CommonMixinImpl['coinForm'];
        // public lang!: CommonMixinImpl['lang'];
        _this.MixinsData_2 = {};
        return _this;
        // console.log('CommonMixin已经初始化-listQuery', this.listQuery);
        // console.log('this', this.listQuery);
    }
    // 以下是Method。
    //
    //
    //
    //
    xX_Father_CommonMixin.prototype._getList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof this.MixinsData_2.listCallback === 'function')) return [3 /*break*/, 2];
                        this.listLoading = true;
                        return [4 /*yield*/, this.MixinsData_2.listCallback()];
                    case 1:
                        res = _a.sent();
                        try {
                            this.listLoading = false;
                            if (res) {
                                if (typeof this.MixinsData_2.needListProcess === 'function') {
                                    this.listData = this.MixinsData_2.needListProcess(res.records);
                                }
                                else {
                                    this.listData = res.records;
                                }
                                this.listQuery.current = res.current;
                                this.listQuery.size = res.size;
                                this.listQuery.total = parseInt(res.total);
                            }
                        }
                        catch (e) {
                            this.listLoading = false;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    xX_Father_CommonMixin.prototype.submitForm = function (formName) {
        var _this = this;
        if (formName === void 0) { formName = 'ruleFormRef'; }
        if (formName != 'ruleFormRef') {
            console.error('此处，需要特别注意，El-From未采用默认的ref值。（并非错误，只是提醒）');
        }
        this.listQuery.current = 1;
        var elForm = this.$refs[formName];
        if (elForm) { // 找到了【ref】
            elForm.validate(function (valid) {
                if (valid) {
                    _this._getList();
                }
                else {
                    var str = '表单校验，未通过。请检查表单字段！';
                    _this.$notify({
                        type: 'warning',
                        title: '提示',
                        message: str,
                    });
                    console.error(str);
                }
            });
        }
        else {
            this._getList(); // 没有找到【ref】
        }
    };
    // TIP 当前选择项，发生了变化。
    xX_Father_CommonMixin.prototype.handleSelectionChange = function (val) {
        this.deleteItems = val;
    };
    xX_Father_CommonMixin.prototype.handleCreate = function () {
        var _this = this;
        this.dialogControlVisible = true;
        this.$nextTick(function () {
            _this.$refs.dialogRef.showDialog(1);
        });
    };
    xX_Father_CommonMixin.prototype.handleEdit = function (index, row) {
        var _this = this;
        this.dialogControlVisible = true;
        this.$nextTick(function () {
            _this.$refs.dialogRef.showDialog(2, JSON.parse(JSON.stringify(row)));
        });
    };
    xX_Father_CommonMixin.prototype.handleDetail = function (index, row) {
        var _this = this;
        this.dialogControlVisible = true;
        this.$nextTick(function () {
            _this.$refs.dialogRef.showDialog(3, JSON.parse(JSON.stringify(row)));
        });
    };
    // 删除单条数据
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    xX_Father_CommonMixin.prototype.handleDeleteSingle = function (index, row) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MixinsData_2.deleteCallback(row.id)];
                    case 1:
                        _a.sent();
                        this.$notify({
                            type: 'success',
                            title: this.$t('message.Prompt').toString(),
                            message: this.$t('message.Delete_Success').toString(),
                        });
                        this._getList();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 批量删除数据
    xX_Father_CommonMixin.prototype.handleDelete = function () {
        var _this = this;
        if (this.deleteItems.length === 0) {
            this.$alert(this.$t('message.Delete_Prompt').toString(), this.$t('message.Prompt').toString(), {
                confirmButtonText: this.$t('message.Confirm').toString(),
                type: 'warning',
                callback: function (action) {
                },
            });
        }
        else {
            this.$alert(this.$t('message.Delete_Confirm').toString(), this.$t('message.Prompt').toString(), {
                confirmButtonText: this.$t('message.Confirm').toString(),
                type: 'warning',
                callback: function (action) {
                    if (action === 'confirm') {
                        _this._deleteItems();
                    }
                },
            });
        }
    };
    xX_Father_CommonMixin.prototype.handleChangeStatus = function (index, row) {
        return __awaiter(this, void 0, void 0, function () {
            var id, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = row.id, status = row.status;
                        status = (status === 1 ? 0 : 1);
                        return [4 /*yield*/, this.MixinsData_2.changeStatusCallback(id, status)];
                    case 1:
                        _a.sent();
                        this.$notify({
                            type: 'success',
                            title: this.$t('message.Prompt').toString(),
                            message: this.$t('message.Update_Success').toString(),
                        });
                        this._getList();
                        return [2 /*return*/];
                }
            });
        });
    };
    xX_Father_CommonMixin.prototype.handlePageChange = function (currentPage) {
        this.listQuery.current = currentPage;
        this._getList();
    };
    xX_Father_CommonMixin.prototype._deleteItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ids;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ids = this.deleteItems.map(function (item) {
                            console.log(item);
                            return item.id;
                        });
                        console.log('ids', ids);
                        return [4 /*yield*/, this.MixinsData_2.deleteCallback(ids)];
                    case 1:
                        _a.sent();
                        this.$notify({
                            type: 'success',
                            title: this.$t('message.Prompt').toString(),
                            message: this.$t('message.Delete_Success').toString(),
                        });
                        this._getList();
                        return [2 /*return*/];
                }
            });
        });
    };
    xX_Father_CommonMixin.prototype.deleteSingle = function (index, data_or_row_or_id) {
        return __awaiter(this, void 0, void 0, function () {
            var cbFn;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.MixinsData_2.deleteSingleCallback == undefined) {
                    throw new Error('deleteSingle中，所需的deleteSingleCallback不存在');
                }
                cbFn = this.MixinsData_2.deleteSingleCallback;
                this.$confirm('请问确定要删除当前条目吗？', '确认删除', {
                    distinguishCancelAndClose: false,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                })
                    .then(function () { return __awaiter(_this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, cbFn(index, data_or_row_or_id)];
                            case 1:
                                res = _a.sent();
                                this.$notify.success('删除成功！');
                                this._getList();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    xX_Father_CommonMixin.prototype.beforeUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var preUploadData, dir, policy, signature, callback, accessid, host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.MixinsData_2.preuploadApi()];
                    case 1:
                        preUploadData = (_a.sent());
                        if (preUploadData) {
                            dir = preUploadData.dir, policy = preUploadData.policy, signature = preUploadData.signature, callback = preUploadData.callback, accessid = preUploadData.accessid, host = preUploadData.host;
                            this.uploadHost = host || '域名没获取到';
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
    // public handle_CoinLogo_UploadSuccess (response: any): void {
    //   console.log('进入预期回调');
    //   const {Status, uri} = response;
    //   if (Status === 'OK') {
    //     this.MixinsData_2.coinForm.img = uri;
    //   }
    // }
    // 关闭对话框的毁掉
    xX_Father_CommonMixin.prototype.closeDialogEvent = function () {
        this.dialogControlVisible = false;
    };
    // // TIP 点击图片，则弹出对应的图片放大对话框。
    // public async imgEnlarge (imgUrl: string): Promise<any> {
    //   this.MixinsData_2.checkImg = imgUrl;
    //   this.MixinsData_2.centerDialogVisible = true;
    // }
    // 以下是生命周期的方法
    //
    //
    // TIP 生命周期
    xX_Father_CommonMixin.prototype.beforeCreate = function () {
        if (!this.$options.name) { // TIP 若选项name不存在，则提示。
            console.warn('若您需要此组件，被<keep-alive>化，则需要为其添加组件选项name。');
        }
        // console.log(`选项name为：`, this.$options.name)
        // this.$options.name = this.$route.name
        // console.log(`选项name为：`, this.$options.name)
    };
    // TIP 生命周期
    xX_Father_CommonMixin.prototype.mounted = function () {
        // console.log('lang2', this.language);
        this.MixinsData_2.lang = this.language;
        this.submitForm(); // TIP 列表接口处理。     // FIXME 此处，因为考虑到  【mounted】+【activated】的组合，绝大多数情况下，会触发两次 【_getList】。所以，此处为了减少重复的不必要开销，（原本采用：注释掉  【mounted】里面的  【_getList】）后来，使用【preventGetList_in_activatedFunc】变量，进行控制。
    };
    // TIP 生命周期（在<Keep-Alive>重新返回前台之后。）
    xX_Father_CommonMixin.prototype.activated = function () {
        if (this.preventGetList_in_activatedFunc) { // 第一次，【拦截】activated的列表加载。
            this.preventGetList_in_activatedFunc = false; // 第二次及以后，【不拦截】ctivated的列表加载。
        }
        else {
            this._getList(); // TIP 列表接口处理。（有些菜单页面，可能在自己的mounted中，又写了自定义逻辑。那样的话，必须在对应菜单页面，写一个组件自己的【activated】生命周期钩子。但目前这个通用的拉取列表，已经能够处理95%的情况。）
        }
    };
    xX_Father_CommonMixin.prototype.updated = function () {
    };
    // TIP 生命周期（在<Keep-Alive>进入后台之后。）
    xX_Father_CommonMixin.prototype.deactivated = function () {
    };
    xX_Father_CommonMixin.prototype.destroyed = function () {
    };
    __decorate([
        Getter('language'),
        __metadata("design:type", String)
    ], xX_Father_CommonMixin.prototype, "language", void 0);
    xX_Father_CommonMixin = __decorate([
        Component({
            name: 'CommonMixin',
            components: {
            /*组件*/
            // Dropdown,
            },
            filters: {
                elTagFilter: function (status) {
                    var statusMap = {
                        0: 'danger',
                        1: 'success',
                        2: 'info',
                        3: 'primary',
                        4: 'warning',
                    };
                    return statusMap[status];
                },
                // 第二种<el-tag>的样式Filter
                elTagFilter2: function (status) {
                    var statusMap = {
                        1: 'danger',
                        0: 'success',
                    };
                    return statusMap[status];
                },
            },
        })
        // export default class HelloWorld extends BaseVueClass {
        ,
        __metadata("design:paramtypes", [])
    ], xX_Father_CommonMixin);
    return xX_Father_CommonMixin;
}(Mixins(xX_Father_ExportExcel_Mixin)));
export default xX_Father_CommonMixin;
//# sourceMappingURL=Father_CommonMixin.js.map