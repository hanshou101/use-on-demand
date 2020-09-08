import Vue from 'vue';
export interface MixinLevelTag {
}
/**
 * TIP 此处，是正确的结果。
 * 				1.自从修复了【peerDependencies】之后。
 */
export declare abstract class Father_BaseVue extends Vue {
    static NoticeCount: number;
    constructor();
    abstract created(): void;
    abstract mounted(): void;
    abstract activated(): void;
    abstract updated(): void;
    abstract destroyed(): void;
    abstract MixinsData_1: MixinLevelTag;
}
declare type Father_BaseVue_Static = {
    NoticeCount: number;
} & Father_BaseVue & VueConstructor_Type<Vue_Type>;
/**
 * TIP 此处，是经过多次妥协的结果。（WARN 该结果是错的）
 */
export declare const Wrong_Father_BaseVue: Father_BaseVue_Static;
export {};
//# sourceMappingURL=Father_BaseVue.d.ts.map