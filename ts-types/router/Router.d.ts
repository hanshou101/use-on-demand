// import VueRouter, {Route} from 'vue-router';

// declare module 'vue-router' {
//   interface VueRouter {
//     abcsd: string;
//   }
// }

// declare global {
//   declare module 'vue/types/vue' {
//     interface Vue {
//       $router:  {
//         abc: string
//       }
//     }
//   }
// }


// import VueRouter, {Route} from '~/node_modules/vue-router';

// interface RouterType_Improved {
//   a: string;
//   b: string;
// }

// declare module 'vue/types/vue' {
//   interface Vue {
//     $router: VueRouter & RouterType_Improved
//     $route: Route
//   }
// }

import {Route} from 'vue-router';

declare global {
  type RouteType = Route;
}
