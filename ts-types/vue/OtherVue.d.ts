// import Vue from 'vue'
//
// declare module 'vue/types/vue' {
//   interface VueConstructor {
//     install(vue: Vue): void;
//     $i18n_t?: (key: string) => string;
//   }
// }

import {PropOptions} from 'vue';
import {Vue}         from 'vue/types/vue';

declare global {
  type PropOptionsType<T> = PropOptions<T>;

  type Vue_Type = Vue;
}
