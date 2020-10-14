<template>
	<section class="VideoJSDemo">
		<VideoJS :video="{ src:'https://www.w3schools.com/html/mov_bbb.mp4' , type:'video/mp4' , title : '哥伦布认证视频' }"></VideoJS>
	</section>
</template>

<script lang="ts">
	import Vue     from 'vue';
	import VideoJS from '../../packages/components/VideoJS/VideoJS.vue';

	export default Vue.extend({
		name      : 'VideoJSDemo',
		components: {
			VideoJS,
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
