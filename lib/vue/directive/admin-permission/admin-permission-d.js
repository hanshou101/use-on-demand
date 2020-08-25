function checkPermission(el, binding, roles) {
    const { value } = binding;
    // const roles   = store.getters && store.getters.roles;
    if (value && value instanceof Array) {
        if (value.length > 0) {
            const permissionRoles = value;
            const hasPermission = roles.some((role) => {
                return permissionRoles.includes(role);
            });
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
    else {
        throw new Error(`need roles! Like v-permission="['admin','editor']"`); // TIP 传入的非数组，则报错
    }
}
export function getAdminPermissionD(roles) {
    const adminPermissionD = {
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