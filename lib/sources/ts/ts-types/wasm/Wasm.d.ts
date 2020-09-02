interface WasmObjExports_Type extends Record<string, WebAssembly.ExportValue> {
  plus(num1: number, num2: number): number;               //
  minus(num1: number, num2: number): number;              //
  times(num1: number, num2: number): number;              //
  divide(num1: number, num2: number): number;             //
}

// 如果不使用其它import，则单单使用【declare global】会导致无法识别
interface Window {
  $_wasm?: WasmObjExports_Type;       // WARN 加载时，需要从网络数据拉取，存在一定时间延迟
}
