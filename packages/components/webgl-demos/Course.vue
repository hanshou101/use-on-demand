<template>
	<div :id="canvasId"></div>
</template>
<script lang="ts">


	import Father_BaseVue, { MixinLevelTag, MyComponent } from '../../../sources/admin/mixins/Father_BaseVue';
	import chapter2$5                                     from '../../../sources/media-webgl/three-js/demos/WebGL_Primary_Course/chapter2$5';
	import { chapter4 }                                   from '../../../sources/media-webgl/three-js/demos/WebGL_Primary_Course/chapter4';
	import { chapter3 }                                   from '../../../sources/media-webgl/three-js/demos/WebGL_Primary_Course/chapter3';
	import chapter2                                       from '../../../sources/media-webgl/three-js/demos/WebGL_Primary_Course/chapter2';
	import chapter5                                       from '../../../sources/media-webgl/three-js/demos/WebGL_Primary_Course/chapter5';


	/**
	 * WebGL绘制的基本教程
	 */
	@MyComponent({
		name      : 'Course',
		components: {
			/*组件*/
		},
		filters   : {},
	})
// export default class HelloWorld extends BaseVueClass {
	export default class Course
		extends Father_BaseVue {    // 混入在此处，进行添加。

		// Data，在类中的实现 （双向绑定除外）
		canvasId = 'canvas-frame';

		// Method，在类中的实现


		/**
		 * 绿色方块
		 */
		chapter2_start() {
			const c2 = new chapter2();
			c2.baseInit();
			c2.init_2();
			c2.init_3();
			c2.init_4();
			c2.init_5();
		}

		/**
		 * 95不能显示？
		 */
		chapter2$5_start() {
			const dom = document.getElementById(this.canvasId);
			if (dom) {
				console.log('开始');
				const c2$5 = new chapter2$5(dom);
				c2$5.$1000_threeStart();
			}
		}


		/**
		 * 95不能显示？
		 */
		chapter3_start() {
			const dom = document.getElementById(this.canvasId);
			if (dom) {
				console.log('开始');
				const c3 = new chapter3(dom);
				c3.$1000_threeStart();
			}
		}


		/**
		 * 95不能显示？
		 */
		chapter4_start() {
			const dom = document.getElementById(this.canvasId);
			if (dom) {
				console.log('开始');
				const c4 = new chapter4(dom);
				c4.$1000_threeStart();
			}
		}


		/**
		 * 95不能显示？
		 */
		chapter5_start() {
			const dom = document.getElementById(this.canvasId);
			if (dom) {
				console.log('开始');
				const c5 = new chapter5(dom);
				c5.$1000_threeStart();
			}
		}

		// Lifecycle生命周期，在类中的实现
		created(): void {
		}

		mounted(): void {
			// this.chapter2_start();
			// this.chapter2$5_start();
			// this.chapter3_start();
			// this.chapter4_start();
			this.chapter5_start();
		};

		activated(): void {
		};

		updated(): void {
		};

		destroyed(): void {
		};

		MixinsData_1: MixinLevelTag = {} as any;

	}

</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
	// BEM

	div#canvas-frame {
		border           : none;
		cursor           : pointer;
		width            : 100%;
		height           : 600px;
		background-color : #EEEEEE;
	}

</style>
