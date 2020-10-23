import { hasOwn } from '../util/util';
var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  1.【String format template】
 *  				1.- Inspired:
 *    							1. https://github.com/Matt-Esch/string-template/index.js
 * 	2.
 */
export function Format(Vue) {
    /**
     * template
     */
    function template(string) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length === 1 && typeof args[0] === 'object') {
            args = args[0];
        }
        if (!args || !args.hasOwnProperty) {
            // @ts-ignore
            args = {};
        }
        return string.replace(RE_NARGS, function (match, prefix, i, index) {
            var result;
            if (string[index - 1] === '{' &&
                string[index + match.length] === '}') {
                return i;
            }
            else {
                result = hasOwn(args, i) ? args[i] : null;
                if (result === null || result === undefined) {
                    return '';
                }
                return result;
            }
        });
    }
    return template;
}
//# sourceMappingURL=format.js.map