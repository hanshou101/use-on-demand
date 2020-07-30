import {NuxtApp} from '~/node_modules/@nuxt/types/app';

/**
 * 在Vue实例上，增强【nuxt.js】独有属性。
 */
// declare module 'vue/types/vue' {
//   interface Vue {
//     // WARN 已经被官方实现
//     // head: number;
//   }
// }

declare global {
  // WARN 此处，是尝试对  window.$nuxt.$accessor安全性 进行修复的尝试？？？
  // interface Window {
  //   $nuxt: {
  //     // $nuxt: NuxtApp & {
  //     $accessorSecure?: Combined_TypedVuex_ActionType;
  //   }
  // }
}
