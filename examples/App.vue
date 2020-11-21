<template>
	<div id="app">

		<div class="route-list">
			<div v-for="item in routeMap" :key="item.name"
					 class="route-item" :class="{'active' : $route.name === item.name}"
					 @click="$router.push({name:item.name})">
				{{ item.intro }}
			</div>
		</div>

		<!--TIP 跳转路由-->
		<router-view></router-view>

	</div>
</template>

<script lang="ts">
	import Vue                                            from 'vue';
	import { xX_Live2D_WidgetJs_Helper, xX_Live2DModelE } from '../sources/live2d/live2d-widget.js/Live2D_WidgetJs_Helper';
	import { xX_FileMd5_Helper }                          from '../sources/platform-ecosystem-compatible/file-blob-base64/FileMd5_Helper';
	import { flatRoute_toArr }                            from './router';
	// import { xX_ServiceWorker_Client_Helper }             from '../sources/service-worker/util/ServiceWorker_Client_Helper';
	import { FirstClient }                                from '../sources/worker/demo/first/First.client';


	export default Vue.extend({
		name      : 'App',
		components: {},
		data() {
			return {
				show    : {
					base              : false,
					live2D            : true,
					webgl             : {
						course   : false,
						miniCity : false,
						depuTable: false,
						onePiece : false,
						waveBall : false,
					},
					video             : {
						videoJS: false,
					},
					show_Live2D_Dialog: true,
				},
				//
				routeMap: flatRoute_toArr(),
			};
		},
		beforeMount() {
			// xX_ServiceWorker_Client_Helper.demo();
		},
		mounted() {
			if (this.show.live2D) {
				xX_Live2D_WidgetJs_Helper.initDemo({
					fallbackModel: xX_Live2DModelE.tororo,
				});
			}

			xX_FileMd5_Helper.downloadAndCreateHash('http://sit17.me/index.php?user/publicLink&fid=de18XYhH-M0HJD3DzEQoRhXyARaduLwejOI9sFspvlCacO--A6XHrOUF_7V8mLwWHLWywNJU89T18Pr-ZMSX7jnQBjElJSHo-oaOEopyR43e6q8qR166Zx1ohNLZBQMZxBPrdhLri7jJskYrZQV_MtD9V9-QVdcNzg&file_name=/app.apk').then(res => {
				console.log('测试hash', res);
			});

			// 测试Worker
			new FirstClient().init();

		},
	});


</script>

<style lang="less">
	#app {
		font-family             : Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing  : antialiased;
		-moz-osx-font-smoothing : grayscale;
		text-align              : center;
		color                   : #2c3e50;
		// margin-top              : 60px;
	}

	.route-list {
		display        : flex;
		flex-direction : row;
		row-gap        : 10px;
		column-gap     : 20px;

		.route-item {
			cursor : progress;
			&.active {
				color : red;
			}
		}
	}

</style>
