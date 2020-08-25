import Father_BaseVue, { MixinLevelTag } from './Father_BaseVue';
export default class Father_ExportExcel_Mixin extends Father_BaseVue {
    constructor();
    exportExcel(formName_orParamsObj: string | {}, baseOption: ExportExcelOption_Type, fileName: string): void;
    activated(): void;
    created(): void;
    destroyed(): void;
    mounted(): void;
    updated(): void;
    MixinsData_1: MixinLevelTag & ExportExcelMixinImpl;
}
export interface ExportExcelMixinImpl {
    exportExcelApi: (baseOption: ExportExcelOption_Type, form: ExportExcelParam_Type, current?: number, size?: number) => Promise<any>;
}
//# sourceMappingURL=Father_ExportExcel_Mixin.d.ts.map