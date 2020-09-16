<template>
	<div class="video-js-com">
		<video
			:id="id"
			ref="myVideo"
			class="video-js vjs-big-play-centered vjs-fluid">
			<p class="vjs-no-js">
				To view this video please enable JavaScript, and consider upgrading to a
				web browser that
				<a href="https://videojs.com/html5-video-support/" target="_blank">
					supports HTML5 video
				</a>
			</p>
		</video>
		<p class="player-initializing" v-show="!playerInited">视频加载中...</p>
	</div>
</template>

<script lang="ts">
	import VideoJS_TypeNS, { VideoJsPlayer } from 'video.js';
	import Vue                               from 'vue';
	import { xX_MVideo_Helper }              from '../../../sources/media-video/MVideo_Helper';

	// 初始化【CSS样式】
	xX_MVideo_Helper.loadCss();


	type SrcObj = VideoJS_TypeNS.Tech.SourceObject;

	type VideoBean = {
		src: string;                          // 链接地址
		type?: 'video/mp4' | string;          // 媒体类型
		poster: string;                       // 封面图片
		title: string;                        // 标题文字
	}

	// type FixDeprecate_TypeSdk = {}

	export default Vue.extend({
		name   : 'VideoJS',
		props  : {
			video   : {
				type: Object, required: true,
				default() {
					return {
						// src   : 'http://video.haval.com.cn/003/001/019/00300101903_vw00000000000001_95987975.mp4',
						// type  : 'video/mp4',
						// poster: 'http://pic.haval.com.cn/003/001/019/00300101907_68282a4f.jpg',
						// title : '逐梦“新四化” 2019上海车展长城汽车品牌发布会集锦'
					} as VideoBean;
				},
			},
			autoInit: {
				type: Boolean, default: true,
			},
			autoPlay: {
				type: Boolean, default: false,
			},
			language: {
				type: String, default: 'zh-CN',
			},
		},
		data() {
			return {
				id          : 'video_' + Math.random().toString(32).substr(2),
				player      : null as any as VideoJsPlayer,
				playerInited: false,
				currentVideo: this.video,
			};
		},
		methods: {
			// 初始化播放器
			initPlayer() {
				this.$nextTick(() => {
					const that               = this;
					const video              = this.video;
					const sources: SrcObj [] = [];
					if (video.src) {
						const obj: SrcObj = {
							src: video.src,
						};
						if (video.type) {
							obj.type = video.type;
						}
						sources.push(obj);
					}
					const VideoPlayer = xX_MVideo_Helper.initLang({ 'zh-CN': {}, en: {} });
					this.player       = VideoPlayer(this.$refs.myVideo, {
						controls         : true,
						poster           : this.video.poster,
						preload          : 'auto',
						autoplay         : this.autoPlay,
						fluid            : true, // 自适应宽高
						language         : this.language, // 设置语言
						muted            : false, // 是否静音
						inactivityTimeout: false,
						controlBar       : {
							children: [
								{ name: 'playToggle' }, // 播放按钮
								{ name: 'currentTimeDisplay' }, // 当前已播放时间
								{ name: 'progressControl' }, // 播放进度条
								{ name: 'durationDisplay' }, // 总时间
								{ // 倍数播放
									name         : 'playbackRateMenuButton',
									playbackRates: [0.5, 1, 1.5, 2, 2.5],
								},
								{
									name  : 'volumePanel', // 音量控制
									inline: false, // 不使用水平方式
								},
								{ name: 'FullscreenToggle' }, // 全屏
							],
						},
						sources,
					} as any, function(this: VideoJsPlayer) {
						console.log('视频可以播放了', this);
						that.$emit('onReady', this);
					});
					this.playerInited = true;
				});
			},
			// 切换视频
			switchVideo(video: VideoBean, autoPlay: boolean) {
				if (!video.src || !video.poster) {
					console.error('video需为一个包含src、poster、type(可选)的对象');
				}
				if (!video.src) {
					return;
				}
				const data: SrcObj = {
					src: video.src,
				};
				const player       = this.player;
				if (video.type) {
					data.type = video.type;
				}
				if (typeof autoPlay === 'undefined') {
					autoPlay = true;
				}

				player.pause();
				player.src(data);
				// @ts-ignore
				player.load(data);                                                 // TIP 此处，官方类型提示文件，有问题
				if (video.poster) {
					// 动态切换poster
					// @ts-ignore
					player.posterImage.setSrc(video.poster);
				}
				if (autoPlay) {
					this.$nextTick(() => {
						this.player.play();
					});
				}
			},
			// 播放视频
			play() {
				this.$nextTick(() => {
					this.player.play();
				});
			},
			// 暂停视频
			pause() {
				this.$nextTick(() => {
					this.player.pause();
				});
			},
			// 判断对象是否是空对象
			isEmptyObject(obj: {}) {
				for (const attr in obj) {
					return false;
				}
				return true;
			},
		},
		watch  : {
			video(newVal) {
				this.currentVideo = newVal;
				if (this.playerInited) {
					this.switchVideo(newVal, false);
				}
			},
			language(newVal) {
				if (this.playerInited) {
					this.player.language(newVal);
				}
			},
		},
		mounted() {
			if (this.autoInit) {
				this.$nextTick(() => {
					this.initPlayer();
				});
			}
		},
		beforeDestroy() {
			if (this.playerInited) {
				// 销毁播放器
				try {
					this.player.dispose();
				} catch (e) {
					console.error(e);
				}
			}
		},
	});
</script>
<style lang="stylus">
	.video-js-com {
		position: relative;
		height: 100%;
		background-color: #161616;

		.player-initializing {
			position: absolute;
			top: 50%;
			left: 0;
			width: 100%;
			text-align: center;
			font-size: 18px;
			font-weight: 600;
			color: #fff;
			transform: translateY(-50%);
		}
	}
</style>
