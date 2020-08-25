declare enum TestE {
    A = 0,
    B = 1
}
declare const GlobalEnums: {
    TestE: typeof TestE;
};
declare global {
    type GlobalEnums_Type = typeof GlobalEnums;
}
export {};
//# sourceMappingURL=BindDemo_Enum.d.ts.map