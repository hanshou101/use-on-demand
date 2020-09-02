import Vue from 'vue';

// declare module 'vue/types/vue' {
//
//   // /**
//   //  * 以下的VueConstructor，也可以替换成另外一种方式：
//   //  *          const Vue: Vue & {
//   //  *            $i18n_t: (key: string) => string;
//   //  *          };
//   //  */
//   // interface VueConstructor {
//   //   $i18n_t?: (key: string) => string;
//   // }
//
//
//   class VueI18n {
//     /**
//      * WARN 此处，是为了修复以下问题：
//      *                0.文件底本：node_modules\vue-i18n\types\index.d.ts，第176行。
//      *                1.仅仅是因为【Vue组件的】【head——meta】的值，应该是string，而不是【$t】产生的国际化对象。从而导致，大片飘红。
//      */
//     t(key: VueI18n.Path, values?: VueI18n.Values): VueI18n.TranslateResult | string;
//   }
// }
