/**
 * Inspired by（受启发） https://github.com/Inndy/vue-clipboard2
 */
import Clipboard                    from 'clipboard';
import { xX_ExceptionError_Helper } from '../../../exception-error/ExceptionError_Helper';

if (!Clipboard) {
	throw new Error(xX_ExceptionError_Helper.throwError_andLog('you should npm install `clipboard` --save at first '));
}

interface ClipboardD_El extends HTMLElement {
	_v_clipboard_success(e: Clipboard.Event): void;                   //
	_v_clipboard_error(e: Clipboard.Event): void;                     //
	_v_clipboard: Clipboard & {
		text?(): string;
		action?(): 'cut' | 'copy';
	};
}

interface ClipboardD_Binding extends Omit<DirectiveBinding_Type, 'arg'> {
	arg: 'success' | 'error'
		| 'cut' | 'copy' | undefined;
}

export const xX_ClipboardD: VueDirective_Type = {
	//
	bind  : function(el: ClipboardD_El, binding: ClipboardD_Binding) {
		if (binding.arg === 'success') {
			el._v_clipboard_success = binding.value;
		} else if (binding.arg === 'error') {
			el._v_clipboard_error = binding.value;
		} else {
			const clipboard = new Clipboard(el, {
				text() {
					return binding.value;
				},
				action() {
					return binding.arg === 'cut' ? 'cut' : 'copy';
				},
			});
			clipboard.on('success', (e) => {
				const callback = el._v_clipboard_success;
				callback && callback(e); // eslint-disable-line
			});
			clipboard.on('error', (e) => {
				const callback = el._v_clipboard_error;
				callback && callback(e); // eslint-disable-line
			});
			el._v_clipboard = clipboard;
		}
	} as unknown as DirectiveFunction_Type,
	//
	update: function(el: ClipboardD_El, binding: ClipboardD_Binding) {
		if (binding.arg === 'success') {
			el._v_clipboard_success = binding.value;
		} else if (binding.arg === 'error') {
			el._v_clipboard_error = binding.value;
		} else {
			el._v_clipboard.text   = function() {
				return binding.value;
			};
			el._v_clipboard.action = function() {
				return binding.arg === 'cut' ? 'cut' : 'copy';
			};
		}
	} as unknown as DirectiveFunction_Type,
	//
	unbind: function(el: ClipboardD_El, binding: ClipboardD_Binding) {
		if (binding.arg === 'success') {
			// @ts-ignore
			delete el._v_clipboard_success;
		} else if (binding.arg === 'error') {
			// @ts-ignore
			delete el._v_clipboard_error;
		} else {
			el._v_clipboard.destroy();
			// @ts-ignore
			delete el._v_clipboard;
		}
	} as unknown as DirectiveFunction_Type,
};
