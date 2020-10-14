<template>
	<section class="Live2D_Config_Dialog_Demo">
		<Live2D_Config_Dialog v-if="show_Live2D_Dialog"
													:show.sync="show_Live2D_Dialog"
													:init-data="{}"
													:dialog-type="2" />
	</section>
</template>

<script lang="ts">
	import Vue                  from 'vue';
	import Live2D_Config_Dialog from '../../packages/components/Live2D_Config_Dialog';

	export default Vue.extend({
		name      : 'Live2D_Config_Dialog_Demo',
		components: {
			Live2D_Config_Dialog,
		},
		filters   : {},
		mixins    : [],
		props     : {},
		data() {
			return {
				show_Live2D_Dialog: true,
			};
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
