<template>
	<section class="WebglContainer">
		<router-view></router-view>
	</section>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		name      : 'WebglContainer',
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
		},
		methods   : {},
	});
</script>

<style lang="less" scoped>
	.WebglContainer,
	.webgl-course, .mini-city,
	.webgl-demo-1, .wave-ball,
	.video-js {
		background : #000;
		border     : 3px solid red;
	}

</style>
