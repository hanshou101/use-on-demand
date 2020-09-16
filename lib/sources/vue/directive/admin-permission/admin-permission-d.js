function checkPermission(el, binding, roles) {
    var value = binding.value;
    // const roles   = store.getters && store.getters.roles;
    if (value && value instanceof Array) {
        if (value.length > 0) {
            var permissionRoles_1 = value;
            var hasPermission = roles.some(function (role) {
                return permissionRoles_1.includes(role);
            });
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
    else {
        throw new Error("need roles! Like v-permission=\"['admin','editor']\""); // TIP 传入的非数组，则报错
    }
}
export function xX_getAdminPermissionD(roles) {
    var adminPermissionD = {
        inserted: function (el, binding) {
            checkPermission(el, binding, roles);
        },
        update: function (el, binding) {
            checkPermission(el, binding, roles);
        },
    };
    return adminPermissionD;
}
//# sourceMappingURL=admin-permission-d.js.map