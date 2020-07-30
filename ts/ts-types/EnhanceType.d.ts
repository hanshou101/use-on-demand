/**
 * 增强类型。
 *        1.如果是，JS原生库，已有api，则应该去【StandardJsLib.ts】中设置。
 */

  interface IndexedObj<T = any> {
    [key: string]: T,
  }

  type NullableType<T> = T | null;

