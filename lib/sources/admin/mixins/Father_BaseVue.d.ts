import Vue from 'vue';
export interface MixinLevelTag {
}
export declare abstract class _Father_BaseVue extends Vue {
    static NoticeCount: number;
    protected constructor();
    abstract created(): void;
    abstract mounted(): void;
    abstract activated(): void;
    abstract updated(): void;
    abstract destroyed(): void;
    abstract MixinsData_1: MixinLevelTag;
}
declare type Father_BaseVue_Static = {
    NoticeCount: number;
} & _Father_BaseVue & VueConstructor_Type<Vue_Type>;
/**
 * TIP 此处，是经过多次妥协的结果。
 */
export declare const Father_BaseVue: Father_BaseVue_Static;
export {};
//# sourceMappingURL=Father_BaseVue.d.ts.map