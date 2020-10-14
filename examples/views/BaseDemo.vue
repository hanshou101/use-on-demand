<template>
	<section class="BaseDemo">
		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

		<h1>测试运行</h1>
		<p>试试摸摸头和这颗星星会有不同的对话哦</p>
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="190" height="180" class="star">
			<polygon points="100,0 160,180 10,60 190,60 40,180" style="fill:yellow;stroke:yellow;stroke-width:1;"></polygon>
		</svg>
		<!--
						<div v-if="showKanBan"
								 id="live2d-widget" class="live2d-widget-container" style="position: fixed; right: 0px; bottom: -20px; width: 200px; height: 400px; z-index: 99999; opacity: 1; pointer-events: none;">
							<div class="live2d-widget-dialog-container" style="transform: scale(0.8);">
								<div class="live2d-widget-dialog" style="opacity: 0;">我，将某个人，唯一的某个人，试图锁定。我，</div>
							</div>
							<canvas id="live2dcanvas" width="400" height="800" style="position: absolute; left: 0px; top: 0px; width: 200px; height: 400px;"></canvas>
						</div>
		-->
	</section>
</template>

<script lang="ts">
	import Vue        from 'vue';
	import HelloWorld from '../../packages/components/HelloWorld/HelloWorld.vue';

	export default Vue.extend({
		name      : 'BaseDemo',
		components: {
			HelloWorld,
		},
		filters   : {},
		mixins    : [],
		props     : {},
		data() {
			return {};
		},
		computed  : {},
		watch     : {},
		mounted() {
		},
		methods   : {},
	});
</script>

<style lang="less" scoped>
</style>
