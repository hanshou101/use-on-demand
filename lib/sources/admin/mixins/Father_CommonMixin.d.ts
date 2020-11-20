import xX_Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import { MixinLevelTag } from './Father_BaseVue';
declare const xX_Father_CommonMixin_base: import("vue-class-component/lib/declarations").VueClass<xX_Father_ExportExcel_Mixin>;
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
export default class xX_Father_CommonMixin<SelectOptionType> extends xX_Father_CommonMixin_base {
    constructor();
    language: string;
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
    uploadData: OssUploadBean_Type;
    ruleFormRef: null;
    preventGetList_in_activatedFunc: boolean;
    t: (path: string, ...options: any[]) => any;
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