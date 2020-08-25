import VueRouter from 'vue-router';

declare module 'vue-router/types/router' {
  // class VueRouter {
  interface VueRouter {
    history: {
      current: {
        name: string;
      }
    };
  }
}
