import Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import { MixinLevelTag } from './Father_BaseVue';
export interface PreUploadBean {
    dir?: string;
    policy?: string;
    signature?: string;
    callback?: string;
    accessid?: string;
    host?: string;
}
export interface OssUploadBean {
    name?: string;
    key?: string;
    policy?: string;
    OSSAccessKeyId?: string;
    success_action_status?: number;
    callback?: string;
    signature?: string;
}
declare const Father_CommonMixin_base: import("vue-class-component/lib/declarations").VueClass<Father_ExportExcel_Mixin>;
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
export default class Father_CommonMixin<SelectOptionType> extends Father_CommonMixin_base {
    constructor();
    language: string;
    get selectOption(): object;
    dialogControlVisible: boolean;
    listLoading: boolean;
    listQuery: {
        total: number;
        current: number;
        size: number;
    };
    listData: Array<any>;
    deleteItems: Array<any>;
    uploadHost: string;
    uploadData: OssUploadBean;
    ruleFormRef: null;
    dialogType: number;
    preventGetList_in_activatedFunc: boolean;
    _getList(): Promise<any>;
    submitForm(formName?: string): void;
    handleSelectionChange(val: any): void;
    handleCreate(): void;
    handleEdit(index: number, row: {}): void;
    handleDetail(index: number, row: {}): void;
    handleDeleteSingle(index: number, row: any): Promise<void>;
    handleDelete(): void;
    handleChangeStatus(index: number, row: {
        id?: string;
        status?: number;
    }): Promise<any>;
    handlePageChange(currentPage: number): void;
    _deleteItems(): Promise<any>;
    deleteSingle(index: number, data_or_row_or_id: any): Promise<void>;
    beforeUpload(): Promise<any>;
    closeDialogEvent(): void;
    beforeCreate(): void;
    mounted(): void;
    activated(): void;
    updated(): void;
    deactivated(): void;
    destroyed(): void;
    /**
     * 以下方法，都是需要在子类中实现的interface方法。父类中只有空的。
     */
    MixinsData_2: MixinLevelTag & CommonMixinImpl & ExtendImpl<SelectOptionType>;
}
interface CommonMixinImpl {
    coinForm?: {
        img?: string;
        [key: string]: string | undefined | number;
    };
    lang: string;
    listCallback: Function;
    needListProcess: Function;
    changeStatusCallback: Function;
    deleteCallback: Function;
    deleteSingleCallback?: (index: number, data_or_row_or_id: any) => Promise<any>;
}
interface ExtendImpl<SelectOptionType> {
    selectOption: SelectOptionType;
    preuploadApi(): Promise<any>;
}
export {};
//# sourceMappingURL=Father_CommonMixin.d.ts.map