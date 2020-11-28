interface CfgType {
    targetDir?: string;
    outDir?: string;
    keyMapJsonFname?: string;
    allOccurFname?: string;
    keyOccurFname?: string;
    InCp_NoInMap_FName?: string;
    NotInCp_InMap_FName?: string;
    langObj?: object;
}
declare class Logic {
    static GlobalCfg: NoUndefinedField<CfgType>;
    static search(cfg?: CfgType): void;
}
export declare const xX_VueI18N_simplifySlim_Helper_Logic: typeof Logic;
export {};
//# sourceMappingURL=VueI18N_simplifySlim_Helper.d.ts.map