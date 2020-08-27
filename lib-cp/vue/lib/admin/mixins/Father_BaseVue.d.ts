import { Vue, Component, Mixins, Emit, Model, Inject, Provide, Prop, Watch } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
export interface MixinLevelTag {
}
export { Component as MyComponent, Mixins as MyMixins, Provide as MyProvide, Inject as MyInject, Model as MyModel, Prop as MyProp, Watch as MyWatch, Emit as MyEmit, Action as MyAction, Getter as MyGetter, Mutation as MyMutation, Vue as OriginVue, };
export default abstract class Father_BaseVue extends Vue {
    static NoticeCount: number;
    constructor();
    static readonly Mixins: typeof Mixins;
    abstract created(): void;
    abstract mounted(): void;
    abstract activated(): void;
    abstract updated(): void;
    abstract destroyed(): void;
    abstract MixinsData_1: MixinLevelTag;
}
//# sourceMappingURL=Father_BaseVue.d.ts.map