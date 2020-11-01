// declare global {
declare namespace TWEEN {
	class Tween {
		constructor(vector: THREE.Vector3)  //
		public to(
			position: { x?: number; y?: number; z?: number; },
			duration: number,
		): this;   // 移动到某个点
		public repeat(
			ci_shu: (number), /*| typeof Number.POSITIVE_INFINITY*/
		): this;    // 重复自身次数（可是无穷大次）


		public start(): void;  //
	}//
	// TODO 这种方式，是最新的namespace内，Class和function混杂的方式，的声明模式。
	function update(): void; // 需要在每次渲染时，调用。
}
// }
