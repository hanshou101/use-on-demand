import Vue, { VueConstructor } from 'vue';

/*
        import {
          Vue,
          Component, Mixins,
          Emit, Model,
          Inject, Provide,
          Prop, Watch,
        } from 'vue-property-decorator';
        import {Action, Getter, Mutation} from 'vuex-class';
        // TODO 使用类型化的vuex
*/


export interface MixinLevelTag {    // 表示Mixin层次相关
	// TODO 此处注释，避免产生一种任何值都可以的错觉。
	// [key: string]: any;
}

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
export abstract class Father_BaseVue extends Vue {					// FIXME 最后这是唯一开箱即用的方法？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
	public static NoticeCount = 0;  // 最多提醒3次。
	protected constructor() {
		super();
		const count = ++Father_BaseVue.NoticeCount;
		if (count <= 3) {
			// console.log('不建议在Vue-Component的构造函数里面，使用this获取数据！！！因为此时的this，和最终形成的你希望的组件的this，指向的并不是一处。（因为技术因素）');
			// console.log('created:如果你需要初始化Mixins中间的数据，那么在这个方法里做最好 😄😄😄');
		}
	}//
	// public static readonly Mixins = Mixins; // 挑战认知？？？？？？？？？？？？？？？？？？？？？非常奇怪！！！！！！！！！！！！！！！！！！！！！！！
	// 实体方法
	public abstract created(): void;//
	public abstract mounted(): void;//
	public abstract activated(): void;//
	public abstract updated(): void;//
	public abstract destroyed(): void;//
	// TODO 换用可变级别。
	public abstract MixinsData_1: MixinLevelTag;
}


type Father_BaseVue_Static = {
		NoticeCount: number;				//
		// Mixins: Mixins;
		// new(): Father_BaseVue;			// WARN 不要写出New方法来，不然会导致【构造函数】类型不一致。
	}
	& Father_BaseVue
	// & typeof Vue
	& VueConstructor_Type<Vue_Type>;
	// & VueConstructor<Vue>;


/**
 * TIP 此处，是经过多次妥协的结果。（WARN 该结果是错的）
 */
export const Wrong_Father_BaseVue: Father_BaseVue_Static = Father_BaseVue as any;		// FIXME 为什么这种方法不可用？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
// export const Father_BaseVue = _Father_BaseVue;

// export {
// 	_Father_BaseVue as Father_BaseVue,
// };
