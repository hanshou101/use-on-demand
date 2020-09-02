import { __decorate, __metadata } from "tslib";
import Dropdown from '@/_components/general/dropdown/index.vue';
import Father_BaseVue, { MyComponent, MyGetter } from './Father_BaseVue';
import Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
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
let Father_CommonMixin = 
// export default class HelloWorld extends BaseVueClass {
class Father_CommonMixin extends Father_BaseVue.Mixins(Father_ExportExcel_Mixin) {
    constructor() {
        super();
        //
        this.dialogControlVisible = false;
        this.listLoading = true;
        this.listQuery = {
            size: 10,
            total: 0,
            current: 1,
        };
        this.listData = [];
        this.deleteItems = [];
        // oss预上传数据
        this.uploadHost = '';
        // 上传携带参数
        this.uploadData = {};
        this.ruleFormRef = null;
        // 弹窗类型，1-新建，2-编辑，3-其他
        this.dialogType = 1;
        // TIP 这是一个标记量：mounted钩子仅执行一次，当这一次执行时，首次activated方法不执行_getList；对于之后的activated方法，执行_getList。
        this.preventGetList_in_activatedFunc = true;
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
        this.MixinsData_2 = {};
        // console.log('CommonMixin已经初始化-listQuery', this.listQuery);
        // console.log('this', this.listQuery);
    }
    // public selectOption: MySelectOption_AllConfig                      = selectOption;
    get selectOption() {
        throw new Error('selectOption 属性需要重写！！！');
    }
    // 以下是Method。
    //
    //
    //
    //
    async _getList() {
        if (typeof this.MixinsData_2.listCallback === 'function') {
            this.listLoading = true;
            const res = await this.MixinsData_2.listCallback();
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
        }
    }
    submitForm(formName = 'ruleFormRef') {
        if (formName != 'ruleFormRef') {
            console.error('此处，需要特别注意，El-From未采用默认的ref值。（并非错误，只是提醒）');
        }
        this.listQuery.current = 1;
        const elForm = this.$refs[formName];
        if (elForm) { // 找到了【ref】
            elForm.validate((valid) => {
                if (valid) {
                    this._getList();
                }
                else {
                    const str = '表单校验，未通过。请检查表单字段！';
                    this.$notify({
                        type: 'error',
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
    }
    // TIP 当前选择项，发生了变化。
    handleSelectionChange(val) {
        this.deleteItems = val;
    }
    handleCreate() {
        this.dialogControlVisible = true;
        this.$nextTick(() => {
            this.$refs.dialogRef.showDialog(1);
        });
    }
    handleEdit(index, row) {
        this.dialogControlVisible = true;
        this.$nextTick(() => {
            this.$refs.dialogRef.showDialog(2, JSON.parse(JSON.stringify(row)));
        });
    }
    handleDetail(index, row) {
        this.dialogControlVisible = true;
        this.$nextTick(() => {
            this.$refs.dialogRef.showDialog(3, JSON.parse(JSON.stringify(row)));
        });
    }
    // 删除单条数据
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    // FIXME 这一条，是已经过时的老方法
    async handleDeleteSingle(index, row) {
        await this.MixinsData_2.deleteCallback(row.id);
        this.$notify({
            type: 'success',
            title: this.$t('message.Prompt').toString(),
            message: this.$t('message.Delete_Success').toString(),
        });
        this._getList();
    }
    // 批量删除数据
    handleDelete() {
        if (this.deleteItems.length === 0) {
            this.$alert(this.$t('message.Delete_Prompt').toString(), this.$t('message.Prompt').toString(), {
                confirmButtonText: this.$t('message.Confirm').toString(),
                type: 'warning',
                callback: (action) => {
                },
            });
        }
        else {
            this.$alert(this.$t('message.Delete_Confirm').toString(), this.$t('message.Prompt').toString(), {
                confirmButtonText: this.$t('message.Confirm').toString(),
                type: 'warning',
                callback: (action) => {
                    if (action === 'confirm') {
                        this._deleteItems();
                    }
                },
            });
        }
    }
    async handleChangeStatus(index, row) {
        let { id, status } = row;
        status = (status === 1 ? 0 : 1);
        await this.MixinsData_2.changeStatusCallback(id, status);
        this.$notify({
            type: 'success',
            title: this.$t('message.Prompt').toString(),
            message: this.$t('message.Update_Success').toString(),
        });
        this._getList();
    }
    handlePageChange(currentPage) {
        this.listQuery.current = currentPage;
        this._getList();
    }
    async _deleteItems() {
        const ids = this.deleteItems.map((item) => {
            console.log(item);
            return item.id;
        });
        console.log('ids', ids);
        await this.MixinsData_2.deleteCallback(ids);
        this.$notify({
            type: 'success',
            title: this.$t('message.Prompt').toString(),
            message: this.$t('message.Delete_Success').toString(),
        });
        this._getList();
    }
    async deleteSingle(index, data_or_row_or_id) {
        if (this.MixinsData_2.deleteSingleCallback == undefined) {
            throw new Error('deleteSingle中，所需的deleteSingleCallback不存在');
        }
        const cbFn = this.MixinsData_2.deleteSingleCallback; // 常量const赋值，确保不是undefined。
        this.$confirm('请问确定要删除当前条目吗？', '确认删除', {
            distinguishCancelAndClose: false,
            type: 'warning',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
        })
            .then(async () => {
            const res = await cbFn(index, data_or_row_or_id);
            this.$notify.success('删除成功！');
            this._getList();
        });
    }
    async beforeUpload() {
        const preUploadData = (await this.MixinsData_2.preuploadApi());
        if (preUploadData) {
            const { dir, policy, signature, callback, accessid, host } = preUploadData;
            this.uploadHost = host || '域名没获取到';
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
    // public handle_CoinLogo_UploadSuccess (response: any): void {
    //   console.log('进入预期回调');
    //   const {Status, uri} = response;
    //   if (Status === 'OK') {
    //     this.MixinsData_2.coinForm.img = uri;
    //   }
    // }
    // 关闭对话框的毁掉
    closeDialogEvent() {
        this.dialogControlVisible = false;
    }
    // // TIP 点击图片，则弹出对应的图片放大对话框。
    // public async imgEnlarge (imgUrl: string): Promise<any> {
    //   this.MixinsData_2.checkImg = imgUrl;
    //   this.MixinsData_2.centerDialogVisible = true;
    // }
    // 以下是生命周期的方法
    //
    //
    // TIP 生命周期
    beforeCreate() {
        if (!this.$options.name) { // TIP 若选项name不存在，则提示。
            console.warn('若您需要此组件，被<keep-alive>化，则需要为其添加组件选项name。');
        }
        // console.log(`选项name为：`, this.$options.name)
        // this.$options.name = this.$route.name
        // console.log(`选项name为：`, this.$options.name)
    }
    // TIP 生命周期
    mounted() {
        // console.log('lang2', this.language);
        this.MixinsData_2.lang = this.language;
        this.submitForm(); // TIP 列表接口处理。     // FIXME 此处，因为考虑到  【mounted】+【activated】的组合，绝大多数情况下，会触发两次 【_getList】。所以，此处为了减少重复的不必要开销，（原本采用：注释掉  【mounted】里面的  【_getList】）后来，使用【preventGetList_in_activatedFunc】变量，进行控制。
    }
    // TIP 生命周期（在<Keep-Alive>重新返回前台之后。）
    activated() {
        if (this.preventGetList_in_activatedFunc) { // 第一次，【拦截】activated的列表加载。
            this.preventGetList_in_activatedFunc = false; // 第二次及以后，【不拦截】ctivated的列表加载。
        }
        else {
            this._getList(); // TIP 列表接口处理。（有些菜单页面，可能在自己的mounted中，又写了自定义逻辑。那样的话，必须在对应菜单页面，写一个组件自己的【activated】生命周期钩子。但目前这个通用的拉取列表，已经能够处理95%的情况。）
        }
    }
    updated() {
    }
    // TIP 生命周期（在<Keep-Alive>进入后台之后。）
    deactivated() {
    }
    destroyed() {
    }
};
__decorate([
    MyGetter('language'),
    __metadata("design:type", String)
], Father_CommonMixin.prototype, "language", void 0);
Father_CommonMixin = __decorate([
    MyComponent({
        name: 'CommonMixin',
        components: {
            /*组件*/
            Dropdown,
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
            // 第二种<el-tag>的样式Filter
            elTagFilter2(status) {
                const statusMap = {
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
], Father_CommonMixin);
export default Father_CommonMixin;
//# sourceMappingURL=Father_CommonMixin.js.map