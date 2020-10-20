/**
 * 增强类型。
 *        1.如果是，JS原生库，已有api，则应该去【StandardJsLib.ts】中设置。
 */

declare interface IndexedObj<T = any> {
  [key: string]: T,
}

declare type NullableType<T> = T | null;
declare type UndefinedAbleType<T> = T | undefined;

declare type NumOrStr = number | string;

declare type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };
