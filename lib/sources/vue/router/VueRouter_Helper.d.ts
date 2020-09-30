export declare class xX_VueRouter_Helper {
    /**
     * 用于修复【navigation cancelled from / to /login with a new navigation】报错的问题。
     * 				1.直接原因：
     * 						1.【3.x】版本特有。
     * 						2.【vue-router@3.x】版本，如果路由地址跳转相同, 且没有捕获到错误，则会产生错误。
     * 				2.解决思路：
     * 						2.我们统一将【Router.prototype.push】方法，加上一个【catch】语句；以避免报错卡住。
     */
    static fix_V3_NavigationCancelled_Error(_router: Router_Type): void;
}
//# sourceMappingURL=VueRouter_Helper.d.ts.map