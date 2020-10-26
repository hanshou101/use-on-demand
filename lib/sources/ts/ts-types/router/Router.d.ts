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

import Router, { Route, RawLocation } from 'vue-router';

declare global {
	type Route_Type = Route;
	type Router_Type = typeof Router;
	type RawLocation_Type = RawLocation;

	type Router_PushFn_A_Type = (location: RawLocation) => Promise<Route>;

}
