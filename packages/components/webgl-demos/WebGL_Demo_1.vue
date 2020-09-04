<template>
	<!--TODO 直接WebStorm使用Alt+Enter，即可快速把某一Html标签下的所有资源，打包成VueComp组件。-->
	<div class="block__element--modifier" id="container_logzbuf">

	</div>
</template>

<script lang="ts">

	import Father_BaseVue, { MixinLevelTag, MyComponent } from '../../../sources/admin/mixins/Father_BaseVue';
	import { Demo_1 }                                     from '../../../sources/media-webgl/three-js/demos/demo1/demo1';


	/**
	 * 海贼王火拳艾斯Demo
	 */
	@MyComponent({
		name      : 'WebGL_Demo_1',
		components: {
			/*组件*/
		},
		filters   : {},
	})
// export default class HelloWorld extends BaseVueClass {
	export default class WebGL_Demo_1
		extends Father_BaseVue {    // 混入在此处，进行添加。

		// Data，在类中的实现 （双向绑定除外）

		// Method，在类中的实现

		// Lifecycle生命周期，在类中的实现
		created(): void {
		};

		mounted(): void {
			new Demo_1().init();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
	// TODO 此处，全部采用【BEM】式的命名法。  Block__Element--Modifier
	// TODO 尽量采用，Stylus-函数式编程

	.block__element--modifier {

	}

</style>
