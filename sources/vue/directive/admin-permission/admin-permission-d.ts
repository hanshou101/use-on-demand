import { xX_ExceptionError_Helper } from '../../../exception-error/ExceptionError_Helper';

interface AdminPermissionD_El extends HTMLElement {
}

interface AdminPermissionD_Binding extends Omit<DirectiveBinding_Type, 'value'> {
	value: Array<string>;
}

function checkPermission(
	el: HTMLElement,
	binding: AdminPermissionD_Binding,
	roles: Array<string>,
) {
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
	} else {
		throw new Error(xX_ExceptionError_Helper.throwError_andLog(`need roles! Like v-permission="['admin','editor']"`));    // TIP 传入的非数组，则报错
	}
}

export function xX_getAdminPermissionD(
	roles: Array<string>,
) {
	const adminPermissionD: VueDirective_Type = {
		inserted: function(
			el: AdminPermissionD_El,
			binding: AdminPermissionD_Binding,
		) {
			checkPermission(el, binding, roles);
		} as any as DirectiveFunction_Type,
		update  : function(
			el: AdminPermissionD_El,
			binding: AdminPermissionD_Binding,
		) {
			checkPermission(el, binding, roles);
		} as any as DirectiveFunction_Type,
	};
	return adminPermissionD;
}
