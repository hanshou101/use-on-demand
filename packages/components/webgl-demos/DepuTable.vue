<template>
	<div class="container">
		<div class="info">
			<a class="title" href="https://github.com/luosijie/threejs-examples" target="_blank">
				Mini City
			</a>
			<a class="author" href="https://luosijie.github.io/" target="_blank">
				Created By Jesse Luo
			</a>
		</div>
		<canvas></canvas>
	</div>
</template>
<script lang="ts">


	import Father_BaseVue, { MixinLevelTag, MyComponent } from '../../../sources/admin/mixins/Father_BaseVue';
	import { DepuTable }                                  from '../../../sources/media-webgl/three-js/demos/DepuTable/DepuTable';

	@MyComponent({
		name      : 'DepuTableCp',
		components: {
			/*组件*/
		},
		filters   : {},
	})
// export default class HelloWorld extends BaseVueClass {
	export default class DepuTableCp
		extends Father_BaseVue {    // 混入在此处，进行添加。

		// Data，在类中的实现 （双向绑定除外）

		// Method，在类中的实现

		// Lifecycle生命周期，在类中的实现
		created(): void {
		};

		mounted(): void {
			new DepuTable().startDepu();
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
<style lang="scss" scoped>
	.container {
		margin     : 20px 0;
		position   : absolute;
		text-align : center;
		width      : 100%;

		/*background: black;*/

		.info {
			opacity : 0.2;
		}

		a {
			display         : block;
			font-size       : 16px;
			line-height     : 28px;
			color           : #ffffff;
			text-decoration : none;
		}
	}

	a.title {
		font-size   : 20px;
		font-weight : bold;
	}

</style>
