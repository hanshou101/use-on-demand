export class VueRouter_Helper {
	/**
	 * 用于修复【navigation cancelled from / to /login with a new navigation】报错的问题。
	 * 				1.直接原因：
	 * 						1.【3.x】版本特有。
	 * 						2.【vue-router@3.x】版本，如果路由地址跳转相同, 且没有捕获到错误，则会产生错误。
	 * 				2.解决思路：
	 * 						2.我们统一将【Router.prototype.push】方法，加上一个【catch】语句；以避免报错卡住。
	 */
	public static fix_V3_NavigationCancelled_Error(_router: Router_Type) {
		console.error('此处，用于修复【Vue-Router-3】的【跳转Promise报错】，导致中断的Bug。');
		const originalPush: Router_PushFn_A_Type = _router.prototype.push;
		_router.prototype.push                   = function push(location: RawLocation_Type) {
			return originalPush.call(this, location).catch(err => {
				console.log('Router报错', err);
				return err;
			});
		};
	}
}
