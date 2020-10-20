<template>
	<div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
		<div class="tinymce-textarea" :id="tinymceId"></div>
		<div class="editor-custom-btn-container">
			<editorImage color="#1890ff" class="editor-upload-btn"
									 @successCBK="imageSuccessCBK"></editorImage>
		</div>
	</div>
</template>

<script lang="ts">
	import EditorImage from './Tinymce_EditorImage.vue';
	import plugins     from './plugins';
	import toolbar     from './toolbar';

	// TIP 在此文件中，可以自由地修改【Tinymce富文本编辑器】的配置。
	// TIP 官方配置文档地址：https://www.tiny.cloud/docs/

	import { Component, Prop, Watch }           from 'vue-property-decorator';
	import { MixinLevelTag, xX_Father_BaseVue } from '../../../sources/admin/mixins/Father_BaseVue';


	@Component({
		name      : 'Tinymce',
		components: {
			/*组件*/
			EditorImage,
		},
		filters   : {},
	})
// export default class HelloWorld extends BaseVueClass {
	export default class Tinymce extends xX_Father_BaseVue {    // 混入在此处，进行添加。
		// Prop，在类中的实现
		@Prop({
			type: String,
		}) private id!: string;
		@Prop({
			type   : String,
			default: '',
		}) private value!: string;
		@Prop({
			type   : Array,
			default: function() {
				return [];
			},
		}) private toolbar!: string[];
		@Prop({
			type   : String,
			default: 'file edit insert view format table',
		}) private menubar!: string;
		@Prop({
			type   : Number,
			default: 400,
		}) private height!: number;

		//

		/**
		 * 如果用这种方式，可以参照：
		 * 				1.https://stackoverflow.com/a/52592047/6264260。对【MyFormEasy】的初始化，做特殊处理。（很棒的思路！）
		 */
		@Prop({ /* type: Object, */ required: false }) private preuploadApi_Promise!: Promise<Function>;


		//
		//
		//

		// Data，在类中的实现 （双向绑定除外）
		hasChange  = false;
		hasInit    = false;
		tinymceId  = this.id || 'vue-tinymce-' + +new Date();
		fullscreen = false;

		// Watch，在类中的实现
		@Watch('value', { deep: true, immediate: true })
		public watch_value(newVal: any, oldVal: any) {
			if (!this.hasChange && this.hasInit) {
				this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(newVal));
			}
		}

		// Method，在类中的实现
		initTinymce() {

			// TIP 第一步 在工具栏里面，增添【字体大小选择】与【特定族群选择】
			const newToolbar: Array<string> = JSON.parse(JSON.stringify(toolbar));
			newToolbar.unshift('fontsizeselect | fontselect');

			const self = this;
			window.tinymce.init({
				selector                    : `#${this.tinymceId}`,
				height                      : this.height,
				body_class                  : 'panel-body ',
				object_resizing             : false,
				language                    : 'zh_CN',
				// toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
				toolbar                     : this.toolbar.length > 0 ? this.toolbar : newToolbar,
				// TIP 第二步 在内部配置里面，增加字体的配置项。
				fontsize_formats            : '8pt 10pt 12pt 14pt 18pt 24pt 36pt', // 第二步
				// ↑ ↑ ↑
				menubar                     : this.menubar,
				plugins                     : plugins,
				end_container_on_empty_block: true,
				powerpaste_word_import      : 'clean',
				code_dialog_height          : 450,
				code_dialog_width           : 1000,
				advlist_bullet_styles       : 'square',
				advlist_number_styles       : 'default',
				imagetools_cors_hosts       : ['www.tinymce.com', 'codepen.io'],
				default_link_target         : '_blank',
				link_title                  : false,
				init_instance_callback      : (editor: MyMceEditor) => {
					if (self.value) {
						editor.setContent(self.value);
					}
					self.hasInit = true;
					editor.on('NodeChange Change KeyUp SetContent', () => {
						this.hasChange = true;
						this.$emit('input', editor.getContent());
					});
				},
				setup(editor: MyMceEditor) {
					editor.on('FullscreenStateChanged', (e: any) => {
						self.fullscreen = e.state;
					});
				},
				// 整合七牛上传
				// images_dataimg_filter(img) {
				//   setTimeout(() => {
				//     const $image = $(img);
				//     $image.removeAttr('width');
				//     $image.removeAttr('height');
				//     if ($image[0].height && $image[0].width) {
				//       $image.attr('data-wscntype', 'image');
				//       $image.attr('data-wscnh', $image[0].height);
				//       $image.attr('data-wscnw', $image[0].width);
				//       $image.addClass('wscnph');
				//     }
				//   }, 0);
				//   return img
				// },
				// images_upload_handler(blobInfo, success, failure, progress) {
				//   progress(0);
				//   const token = _this.$store.getters.token;
				//   getToken(token).then(response => {
				//     const url = response.data.qiniu_url;
				//     const formData = new FormData();
				//     formData.append('token', response.data.qiniu_token);
				//     formData.append('key', response.data.qiniu_key);
				//     formData.append('file', blobInfo.blob(), url);
				//     upload(formData).then(() => {
				//       success(url);
				//       progress(100);
				//     })
				//   }).catch(err => {
				//     failure('出现未知问题，刷新页面，或者联系程序员')
				//     console.log(err);
				//   });
				// },
			});
		}

		destroyTinymce() {
			if (window.tinymce.get(this.tinymceId)) {
				window.tinymce.get(this.tinymceId).destroy();
			}
		}

		setContent(value: any) {
			window.tinymce.get(this.tinymceId).setContent(value);
		}

		getContent() {
			window.tinymce.get(this.tinymceId).getContent();
		}

		imageSuccessCBK(arr: any[]) {
			const self = this;
			arr.forEach(v => {
				window.tinymce.get(self.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`);
			});
		}

		//
		//
		//
		//
		//

		public created(): void {
		}

		public mounted(): void {
			this.initTinymce();
		}

		public updated(): void {
		}

		public activated(): void {
			this.initTinymce();
		}

		public deactivated() {
			this.destroyTinymce();
		}

		public beforeDestroy(): void {
			this.destroyTinymce();
		}

		public destroyed(): void {
		}


		MixinsData_1: MixinLevelTag = {} as any;


	}


</script>

<style scoped>
	.tinymce-container {
		position : relative;
	}

	.tinymce-container >>> .mce-fullscreen {
		z-index : 10000;
	}

	.tinymce-textarea {
		visibility : hidden;
		z-index    : -1;
	}

	.editor-custom-btn-container {
		position : absolute;
		right    : 4px;
		top      : 0;

		z-index  : 2005;
	}

	.fullscreen .editor-custom-btn-container {
		z-index  : 10000;
		position : fixed;
	}

	.editor-upload-btn {
		display : inline-block;
	}
</style>
