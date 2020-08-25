import Vue, {VueConstructor} from 'sources/vue';
// import OriginCoinApi         from '~/assets/js/api/originCoinApi';
// import SwapsApi              from '~/assets/js/api/swapsApi';
// import Alert                 from '~/components/bx-ui/alert/index';

// import {accessorType} from '~/store/index.ts';

import * as VueI18n_Origin                           from 'vue-i18n';


// TIP————————————————————————————
/**
 * 1.初衷：修复  Typed-Vuex 本身，在index.ts中引用其它模块，的actions的缺陷。
 * 2.此处，建议用泛型工具，来解决
 */
// import {actions as index_actions}                    from '~/store/index.ts';
import {Arg1, Arg2, Args2off1, Args3off1, Args8off1} from 'tsargs';

type Remove_ClassFn_FirstParam<T extends {
  [key: string]: (...args: any) => any
}> = {
  // [P in keyof T]: (secArg?: Arg2<T[P]>) => ReturnType<T[P]>
  // [P in keyof Required<T>]: '1';
  // [P in keyof Partial<T>]: '1';
  [P in keyof T]: (arg2?: Arg2<T[P]>) => ReturnType<T[P]>;
}
// type d = keyof (typeof index_actions)
// TIP————————————————————————————

declare global {
  type InstallFn = (vue: VueConstructor) => void;
  // type Fix_TypedVuex_ActionType = Remove_ClassFn_FirstParam<typeof index_actions>

  // type Combined_TypedVuex_ActionType = (typeof accessorType) & Fix_TypedVuex_ActionType;
}

declare module 'vue/types/vue' {


  interface VueConstructor {
    install: InstallFn;

    /**
     * 以下的VueConstructor，也可以替换成另外一种方式：
     *          const Vue: Vue & {
     *            $i18n_t: (key: string) => string;
     *          };
     */
    $i18n_t: (key: string) => string;
  }

  interface Vue {
    // originCoinAPi: typeof OriginCoinApi;
    // swapsApi: typeof SwapsApi;

    $Enums: GlobalEnums_Type;               // 枚举。

    // $originAlert: typeof Alert;
    $AWatKeys: AWatKeys_Type;

    _i18n: {    // TIP vue-i18n，提供的隐藏属性
      locale: string;
    }

    /**
     * nuxt-typed-vuex专用
     *        1.用【this.$accessor】访问，一般无延迟
     *        2.使用【window.$nuxt.$accessor】访问，则————————WARN 需要特别注意，这个值，在【首页.vue - mounted】之后，有一定的延迟时间才会有值！！！
     */
    // $accessor: Combined_TypedVuex_ActionType;        // WARN 在使用$accessor时，和【~/store/index.ts】相关的字段中，仅提示正确字段、而不警告错误字段，这是Typed-Vuex自身的限制。和【Fix_TypedVuex_ActionType】无关。
    // $accessor: Combined_TypedVuex_ActionType;        // WARN 在使用$accessor时，和【~/store/index.ts】相关的字段中，仅提示正确字段、而不警告错误字段，这是Typed-Vuex自身的限制。和【Fix_TypedVuex_ActionType】无关。


    $elementLoadingBackground: string;        // v-loading的颜色。
  }

  interface VueI18n {
    /**
     * WARN 此处，是为了修复以下问题：
     *                0.文件底本：node_modules\vue-i18n\types\index.d.ts，第176行。
     *                1.仅仅是因为【Vue组件的】【head——meta】的值，应该是string，而不是【$t】产生的国际化对象。从而导致，大片飘红。
     */
    t(key: VueI18n_Origin.Path, values?: VueI18n_Origin.Values): VueI18n_Origin.TranslateResult | string;
  }
}
