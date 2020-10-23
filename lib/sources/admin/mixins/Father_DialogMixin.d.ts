/**
 * 全局CRUD对话框组件抽取
 */
import xX_Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import { MixinLevelTag } from './Father_BaseVue';
declare const xX_Father_DialogMixin_base: import("vue-class-component/lib/declarations").VueClass<xX_Father_ExportExcel_Mixin>;
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
export default class xX_Father_DialogMixin<SelectOptionType> extends xX_Father_DialogMixin_base {
    private show;
    initData: any;
    dialogType: number;
    get language(): string;
    dialogVisible: boolean;
    uploadHost: string;
    uploadData: OssUploadBean_Type;
    dataCommitting: boolean;
    watch_show(newVal: boolean): void;
    t: (path: string, ...options: any[]) => any;
    showDialog(type: number, row?: {} | null): void;
    closeDialog(): void;
    submitForm(formName: string): void;
    _handleInitData(_data: any): void;
    _createItem(): Promise<any>;
    _updateItem(): Promise<any>;
    handleUploadSuccess(response: any): void;
    beforeUpload(): Promise<any>;
    /**
     * 以下方法，都是需要在子类中实现的interface方法。父类中只有空的。
     */
    MixinsData_2: MixinLevelTag & DialogMixinImpl & ExtendImpl<SelectOptionType>;
}
export interface DialogMixinImpl {
    ruleForm: {
        value?: string;
        [key: string]: any;
    };
    addCallback: Function;
    editCallback: Function;
    closeCallback: Function;
    dataInitCallback?: Function;
    createCallback: Function;
    processCreatedCallback: Function;
    updateCallback: Function;
}
interface ExtendImpl<SelectOptionType> {
    selectOption: SelectOptionType;
    preuploadApi(): Promise<any>;
}
export {};
//# sourceMappingURL=Father_DialogMixin.d.ts.map