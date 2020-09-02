/**
 * 全局CRUD对话框组件抽取
 */
import Father_ExportExcel_Mixin from './Father_ExportExcel_Mixin';
import { MixinLevelTag } from './Father_BaseVue';
import { OssUploadBean } from './Father_CommonMixin';
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
 * 抽象类
 */
interface AbsInterface {
    selectOption: {};
    preuploadApi: () => Promise<any>;
}
declare const Father_DialogMixin_base: import("vue-class-component/lib/declarations").VueClass<Father_ExportExcel_Mixin>;
export default class Father_DialogMixin extends Father_DialogMixin_base implements AbsInterface {
    private show;
    initData: any;
    dialogType: number;
    language: string;
    get selectOption(): object;
    preuploadApi(): Promise<any>;
    dialogVisible: boolean;
    uploadHost: string;
    uploadData: OssUploadBean;
    dataCommitting: boolean;
    watch_show(newVal: boolean): void;
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
    MixinsData_2: MixinLevelTag & DialogMixinImpl;
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
export {};
//# sourceMappingURL=Father_DialogMixin.d.ts.map