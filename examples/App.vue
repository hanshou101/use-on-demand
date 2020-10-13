<template>
	<div id="app">
		<template v-if="show.base">
			<img alt="Vue logo" src="./assets/logo.png" />
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
		</template>

		<div class="webgl-course"
				 v-if="show.webgl.course">
			<Course></Course>
		</div>

		<div class="mini-city"
				 v-if="show.webgl.miniCity">
			<ThreeJS_MiniCity></ThreeJS_MiniCity>
		</div>

		<div class="depu-table"
				 v-if="show.webgl.depuTable">
			<DepuTableCp></DepuTableCp>
		</div>

		<div class="webgl-demo-1"
				 v-if="show.webgl.onePiece">
			<OnePieceDemo></OnePieceDemo>
		</div>

		<div class="wave-ball"
				 v-if="show.webgl.waveBall">
			<WaveBall></WaveBall>
		</div>

		<div class="video-js">
			<VideoJS :video="{ src:'https://www.w3schools.com/html/mov_bbb.mp4' , type:'video/mp4' , title : '哥伦布认证视频' }"></VideoJS>
		</div>

	</div>
</template>

<script lang="ts">
	import Vue                                            from 'vue';
	import { xX_Live2D_WidgetJs_Helper, xX_Live2DModelE } from '../sources/live2d/live2d-widget.js/Live2D_WidgetJs_Helper';
	import Course                                         from '../packages/components/webgl-demos/Course.vue';
	import ThreeJS_MiniCity                               from '../packages/components/webgl-demos/ThreeJS_MiniCity.vue';
	import DepuTableCp                                    from '../packages/components/webgl-demos/DepuTable.vue';
	import WaveBall                                       from '../packages/components/webgl-demos/WaveBall.vue';
	import OnePieceDemo                                   from '../packages/components/webgl-demos/OnePieceDemo.vue';
	import VideoJS                                        from '../packages/components/video-js/VideoJS.vue';
	import { xX_FileMd5_Helper }                          from '../sources/platform/file-blob/FileMd5_Helper';


	export default Vue.extend({
		name      : 'App',
		components: {
			Course,
			ThreeJS_MiniCity,
			DepuTableCp,
			OnePieceDemo,
			WaveBall,
			VideoJS,
		},
		data() {
			return {
				show: {
					base  : false,
					live2D: true,
					webgl : {
						course   : false,
						miniCity : false,
						depuTable: false,
						onePiece : false,
						waveBall : false,
					},
					video : {
						videoJS: false,
					},
				},
				//
			};
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
		margin-top              : 60px;
	}

	.webgl-course, .mini-city,
	.webgl-demo-1, .wave-ball,
	.video-js {
		background : #000;
		border     : 3px solid red;
	}

</style>
