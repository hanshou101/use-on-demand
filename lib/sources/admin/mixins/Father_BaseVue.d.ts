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
/**
 * TIP 此处，是经过多次妥协的结果。
 */
//# sourceMappingURL=Father_BaseVue.d.ts.map