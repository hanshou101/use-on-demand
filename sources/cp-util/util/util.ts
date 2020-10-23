const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj: object, key: string) {
	return hasOwnProperty.call(obj, key);
}
