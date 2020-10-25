/**
 * Inspired by（受启发） https://github.com/Inndy/vue-clipboard2
 */
import Clipboard from 'clipboard';
import { xX_ExceptionError_Helper } from '../../../exception-error/ExceptionError_Helper';
if (!Clipboard) {
    throw new Error(xX_ExceptionError_Helper.throwError_andLog('you should npm install `clipboard` --save at first '));
}
export var xX_ClipboardD = {
    //
    bind: function (el, binding) {
        if (binding.arg === 'success') {
            el._v_clipboard_success = binding.value;
        }
        else if (binding.arg === 'error') {
            el._v_clipboard_error = binding.value;
        }
        else {
            var clipboard = new Clipboard(el, {
                text: function () {
                    return binding.value;
                },
                action: function () {
                    return binding.arg === 'cut' ? 'cut' : 'copy';
                },
            });
            clipboard.on('success', function (e) {
                var callback = el._v_clipboard_success;
                callback && callback(e); // eslint-disable-line
            });
            clipboard.on('error', function (e) {
                var callback = el._v_clipboard_error;
                callback && callback(e); // eslint-disable-line
            });
            el._v_clipboard = clipboard;
        }
    },
    //
    update: function (el, binding) {
        if (binding.arg === 'success') {
            el._v_clipboard_success = binding.value;
        }
        else if (binding.arg === 'error') {
            el._v_clipboard_error = binding.value;
        }
        else {
            el._v_clipboard.text = function () {
                return binding.value;
            };
            el._v_clipboard.action = function () {
                return binding.arg === 'cut' ? 'cut' : 'copy';
            };
        }
    },
    //
    unbind: function (el, binding) {
        if (binding.arg === 'success') {
            // @ts-ignore
            delete el._v_clipboard_success;
        }
        else if (binding.arg === 'error') {
            // @ts-ignore
            delete el._v_clipboard_error;
        }
        else {
            el._v_clipboard.destroy();
            // @ts-ignore
            delete el._v_clipboard;
        }
    },
};
//# sourceMappingURL=clipboard-d.js.map