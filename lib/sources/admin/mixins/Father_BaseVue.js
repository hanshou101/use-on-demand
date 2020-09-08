import Vue from 'vue';
/*
        export {
          // TIP 特殊化命名的Component模块，方便引入
          Component as MyComponent,
          Mixins as MyMixins,
          Provide as MyProvide,
          Inject as MyInject,
          Model as MyModel,
          Prop as MyProp,
          Watch as MyWatch,
          Emit as MyEmit,
          // TIP 特殊化命名的 Vuex类型工具。
          Action as MyAction,
          Getter as MyGetter,
          Mutation as MyMutation,
          // TIP 原生Vue
          Vue as OriginVue,
        };
*/
/**
 * TIP 此处，是正确的结果。
 * 				1.自从修复了【peerDependencies】之后。
 */
export class Father_BaseVue extends Vue {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected		WARN 此处，必须暴露给外界为【public】，因为可能是【VueConstructor】的限制？
    constructor() {
        super();
        const count = ++Father_BaseVue.NoticeCount;
        if (count <= 3) {
            // console.log('不建议在Vue-Component的构造函数里面，使用this获取数据！！！因为此时的this，和最终形成的你希望的组件的this，指向的并不是一处。（因为技术因素）');
            // console.log('created:如果你需要初始化Mixins中间的数据，那么在这个方法里做最好 😄😄😄');
        }
    } //
}
Father_BaseVue.NoticeCount = 0; // 最多提醒3次。
// & VueConstructor<Vue>;
/**
 * TIP 此处，是经过多次妥协的结果。（WARN 该结果是错的）
 */
export const Wrong_Father_BaseVue = Father_BaseVue; // FIXME 为什么这种方法不可用？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
// export const Father_BaseVue = _Father_BaseVue;
// export {
// 	_Father_BaseVue as Father_BaseVue,
// };
//# sourceMappingURL=Father_BaseVue.js.map