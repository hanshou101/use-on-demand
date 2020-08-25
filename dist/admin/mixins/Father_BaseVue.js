import { Vue, Component, Mixins, Emit, Model, Inject, Provide, Prop, Watch, } from 'vue-property-decorator';
import { Action, Getter, Mutation } from 'vuex-class';
export { 
// TIP 特殊化命名的Component模块，方便引入
Component as MyComponent, Mixins as MyMixins, Provide as MyProvide, Inject as MyInject, Model as MyModel, Prop as MyProp, Watch as MyWatch, Emit as MyEmit, 
// TIP 特殊化命名的 Vuex类型工具。
Action as MyAction, Getter as MyGetter, Mutation as MyMutation, 
// TIP 原生Vue
Vue as OriginVue, };
export default class Father_BaseVue extends Vue {
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
Father_BaseVue.Mixins = Mixins; // 挑战认知？？？？？？？？？？？？？？？？？？？？？非常奇怪！！！！！！！！！！！！！！！！！！！！！！！
//# sourceMappingURL=Father_BaseVue.js.map