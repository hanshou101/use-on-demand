<template>
	<section class="wave-ball-container">
		<div ref="waveBallContainer"></div>
	</section>
</template>

<script lang="ts">
	import Vue                                from 'vue';
	import { xX_WebGL_WaveBall_Demo_three56 } from '../../../sources/media-webgl/three-js/demos/WaveBall/WaveBall';


	/**
	 * 水波球。
	 * 				1.版本要求：需要56版本。
	 */
	export default Vue.extend({
		name      : 'WaveBall',
		components: {},
		filters   : {},
		mixins    : [],
		props     : {},
		data() {
			return {};
		},
		computed  : {},
		watch     : {},
		mounted() {
			const waveBallCtrl = new xX_WebGL_WaveBall_Demo_three56();
			waveBallCtrl.initAll((this.$refs['waveBallContainer'] as HTMLDivElement),
			);
		},
		methods   : {},
	});
</script>

<style lang="less" scoped>

</style>
