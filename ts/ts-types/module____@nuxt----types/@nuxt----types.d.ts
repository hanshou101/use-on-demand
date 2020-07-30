import {accessorType} from '~/store/index.ts';
// import {modules_forType} from '~/store/index.ts';
// type module = typeof modules_forType

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    // nuxt-typed-vuex专用
    $accessor: typeof accessorType;
  }
}

declare module '@nuxt/types/app' {
  interface NuxtApp {
    /**
     * 此处，尝试对【window.$nuxt.$accessor安全性】，进行修复。
     *        1.用【this.$accessor】访问，一般无延迟
     *        2.使用【window.$nuxt.$accessor】访问，则————————WARN 需要特别注意，这个值，在【首页.vue - mounted】之后，有一定的延迟时间才会有值！！！
     */
    $accessorSecure?: Combined_TypedVuex_ActionType;
  }
}
