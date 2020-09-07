// import Vue from 'vue'
//
// declare module 'vue/types/vue' {
//   interface VueConstructor {
//     install(vue: Vue): void;
//     $i18n_t?: (key: string) => string;
//   }
// }

import CliService from '@vue/cli-service';

import { PropOptions }                                           from 'vue';
import { Vue }                                                   from 'vue/types/vue';
import { VueConstructor }                                        from 'vue';
import { DirectiveBinding, DirectiveFunction, DirectiveOptions } from 'vue/types/options';


declare global {
	type PropOptionsType<T> = PropOptions<T>;

	type Vue_Type = Vue;

	type VueConstructor_Type<T = Vue> = VueConstructor<T>;

	type VueDirective_Type = DirectiveFunction | DirectiveOptions;
	type DirectiveFunction_Type = DirectiveFunction;

	type DirectiveBinding_Type = DirectiveBinding;


	type VueCliService_ProjectOptions_Type = CliService.ProjectOptions
}
