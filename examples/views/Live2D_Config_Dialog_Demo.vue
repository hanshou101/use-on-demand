<template>
	<section class="Live2D_Config_Dialog_Demo">
		<Live2D_Config_Dialog v-if="show_Live2D_Dialog"
													:show.sync="show_Live2D_Dialog"
													:init-data="{}"
													:dialog-type="2" />
	</section>
</template>

<script lang="ts">
	import Vue                           from 'vue';
	// @ts-ignore
	import Live2D_Config_Dialog          from '../../lib-cp/Live2D_Config_Dialog/index.js';
	import { xX_Live2D_WidgetJs_Helper } from '../../sources/live2d/live2d-widget.js/Live2D_WidgetJs_Helper';
	import { xX_BrowserEventMap }        from '../../sources/dom/dom-events';

	Vue.use(Live2D_Config_Dialog);

	export default Vue.extend({
		name      : 'Live2D_Config_Dialog_Demo',
		components: {
			// Live2D_Config_Dialog,
		},
		filters   : {},
		mixins    : [],
		props     : {},
		data() {
			return {
				show_Live2D_Dialog: false,
			};
		},
		computed  : {},
		watch     : {},
		mounted() {
			xX_Live2D_WidgetJs_Helper.bindHotKey(xX_BrowserEventMap.KEYBOARD.KeyCode_MAP.K, () => {
				this.show_Live2D_Dialog = !this.show_Live2D_Dialog;
			});
		},
		methods   : {},
	});
</script>

<style lang="less" scoped>
	.Live2D_Config_Dialog_Demo{

	}
</style>
